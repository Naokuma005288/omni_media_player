/* microfade-anim-tweaks.plugin.js
   - デザインを変えずに体験だけ上げる後付けパッチ
   - 依存: 元ページのグローバル ($, state, mediaSeekTo, rampTo, requestPlay など)
*/
(() => {
  'use strict';

  // ----- 安全に初期化を待つ -----
  function ready() {
    return typeof window !== 'undefined'
      && typeof window.mediaSeekTo === 'function'
      && typeof window.rampTo === 'function'
      && typeof window.requestPlay === 'function'
      && typeof window.updateSpectrumVisibility === 'function'
      && typeof state !== 'undefined'
      && $ && $.v && $.wrap && $.artWrap;
  }
  function initWhenReady() {
    if (ready()) { try { init(); } catch(e) { /* no-op */ } return; }
    const id = setInterval(() => { if (ready()) { clearInterval(id); try { init(); } catch(e){} } }, 50);
    // 念のため最大10秒で打ち切り
    setTimeout(() => clearInterval(id), 10000);
  }

  function init() {
    /* ======================================================
       1) シーク時のマイクロフェード（連続ドラッグにも優しい）
       ------------------------------------------------------
       - mediaSeekTo をラップして、"バースト中はミュート→落ち着いたら復帰"
       - ABループの折返しはフェード無し（継ぎ目防止）
       ====================================================== */
    const origSeek = window.mediaSeekTo;
    const origRamp = window.rampTo;

    // シーク・バースト管理
    const seekBurst = {
      fading: false,
      timer: 0,
      holdUntil: 0,
      // フェード保持を明示（他のrampToを遅延）
      setHold(ms=140) {
        this.holdUntil = Date.now() + ms;
        state._seekFading = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.fading = false;
          state._seekFading = false;
          // 最終的にマスターへ復帰
          try {
            const target = +($.master?.value || 1);
            origRamp(target, 0.08);
          } catch(e){}
        }, ms);
      }
    };

    // rampTo を軽くラップ：シーク保持中の"上げ"は保持後に遅延
    window.rampTo = function patchedRampTo(value, t=0.12) {
      try {
        if (state?._seekFading && value > 0.001) {
          const delay = Math.max(0, seekBurst.holdUntil - Date.now());
          clearTimeout(state._seekRampTimer);
          state._seekRampTimer = setTimeout(() => origRamp(value, t), delay);
          return;
        }
      } catch(e){}
      return origRamp(value, t);
    };

    window.mediaSeekTo = function microfadeSeek(target) {
      try {
        // 埋め込み(YouTube/iframe)はそのまま
        if (state.usingYouTube || state.usingIframe) {
          return origSeek(target);
        }

        // ABループ折返し付近はフェードしない（継ぎ目を作らない）
        const nearAbEdge =
          state.abLoop &&
          Number.isFinite(state.a) && Number.isFinite(state.b) &&
          Math.abs((window.mediaCurrent?.()||0) - (state.b||0)) < 0.25 &&
          Math.abs((target||0) - (state.a||0)) < 0.25;

        if (!nearAbEdge) {
          // 初回だけすっと絞る（ドラッグ中は保持）
          if (!seekBurst.fading) {
            seekBurst.fading = true;
            try {
              ensureAudioGraph?.();
            } catch(e){}
            try {
              origRamp(0.0001, 0.06);
            } catch(e){}
          }
          // 「バースト終了待ち」までの保持時間を毎回更新（ドラッグに強い）
          seekBurst.setHold(150);
        }

        // 実際のシーク
        return origSeek(target);
      } catch(e) {
        // 失敗時は素の挙動へフォールバック
        try { return origSeek(target); } catch(_) {}
      }
    };

    /* ======================================================
       2) アニメーションの“手触り”強化（見た目は既存のまま）
       ------------------------------------------------------
       - カバー傾き：ばね・減衰で追従（既存と同じCSS変数を更新）
       - カード・パララックス：慣性付きで追従（こちらもCSS変数を流用）
       - 再生ボタンに極小の鼓動（既存クラス活用、崩さない）
       ====================================================== */

    // 追加スタイル（デザインは変えず、ごく控えめ）
    try {
      const css = `
/* 微細な鼓動。既存の .playpulse を尊重し、再生中のみごく弱く */
@keyframes _op_pulse { 0%,100%{ transform:translateY(0) scale(1)} 50%{ transform:translateY(-1px) scale(1.015)} }
body.is-playing .playpulse { animation: _op_pulse 1.8s ease-in-out infinite; }
`;
      const st = document.createElement('style');
      st.id = 'microfade-anim-patch-style';
      st.textContent = css;
      document.head.appendChild(st);
    } catch(e){}

    // ------- カバー傾き（慣性） -------
    (function enhanceCoverTilt(){
      try{
        const el = $.artWrap;
        if (!el) return;

        // 既存のハンドラを解除（ある場合のみ）
        const old = el.__tiltHandlers || {};
        el.removeEventListener?.('mousemove', old.onMove);
        el.removeEventListener?.('mouseleave', old.onLeave);
        el.removeEventListener?.('touchmove', old.onMove);
        el.removeEventListener?.('touchend', old.onLeave);

        let tx = 0, ty = 0;  // 目標角度
        let cx = 0, cy = 0;  // 現在角度（慣性）
        let raf = 0;
        const max = 10;      // 既存と同じ最大角度

        const tick = ()=>{
          raf = 0;
          // バネ: 速度= (target-current)*k、減衰でヌルッと
          const k = 0.16, d = 0.85;
          const vx = (tx - cx) * k;
          const vy = (ty - cy) * k;
          cx = cx + vx; cy = cy + vy;
          // 減衰（高周波おさえ）
          cx *= d; cy *= d;

          el.style.setProperty('--cover-tilt', `rotateY(${cx.toFixed(3)}deg) rotateX(${cy.toFixed(3)}deg)`);
          if (Math.abs(tx-cx) > 0.01 || Math.abs(ty-cy) > 0.01) {
            raf = requestAnimationFrame(tick);
          }
        };

        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const px = ((e.clientX ?? (e.touches?.[0]?.clientX||0)) - r.left) / r.width - .5;
          const py = ((e.clientY ?? (e.touches?.[0]?.clientY||0)) - r.top ) / r.height - .5;
          tx = px * max;
          ty = -py * max;
          if (!raf) raf = requestAnimationFrame(tick);
        };
        const onLeave = () => {
          tx = 0; ty = 0;
          if (!raf) raf = requestAnimationFrame(tick);
        };

        // state.anim.coverTilt のときだけ活性（既存のトグルに追従）
        const apply = () => {
          const on = !!state.anim?.coverTilt;
          // いったん全解除
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
          el.removeEventListener('touchmove', onMove);
          el.removeEventListener('touchend', onLeave);
          if (on) {
            el.addEventListener('mousemove', onMove);
            el.addEventListener('mouseleave', onLeave);
            el.addEventListener('touchmove', onMove, {passive:true});
            el.addEventListener('touchend', onLeave);
          } else {
            onLeave();
          }
        };
        apply();

        // 設定UIから切替られた時も追従（既存の保存機構にフック不要・定期チェックで軽い）
        const obs = new MutationObserver(apply);
        obs.observe(document.body, {attributes:true, attributeFilter:['class']});
        // 軽くポーリング（アニメ切替ボタンはclassだけでは拾えないため）
        setInterval(apply, 500);
      }catch(e){}
    })();

    // ------- カード・パララックス（慣性） -------
    (function enhanceCardParallax(){
      try{
        const el = $.wrap;
        if (!el) return;

        // 既存のハンドラを解除（ある場合のみ）
        const old = el.__parallaxHandlers || {};
        el.removeEventListener?.('mousemove', old.onMove);
        el.removeEventListener?.('mouseleave', old.onLeave);

        let tx = 0, ty = 0;  // 目標角度 (deg)
        let cx = 0, cy = 0;  // 現在角度
        let raf = 0;

        const tick = ()=>{
          raf = 0;
          const k = 0.12, d = 0.88;
          const vx = (tx - cx) * k;
          const vy = (ty - cy) * k;
          cx = (cx + vx) * d;
          cy = (cy + vy) * d;
          el.style.setProperty('--card-rot', `rotateY(${cx.toFixed(3)}deg) rotateX(${cy.toFixed(3)}deg)`);
          if (Math.abs(tx-cx) > 0.02 || Math.abs(ty-cy) > 0.02) {
            raf = requestAnimationFrame(tick);
          }
        };

        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - .5;
          const py = (e.clientY - r.top ) / r.height - .5;
          tx = px * 4;
          ty = -py * 3;
          if (!raf) raf = requestAnimationFrame(tick);
        };
        const onLeave = () => {
          tx = 0; ty = 0;
          if (!raf) raf = requestAnimationFrame(tick);
        };

        const apply = () => {
          const on = !!state.anim?.cardParallax;
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
          if (on) {
            el.addEventListener('mousemove', onMove);
            el.addEventListener('mouseleave', onLeave);
          } else {
            onLeave();
          }
        };
        apply();

        const obs = new MutationObserver(apply);
        obs.observe(document.body, {attributes:true, attributeFilter:['class']});
        setInterval(apply, 500);
      }catch(e){}
    })();

    // おまけ：プレイヤー状態連動の演出最適化（すでにあれば何もしない）
    try {
      // 動画が非アクティブ・埋め込み等の時は重い演出を落とす（既存のenforceBackdropPolicyがやってるが、二重呼びでも安全）
      const refresh = () => {
        try { window.enforceBackdropPolicy?.(); } catch(e){}
      };
      ['play','pause','loadedmetadata','enterpictureinpicture','leavepictureinpicture'].forEach(ev=>{
        try { $.v.addEventListener(ev, refresh); } catch(e){}
      });
    } catch(e){}
  }

  initWhenReady();
})();

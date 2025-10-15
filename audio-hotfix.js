/* =======================================================================
 * audio-hotfix.js
 * 目的: デザインは触らず、2回目再生 / 一時停止→再生で音が出ない問題を潰す
 * 方針:
 *  - AudioContext を確実に resume / unlock
 *  - メディアグラフ (MediaElementSource -> EQ群 -> Compressor -> MasterGain -> destination)
 *    を必要時に再配線（disconnect忘れ/順序崩れ対策）
 *  - muted 属性や volume=0 を強制回復
 *  - 既存の requestPlay をラップ（既存の挙動は維持）
 *  - canplay / loadedmetadata / play / visibilitychange などで保険実行
 * 依存: 既存グローバルの $, state, restoreEqValues, makeEqFilters があれば利用
 * =======================================================================
 */
(function () {
  // 既存参照の有無チェック
  const has$ = typeof window.$ === "object" && window.$.v instanceof HTMLMediaElement;
  const $ = has$ ? window.$ : null;

  // state は既存を使う。なければ最小限で作る（衝突しないように）
  const state = (function ensureState() {
    if (window.state && typeof window.state === "object") return window.state;
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    return (window.state = {
      audioCtx: ac,
      mediaNode: null,
      outGain: null,
      analyser: null,
      comp: null,
      eq: { filters: [], enabled: true, values: Array(10).fill(0), preset: "flat" },
      extAudio: null,
    });
  })();

  const video = has$ ? $.v : document.querySelector("video");

  if (!video) {
    // プレイヤーがないページでは何もしない
    return;
  }

  // === ユーティリティ ===
  const now = () => (state.audioCtx ? state.audioCtx.currentTime : 0);

  function unlockAudioCtxOnce() {
    try {
      if (!state.audioCtx) state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (state.audioCtx.state !== "running") {
        // iOS/Safari 対策: 無音バッファを再生してロック解除
        const src = state.audioCtx.createBufferSource();
        src.buffer = state.audioCtx.createBuffer(1, 1, state.audioCtx.sampleRate);
        src.connect(state.audioCtx.destination);
        src.start(0);
        setTimeout(() => {
          try { src.stop(); src.disconnect(); } catch (_) {}
        }, 0);
      }
    } catch (_) {}
  }

  async function resumeAudioCtx() {
    try {
      if (!state.audioCtx) state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (state.audioCtx.state !== "running") {
        try { await state.audioCtx.resume(); } catch (_) {}
      }
    } catch (_) {}
  }

  function ensureEqFilters(ac) {
    if (state.eq && state.eq.filters && state.eq.filters.length) return state.eq.filters;
    // 既存の makeEqFilters があれば利用
    if (typeof window.makeEqFilters === "function") {
      state.eq.filters = window.makeEqFilters(ac);
      return state.eq.filters;
    }
    // フォールバックの10バンド
    const bands = [
      { f: 32, type: "lowshelf" }, { f: 64, type: "peaking" }, { f: 125, type: "peaking" },
      { f: 250, type: "peaking" }, { f: 500, type: "peaking" }, { f: 1000, type: "peaking" },
      { f: 2000, type: "peaking" }, { f: 4000, type: "peaking" }, { f: 8000, type: "peaking" },
      { f: 16000, type: "highshelf" },
    ];
    state.eq.filters = bands.map(b => {
      const biq = ac.createBiquadFilter();
      biq.type = b.type;
      biq.frequency.value = b.f;
      biq.Q.value = (b.type === "peaking" ? 0.8 : 0.7);
      biq.gain.value = 0;
      return biq;
    });
    return state.eq.filters;
  }

  function restoreEq() {
    try {
      if (typeof window.restoreEqValues === "function") {
        window.restoreEqValues(); // 既存UIの値を反映
        return;
      }
      // フォールバック: 保存値があるなら反映
      const vals = state.eq?.values || Array(10).fill(0);
      const enabled = !!state.eq?.enabled;
      (state.eq?.filters || []).forEach((f, i) => (f.gain.value = enabled ? (vals[i] || 0) : 0));
    } catch (_) {}
  }

  function forceUnmuteAndVolume() {
    try {
      // muted 属性と volume=0 の両方をケア
      video.muted = false;
      video.removeAttribute("muted");
      if (!Number.isFinite(video.volume) || video.volume === 0) {
        // 既存UIのスライダがあればそれを優先
        const fallback = +((has$ && $.vol && $.vol.value) || 0.8) || 0.8;
        video.volume = fallback;
        if (has$ && $.vol) $.vol.value = fallback;
      }
      if (state.extAudio) {
        state.extAudio.muted = false;
        if (state.extAudio.volume === 0) state.extAudio.volume = video.volume;
      }
    } catch (_) {}
  }

  // === コア: グラフを健全化して再生できる状態にする ===
  async function hardResumeAudio() {
    try {
      unlockAudioCtxOnce();
      await resumeAudioCtx();

      // MediaElementSource は video ごとに 1 度だけ作れる
      if (!state.mediaNode) {
        try {
          state.mediaNode = state.audioCtx.createMediaElementSource(video);
        } catch (_) {
          // 既に作成済み / 他所で作られている場合は無視
        }
      }
      if (!state.comp) {
        const c = state.audioCtx.createDynamicsCompressor();
        c.threshold.value = -24;
        c.knee.value = 24;
        c.ratio.value = 3;
        c.attack.value = 0.003;
        c.release.value = 0.25;
        state.comp = c;
      }
      if (!state.outGain) {
        const g = state.audioCtx.createGain();
        const master = (has$ && $.master && +$.master.value) || 1;
        g.gain.value = master;
        state.outGain = g;
      }
      if (!state.analyser) {
        const a = state.audioCtx.createAnalyser();
        a.fftSize = 2048;
        a.minDecibels = -95;
        a.maxDecibels = -20;
        a.smoothingTimeConstant = 0.82;
        state.analyser = a;
      }
      if (!state.eq || !state.eq.filters || !state.eq.filters.length) {
        ensureEqFilters(state.audioCtx);
      }

      // いったん全 disconnect（安全のため try-catch）
      try { state.mediaNode.disconnect(); } catch (_) {}
      (state.eq.filters || []).forEach(f => { try { f.disconnect(); } catch (_) {} });
      try { state.comp.disconnect(); } catch (_) {}
      try { state.outGain.disconnect(); } catch (_) {}
      try { state.analyser.disconnect(); } catch (_) {}

      // 配線: media -> eq* -> comp -> outGain -> destination
      let node = state.mediaNode;
      for (const f of (state.eq.filters || [])) {
        node.connect(f);
        node = f;
      }
      node.connect(state.comp);
      state.comp.connect(state.outGain);
      state.outGain.connect(state.audioCtx.destination);

      // analyser は並列で
      state.mediaNode.connect(state.analyser);

      // EQ 値を反映
      restoreEq();

      // 強制アンミュート & 音量回復
      forceUnmuteAndVolume();

      // マスターゲインを 0→目標へ短くランプ（無音の誤検知やクリック音回避）
      try {
        const t = now();
        const target = (has$ && $.master && +$.master.value) || 1;
        state.outGain.gain.cancelScheduledValues(t);
        state.outGain.gain.setValueAtTime(0.0001, t);
        state.outGain.gain.linearRampToValueAtTime(target, t + 0.12);
      } catch (_) {}
    } catch (_) {}
  }

  // === 既存の requestPlay をラップ ===
  const originalRequestPlay = window.requestPlay;
  window.requestPlay = async function (reason) {
    await hardResumeAudio();
    // 既存の補助があれば呼ぶ（安全音量復帰など）
    try { if (typeof window.forceUnmute === "function") window.forceUnmute(); } catch (_) {}
    try { if (typeof window.safeVolumeBump === "function") window.safeVolumeBump(); } catch (_) {}

    if (typeof originalRequestPlay === "function") {
      return originalRequestPlay(reason);
    } else {
      try { return await video.play(); } catch (_) { /* ブラウザ制限時は黙っておく */ }
    }
  };

  // === 保険: 再生系イベントで都度復旧を試みる ===
  const safeBind = (el, ev, fn, opt) => { try { el.addEventListener(ev, fn, opt || false); } catch (_) {} };

  safeBind(video, "loadedmetadata", () => { hardResumeAudio(); });
  safeBind(video, "canplay",        () => { hardResumeAudio(); });
  safeBind(video, "play",           () => { hardResumeAudio(); });
  safeBind(document, "visibilitychange", () => {
    if (!document.hidden) hardResumeAudio();
  });

  // Media Session 経由の再生（ロック画面/BTボタン等）
  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.setActionHandler("play", async () => {
        await hardResumeAudio();
        try { await video.play(); } catch (_) {}
      });
    } catch (_) {}
  }

  // 音量スライダ/ミュート操作のあとも無音化しないように監視（短時間）
  let watchdog = null;
  function startWatchdog() {
    clearInterval(watchdog);
    const start = Date.now();
    watchdog = setInterval(() => {
      forceUnmuteAndVolume();
      if (Date.now() - start > 4000) clearInterval(watchdog);
    }, 120);
  }
  safeBind(video, "volumechange", startWatchdog);
  safeBind(video, "emptied",      startWatchdog);

  // 初回のユーザー操作でのアンロック
  const firstGesture = () => {
    unlockAudioCtxOnce();
    hardResumeAudio();
    document.removeEventListener("click", firstGesture, { once: true });
    document.removeEventListener("keydown", firstGesture, { once: true });
  };
  document.addEventListener("click", firstGesture, { once: true });
  document.addEventListener("keydown", firstGesture, { once: true });

  // 外部音声（extAudio）を使っているケースの同期（存在する実装を尊重）
  // → ここではミュート/音量だけを合わせる
  safeBind(video, "play", () => {
    try {
      if (state.extAudio && state.extAudio.paused) state.extAudio.play().catch(() => {});
      if (state.extAudio) state.extAudio.muted = false;
    } catch (_) {}
  });
  safeBind(video, "pause", () => {
    try {
      if (state.extAudio && !state.extAudio.paused) state.extAudio.pause();
    } catch (_) {}
  });

  // 仕上げ: 読み込み直後にも一度だけ実行（状態が落ちている時の保険）
  hardResumeAudio();
})();

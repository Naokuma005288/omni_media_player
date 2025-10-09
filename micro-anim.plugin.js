// micro-anim.plugin.js
(() => {
  const $ = s => document.querySelector(s);
  const wrap = $('#playerWrap');
  const video = $('#v');
  const seek = $('#seek');

  if (!wrap || !video || !seek) return;

  const prefersReduced = matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch{ return d } },
    set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch{} }
  };

  const KEY = 'pc.microanim';
  const defaults = { playBurst: !prefersReduced, seekTrail: !prefersReduced, coverGlare: false, focusHalo: true, sliderGlow: true, badgePulse:false };
  let conf = Object.assign({}, defaults, store.get(KEY, {}));

  /* ===================== 追加Canvas（再生バースト用） ===================== */
  const burstLayer = document.createElement('canvas');
  burstLayer.className = 'micro-layer';
  wrap.appendChild(burstLayer);
  const bc = burstLayer.getContext('2d');

  const dpr = Math.max(1, window.devicePixelRatio || 1);
  function resizeBurst(){
    const r = wrap.getBoundingClientRect();
    burstLayer.style.width = r.width+'px';
    burstLayer.style.height = r.height+'px';
    burstLayer.width = Math.max(1, Math.floor(r.width*dpr));
    burstLayer.height = Math.max(1, Math.floor(r.height*dpr));
  }
  resizeBurst();
  new ResizeObserver(resizeBurst).observe(wrap);

  let particles = [];
  let raf = 0;
  function tick(){
    raf = particles.length ? requestAnimationFrame(tick) : 0;
    const W = burstLayer.width, H = burstLayer.height;
    bc.clearRect(0,0,W,H);
    const g = 0.08*dpr;
    for (let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.vx *= 0.985; p.vy += g;
      p.x += p.vx; p.y += p.vy;
      p.a -= 0.012;
      if (p.a <= 0 || p.y > H+40*dpr) { particles.splice(i,1); continue; }
      bc.globalAlpha = Math.max(0, p.a);
      bc.beginPath();
      bc.arc(p.x, p.y, p.r, 0, Math.PI*2);
      bc.fillStyle = `hsla(${p.h}, 80%, 60%, 1)`;
      bc.fill();
    }
  }
  function burst(){
    if (!conf.playBurst) return;
    // 軽量パーティクル
    const W = burstLayer.width, H = burstLayer.height;
    const cx = W*0.5, cy = H*0.6;
    const n = 42;
    for (let i=0;i<n;i++){
      const ang = (Math.PI*2) * (i/n) + (Math.random()*0.5);
      const sp = (3 + Math.random()*5) * dpr;
      particles.push({
        x: cx + Math.cos(ang)*10*dpr,
        y: cy + Math.sin(ang)*6*dpr,
        vx: Math.cos(ang)*sp,
        vy: Math.sin(ang)*sp*0.8 - 1.5*dpr,
        r: (2+Math.random()*2)*dpr,
        h: (i/n)*360,
        a: 0.95
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }

  // 再生/一時停止の“山場”で発火（埋め込みは重くなるので抑制）
  video.addEventListener('play', () => {
    const usingEmbed = !!(wrap.querySelector('iframe') || wrap.querySelector('#yt'));
    if (!usingEmbed) burst();
  });

  /* ===================== シーク・スパーク（親指の残光） ===================== */
  const sparkLayer = document.createElement('canvas');
  sparkLayer.className = 'seek-spark-layer';
  wrap.appendChild(sparkLayer);
  const sc = sparkLayer.getContext('2d');

  function resizeSpark(){
    const rect = seek.getBoundingClientRect();
    sparkLayer.style.width = rect.width+'px';
    sparkLayer.width = Math.max(1, Math.floor(rect.width*dpr));
    sparkLayer.height = Math.max(1, Math.floor(12*dpr));
  }
  resizeSpark();
  new ResizeObserver(resizeSpark).observe(seek);

  let sparks = [], sraf = 0;
  function stick(){
    sraf = sparks.length ? requestAnimationFrame(stick) : 0;
    const W = sparkLayer.width, H = sparkLayer.height;
    sc.clearRect(0,0,W,H);
    for (let i=sparks.length-1;i>=0;i--){
      const p=sparks[i];
      p.x += p.vx; p.vx *= 0.94;
      p.a -= 0.04; p.r *= 0.985;
      if (p.a<=0.01 || p.r<0.3*dpr){ sparks.splice(i,1); continue; }
      sc.globalCompositeOperation = 'lighter';
      sc.globalAlpha = p.a;
      sc.beginPath();
      sc.arc(p.x, H*0.5, p.r, 0, Math.PI*2);
      sc.fillStyle = `hsla(${p.h},90%,65%,1)`;
      sc.fill();
    }
  }
  function addSpark(clientX){
    if (!conf.seekTrail) return;
    const r = seek.getBoundingClientRect();
    const x = (clientX - r.left) * dpr;
    const hue = 180 + (x / Math.max(1, r.width)) * 180;
    for (let i=0;i<3;i++){
      sparks.push({
        x: x + (Math.random()*2-1)*2*dpr,
        vx: (Math.random()*2-1)*0.9*dpr,
        r: (1.2+Math.random()*1.8)*dpr,
        a: 0.8, h: hue+Math.random()*20
      });
    }
    if (!sraf) sraf = requestAnimationFrame(stick);
  }
  seek.addEventListener('mousemove', e => addSpark(e.clientX));
  seek.addEventListener('touchmove', e => addSpark(e.touches[0].clientX), {passive:true});

  /* ===================== “質感”のクラス適用 ===================== */
  function applyClasses(){
    document.body.classList.toggle('anim-cover-glare', !!conf.coverGlare);
    document.body.classList.toggle('anim-focus-halo', !!conf.focusHalo);
    document.body.classList.toggle('anim-badge-pulse', !!conf.badgePulse);
    document.body.classList.toggle('anim-slider-glow', !!conf.sliderGlow);
  }
  applyClasses();

  // スライダーの“コクッ”
  function bindSliderPop(){
    if (!conf.sliderGlow) return;
    const sliders = Array.from(document.querySelectorAll('.ctrl input[type=range]'));
    sliders.forEach(el=>{
      el.addEventListener('input', ()=>{
        el.classList.add('range-pop');
        setTimeout(()=>el.classList.remove('range-pop'), 120);
      });
    });
  }
  bindSliderPop();

  /* ===================== 設定UI（アニメ タブに自動増設） ===================== */
  function animPanel(){
    // タブ機能あり: [data-tab-panel="anim"] / なし: 最初の.settings-grid
    return document.querySelector('#settings .settings-panels [data-tab-panel="anim"]')
        || document.querySelector('#settings .settings-grid');
  }
  function buildSettings(){
    const panel = animPanel(); if(!panel) return;
    if (panel.querySelector('[data-micro-anim]')) return;

    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.dataset.microAnim = '1';
    sec.innerHTML = `
      <h4>微細アニメーション（質感アップ）</h4>
      <div class="row switch"><input id="maPlayBurst" type="checkbox"><label for="maPlayBurst">再生時のバースト</label></div>
      <div class="row switch"><input id="maSeekTrail" type="checkbox"><label for="maSeekTrail">シーク親指の残光</label></div>
      <div class="row switch"><input id="maCoverGlare" type="checkbox"><label for="maCoverGlare">カバーのグレア</label></div>
      <div class="row switch"><input id="maFocusHalo" type="checkbox"><label for="maFocusHalo">フォーカス・ハロー</label></div>
      <div class="row switch"><input id="maSliderGlow" type="checkbox"><label for="maSliderGlow">スライダー発光/ポップ</label></div>
      <div class="row switch"><input id="maBadgePulse" type="checkbox"><label for="maBadgePulse">バッジ微スイング</label></div>
      <div class="row"><span class="badge">※ OSの「視差/動きを減らす」を尊重します。</span></div>
    `;
    panel.appendChild(sec);

    // 初期値
    sec.querySelector('#maPlayBurst').checked  = !!conf.playBurst;
    sec.querySelector('#maSeekTrail').checked  = !!conf.seekTrail;
    sec.querySelector('#maCoverGlare').checked = !!conf.coverGlare;
    sec.querySelector('#maFocusHalo').checked  = !!conf.focusHalo;
    sec.querySelector('#maSliderGlow').checked = !!conf.sliderGlow;
    sec.querySelector('#maBadgePulse').checked = !!conf.badgePulse;

    const readUI = () => ({
      playBurst:  sec.querySelector('#maPlayBurst').checked,
      seekTrail:  sec.querySelector('#maSeekTrail').checked,
      coverGlare: sec.querySelector('#maCoverGlare').checked,
      focusHalo:  sec.querySelector('#maFocusHalo').checked,
      sliderGlow: sec.querySelector('#maSliderGlow').checked,
      badgePulse: sec.querySelector('#maBadgePulse').checked
    });

    // 既存の「アニメーションを適用」ボタンに相乗り
    const applyBtn = document.getElementById('btnApplyAnim');
    const apply = () => {
      conf = readUI();
      store.set(KEY, conf);
      applyClasses();
      bindSliderPop();
      (window.toast||console.log)('微細アニメーションを適用');
    };
    // 1) 既存適用ボタン
    applyBtn?.addEventListener('click', apply);
    // 2) チェック即時反映派にも対応（軽いものだけ）
    sec.addEventListener('change', (e)=>{
      const id = e.target?.id||'';
      if (id) { conf = readUI(); store.set(KEY, conf); applyClasses(); }
    });
  }

  // 設定を開いた時に挿入
  document.getElementById('btnSettings')?.addEventListener('click', () => setTimeout(buildSettings, 0), { once:true });
  window.addEventListener('load', () => setTimeout(buildSettings, 400));

})();

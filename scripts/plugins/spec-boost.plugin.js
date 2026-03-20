// spec-boost.plugin.js
(() => {
  const qs = (s, r = document) => r.querySelector(s);
  const wrap = qs('#playerWrap');
  const seek = qs('#seek');
  const spec = qs('#spectrum');
  if (!wrap || !seek || !spec) return;

  const store = {
    get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch{ return d } },
    set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch{} }
  };

  const KEY = 'pc.specboost';
  const prefersReduced = matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let cfg = Object.assign({
    neonGlow: true,
    waveform: true,
    orbitSparks: false,
    trails: 0.18,
    glowStrength: 1.0,
    fps: prefersReduced ? 45 : 60,
    autoLow: true
  }, store.get(KEY, {}));

  const ovGlow = document.createElement('canvas');
  ovGlow.className = 'spec-ov-glow';
  const ov = document.createElement('canvas');
  ov.className = 'spec-ov';
  wrap.appendChild(ovGlow);
  wrap.appendChild(ov);
  const cg = ovGlow.getContext('2d');
  const c = ov.getContext('2d');

  const runtime = { avgMs: 0, low: false };
  let peaks = null;
  let detachOverlay = null;
  let lastLayoutKey = '';

  function getState(){ return window.OPRuntime?.state || window.state || {} }
  function clear(){
    cg.clearRect(0, 0, ovGlow.width, ovGlow.height);
    c.clearRect(0, 0, ov.width, ov.height);
  }

  function sizeToSpectrum(){
    const pr = wrap.getBoundingClientRect();
    const seekRect = seek.getBoundingClientRect();
    const left = Math.round(seekRect.left - pr.left);
    const right = Math.round(pr.right - seekRect.right);
    const bottom = Math.round(pr.bottom - seekRect.bottom);
    const h = Math.round(spec.clientHeight);
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const widthPx = Math.max(1, Math.floor((pr.width - left - right) * dpr));
    const heightPx = Math.max(1, Math.floor(h * dpr));
    const layoutKey = [left, right, bottom, h, widthPx, heightPx].join(':');
    if (layoutKey === lastLayoutKey) return;
    lastLayoutKey = layoutKey;
    for (const el of [ovGlow, ov]){
      el.style.left = left + 'px';
      el.style.right = right + 'px';
      el.style.bottom = bottom + 'px';
      el.style.height = h + 'px';
      el.width = widthPx;
      el.height = heightPx;
    }
  }

  function syncFpsToCore(){
    const fps = Math.max(50, Math.min(60, +cfg.fps || 60));
    const s = getState();
    if (s?.spec) s.spec.maxFps = fps;
    store.set('pc.spec.maxFps', fps);
    cfg.fps = fps;
  }

  function detectLowMode(dtMs){
    runtime.avgMs = runtime.avgMs ? (runtime.avgMs * 0.88 + dtMs * 0.12) : dtMs;
    if (!cfg.autoLow){
      runtime.low = false;
      return;
    }
    if (!runtime.low && runtime.avgMs > 20) runtime.low = true;
    else if (runtime.low && runtime.avgMs < 14) runtime.low = false;
  }

  function colorForBand(i, bins, frame, specState){
    const sat = +(specState?.sat || 88);
    const baseL = +(specState?.light || 82);
    const loud = Math.min(1, frame.rms * 1.8);
    if (frame.mode === 'mono') return `hsla(0, 0%, ${baseL * (0.78 + 0.22 * loud)}%, 1)`;
    if ((frame.mode === 'pitch' || frame.mode === 'circular') && frame.centers?.[i]){
      const ny = (getState().audioCtx?.sampleRate || 48000) / 2;
      const hueLow = +(specState?.hueLow || 18);
      const hueHigh = +(specState?.hueHigh || 260);
      const p = Math.log10(Math.max(30, frame.centers[i])) / Math.log10(ny);
      const h = hueLow + (hueHigh - hueLow) * p;
      return `hsla(${h}, ${sat}%, ${baseL * (0.78 + 0.22 * loud)}%, 1)`;
    }
    const phase = (i / Math.max(1, bins)) * 360 + +(specState?.rainbowPhase || 0);
    return `hsla(${phase}, ${sat}%, ${baseL * (0.78 + 0.22 * loud)}%, 1)`;
  }

  function render(frame){
    if (spec.style.display === 'none'){
      clear();
      return;
    }
    sizeToSpectrum();
    detectLowMode(frame.dtMs);

    const specState = getState().spec || {};
    const bins = Math.max(60, Math.min(220, frame.bins || specState.bins || 160));
    const ranges = frame.ranges?.length ? frame.ranges : new Array(bins).fill(0).map((_, i) => [i, i + 1]);
    if (!peaks || peaks.length !== bins) peaks = new Float32Array(bins).fill(0);

    const W = ov.width;
    const H = ov.height;
    const gain = +(specState.sens || 1.0);
    const trailsEnabled = !!getState().anim?.specTrails;
    const minDb = frame.analyser.minDecibels;
    const maxDb = frame.analyser.maxDecibels;
    const rangeDb = Math.max(1, maxDb - minDb);
    const barW = W / bins;
    const pad = Math.max(2 * frame.dpr, Math.floor(barW * 0.12));
    const inner = Math.max(1 * frame.dpr, barW - pad);

    if (trailsEnabled && cfg.trails > 0){
      cg.globalAlpha = runtime.low ? Math.max(0.02, cfg.trails * 0.55) : Math.max(0.02, Math.min(0.45, cfg.trails));
      cg.globalCompositeOperation = 'source-over';
      cg.fillStyle = 'rgba(0,0,0,1)';
      cg.fillRect(0, 0, W, H);
    } else {
      cg.clearRect(0, 0, W, H);
    }
    c.clearRect(0, 0, W, H);

    for (let i = 0; i < bins; i++){
      const [a, b] = ranges[i];
      let sum = 0;
      const count = Math.max(1, b - a);
      for (let k = a; k < b; k++) sum += frame.freqData[k] || 0;
      const mag = sum / count;
      const db = minDb + (mag / 255) * rangeDb;
      peaks[i] = Math.max(db, peaks[i] - (runtime.low ? 1.4 : 0.8));

      let val = (db - minDb) / rangeDb;
      val = Math.max(0, Math.min(1, val * gain));
      const h = Math.floor((val * val) * (H - 6 * frame.dpr));
      const x = i * barW + pad / 2;
      const y = H - h;

      if (cfg.neonGlow){
        cg.globalCompositeOperation = 'lighter';
        cg.globalAlpha = (runtime.low ? 0.48 : 0.72) * cfg.glowStrength + frame.rms * 0.22;
        cg.fillStyle = colorForBand(i, bins, frame, specState);
        cg.fillRect(x, y, inner, h);
      }
    }

    if (cfg.waveform){
      c.globalAlpha = runtime.low ? (0.62 + 0.14 * frame.rms) : (0.78 + 0.18 * frame.rms);
      c.globalCompositeOperation = 'source-over';
      c.lineWidth = runtime.low ? Math.max(1.2, 1.15 * frame.dpr) : Math.max(1.8, 1.75 * frame.dpr);
      c.strokeStyle = 'rgba(255,255,255,1)';
      c.shadowBlur = runtime.low ? 4 * frame.dpr : 7 * frame.dpr;
      c.shadowColor = 'rgba(255,255,255,0.55)';
      c.beginPath();
      const td = frame.timeData || [];
      for (let i = 0; i < td.length; i++){
        const nx = (i / Math.max(1, td.length - 1)) * W;
        const ny = (1 - td[i] / 255) * H;
        if (i === 0) c.moveTo(nx, ny);
        else c.lineTo(nx, ny);
      }
      c.stroke();
      c.shadowBlur = 0;
    }

    if (cfg.orbitSparks && frame.mode === 'circular' && !runtime.low){
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.38;
      const n = 8;
      c.globalCompositeOperation = 'lighter';
      for (let i = 0; i < n; i++){
        const a = (performance.now() / 1000 * (0.6 + i * 0.03)) + i * (Math.PI * 2 / n);
        const r = R + Math.sin(performance.now() / 500 + i) * 6 * frame.dpr;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        c.globalAlpha = 0.35 + 0.45 * frame.rms;
        c.beginPath();
        c.arc(x, y, (1.2 + 2 * frame.rms) * frame.dpr, 0, Math.PI * 2);
        c.fillStyle = `hsl(${(i / n) * 360}, 90%, ${60 + frame.rms * 20}%)`;
        c.fill();
      }
    }

    const badge = document.getElementById('sbRuntime');
    if (badge) badge.textContent = runtime.low ? 'AutoLow: ON' : 'AutoLow: OFF';
  }

  function panelSpec(){
    return document.querySelector('#settings .settings-panels [data-tab-panel="spec"]')
      || document.querySelector('#settings .settings-grid');
  }

  function buildSettings(){
    const p = panelSpec();
    if (!p || p.querySelector('[data-spec-boost]')) return;

    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.dataset.specBoost = '1';
    sec.innerHTML = `
      <h4>スペクトラム強化 <span class="spec-boost-on">Boost</span></h4>
      <div class="row switch"><input id="sbNeon" type="checkbox"><label for="sbNeon">ネオングロー</label></div>
      <div class="row switch"><input id="sbWave" type="checkbox"><label for="sbWave">白波形を表示</label></div>
      <div class="row switch"><input id="sbOrbit" type="checkbox"><label for="sbOrbit">オービット火花（円形時）</label></div>
      <div class="row switch"><input id="sbAutoLow" type="checkbox"><label for="sbAutoLow">省エネ自動調整</label><span class="badge" id="sbRuntime">AutoLow: OFF</span></div>

      <div class="row"><label>トレイル</label><input id="sbTrail" type="range" min="0" max="0.4" step="0.02"/></div>
      <div class="row"><label>グロー強度</label><input id="sbGlow" type="range" min="0.5" max="1.5" step="0.05"/></div>
      <div class="row"><label>FPS制限</label><input id="sbFps" type="range" min="50" max="60" step="1"/></div>
      <div class="row"><span class="spec-boost-note">※ このチェックで白波形の表示/非表示を切り替えます。重い時は AutoLow が火花や強い発光を先に抑えます。</span></div>
    `;
    p.appendChild(sec);
    const byId = id => sec.querySelector('#' + id);
    byId('sbNeon').checked = !!cfg.neonGlow;
    byId('sbWave').checked = !!cfg.waveform;
    byId('sbOrbit').checked = !!cfg.orbitSparks;
    byId('sbAutoLow').checked = !!cfg.autoLow;
    byId('sbTrail').value = cfg.trails;
    byId('sbGlow').value = cfg.glowStrength;
    byId('sbFps').value = cfg.fps;

    const read = () => ({
      neonGlow: byId('sbNeon').checked,
      waveform: byId('sbWave').checked,
      orbitSparks: byId('sbOrbit').checked,
      autoLow: byId('sbAutoLow').checked,
      trails: +byId('sbTrail').value,
      glowStrength: +byId('sbGlow').value,
      fps: +byId('sbFps').value
    });

    const apply = () => {
      cfg = read();
      store.set(KEY, cfg);
      syncFpsToCore();
    };
    sec.addEventListener('input', apply);
    sec.addEventListener('change', apply);
    apply();
  }

  sizeToSpectrum();
  new ResizeObserver(sizeToSpectrum).observe(wrap);
  new ResizeObserver(sizeToSpectrum).observe(spec);
  const visObs = new MutationObserver(() => {
    if (spec.style.display === 'none') clear();
    sizeToSpectrum();
  });
  visObs.observe(spec, { attributes: true, attributeFilter: ['style', 'class'] });

  syncFpsToCore();
  detachOverlay = window.OPRuntime?.registerSpectrumOverlay?.(render) || null;
  document.getElementById('btnSettings')?.addEventListener('click', () => setTimeout(buildSettings, 0), { once: true });
  window.addEventListener('load', () => setTimeout(buildSettings, 300));
  window.addEventListener('beforeunload', () => { try{ detachOverlay?.() }catch{} });
})();

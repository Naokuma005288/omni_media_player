// spec-boost.plugin.js
(() => {
  const qs = (s,r=document)=>r.querySelector(s);
  const wrap = qs('#playerWrap');
  const seek = qs('#seek');
  const spec = qs('#spectrum');

  if(!wrap || !seek || !spec) return;

  /* ====== 設定の保存 ====== */
  const store = {
    get(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch{ return d } },
    set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch{} }
  };
  const KEY = 'pc.specboost';
  const prefersReduced = matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let cfg = Object.assign({
    neonGlow: true,
    peakCaps: true,
    waveform: true,
    orbitSparks: false,       // 円形モード専用
    trails: 0.18,             // 0..0.4 ぐらい推奨
    glowStrength: 1.0,        // 0.5..1.5
    fps: prefersReduced ? 30 : 60,
  }, store.get(KEY, {}));

  /* ====== レイヤー作成 ====== */
  const ovGlow = document.createElement('canvas');
  ovGlow.className = 'spec-ov-glow';
  const ov = document.createElement('canvas');
  ov.className = 'spec-ov';
  wrap.appendChild(ovGlow);
  wrap.appendChild(ov);
  const cg = ovGlow.getContext('2d');
  const c  = ov.getContext('2d');

  const dpr = Math.max(1, window.devicePixelRatio||1);
  function sizeToSpectrum(){
    const r = spec.getBoundingClientRect();
    const pr = wrap.getBoundingClientRect();

    // ベース #spectrum に重ねる（左右余白は #seek に合わせ目視揃え）
    const left  = Math.round(seek.getBoundingClientRect().left - pr.left);
    const right = Math.round(pr.right - seek.getBoundingClientRect().right);
    const bottom= Math.round(pr.bottom - seek.getBoundingClientRect().bottom);
    const h     = Math.round(spec.clientHeight);

    for(const el of [ovGlow, ov]){
      el.style.left   = left+'px';
      el.style.right  = right+'px';
      el.style.bottom = bottom+'px';
      el.style.height = h+'px';
      el.width  = Math.max(1, Math.floor((pr.width-left-right)*dpr));
      el.height = Math.max(1, Math.floor(h*dpr));
    }
  }
  sizeToSpectrum();
  new ResizeObserver(sizeToSpectrum).observe(wrap);
  new ResizeObserver(sizeToSpectrum).observe(spec);

  /* ====== 音声データ参照 ====== */
  const getState = () => (window.state||{});
  const getAnalyser = () => getState().analyser || null;

  // 既存のログバンド定義があればそれを使う（バー位置を同期）
  function ensureLogBins(analyser){
    const s = getState();
    if (s._logRanges && s._logCenters && s._logRanges.length === (s.spec?.bins||0)){
      return { ranges: s._logRanges, centers: s._logCenters, bins: s.spec.bins };
    }
    // フォールバック：線形割当
    const bins = Math.max(60, Math.min(220, s.spec?.bins||160));
    const N = analyser.frequencyBinCount;
    const step = Math.floor(N / bins);
    const ranges=[], centers=[];
    for(let i=0;i<bins;i++){
      const a = i*step, b = (i===bins-1)? N : (i+1)*step;
      ranges.push([a,b]);
      centers.push((a+b)/2);
    }
    return { ranges, centers, bins };
  }

  /* ====== ループ ====== */
  let peaks = null, raf=0, last=0;
  function loop(t){
    const an = getAnalyser();
    if(!an || spec.style.display==='none'){ cg.clearRect(0,0,ovGlow.width,ovGlow.height); c.clearRect(0,0,ov.width,ov.height); raf=0; return; }

    raf = requestAnimationFrame(loop);

    const maxFps = Math.max(15, Math.min(120, cfg.fps));
    if (t - last < 1000/maxFps) return; last = t;

    const W = ov.width, H = ov.height;
    const data = new Uint8Array(an.frequencyBinCount);
    an.getByteFrequencyData(data);

    const mode = (getState().spec?.mode)||'mono'; // mono/pitch/rainbow/circular
    const { ranges, bins } = ensureLogBins(an);
    if (!peaks || peaks.length!==bins) peaks = new Float32Array(bins).fill(an.minDecibels);

    // Trails（グロー層だけゆっくり消す）
    if (cfg.trails>0){
      cg.globalAlpha = Math.max(0.02, Math.min(0.45, cfg.trails));
      cg.globalCompositeOperation = 'source-over';
      cg.fillStyle = 'rgba(0,0,0,1)';
      cg.fillRect(0,0,W,H);
    }else{
      cg.clearRect(0,0,W,H);
    }
    c.clearRect(0,0,W,H);

    // 参照値
    const minDb = an.minDecibels, maxDb = an.maxDecibels, range = maxDb - minDb;
    const gain  = (getState().spec?.sens)||1.0;
    const barW  = W / bins;
    const pad   = Math.max(2*dpr, Math.floor(barW*0.12));
    const inner = Math.max(1*dpr, barW - pad);
    const capH  = Math.max(2*dpr, Math.floor(H*0.015));

    // RMS（下地の呼吸 & カラー強度）
    const td = new Uint8Array(Math.min(1024, an.fftSize));
    an.getByteTimeDomainData(td);
    let acc=0; for(let i=0;i<td.length;i++){ const v=(td[i]-128)/128; acc+=v*v }
    const rms = Math.min(1, Math.sqrt(acc/td.length)*1.6);

    // ====== バー位置に合わせた“ネオン/キャップ” ======
    for (let i=0;i<bins;i++){
      const [a,b] = ranges[i];
      let sum=0, count=Math.max(1,b-a);
      for (let k=a;k<b;k++) sum += data[k];
      const mag = sum / count;
      const db  = minDb + (mag/255) * range;
      // Peak hold
      const prev = peaks[i];
      const alpha = 0.22; // 平滑
      const smoothed = (1-alpha)*db + alpha*prev;
      peaks[i] = Math.max(smoothed, prev - 0.8); // 毎フレーム少しずつ落下

      // 0..1
      let val = (smoothed - minDb)/range * gain;
      val = Math.max(0, Math.min(1, val));
      const h = Math.floor((val*val) * (H - capH*1.8));

      const x = i*barW + pad/2;
      const y = H - h;

      // Neon glow（下層）
      if (cfg.neonGlow){
        cg.globalCompositeOperation = 'lighter';
        cg.globalAlpha = (0.55 + 0.35*rms) * cfg.glowStrength;
        cg.fillStyle = mode==='mono'
          ? 'rgba(255,255,255,1)'
          : `hsl(${(i/bins)*360}, 90%, ${70 + rms*10}%)`;
        cg.fillRect(x, y, inner, h);
      }

      // Peak caps（上層）
      if (cfg.peakCaps && h>capH*1.2){
        const pv  = Math.max(0, Math.min(1, (peaks[i]-minDb)/range * gain));
        const ph  = Math.floor((pv*pv) * (H - capH*1.8));
        const py  = H - ph - capH;
        c.globalAlpha = .95;
        c.fillStyle = mode==='mono' ? 'rgba(250,250,250,0.95)' : 'rgba(255,255,255,0.95)';
        c.fillRect(x, Math.max(0,py), inner, capH);
      }
    }

    // ====== 波形オーバーレイ ======
    if (cfg.waveform){
      c.globalAlpha = 0.25 + 0.35*rms;
      c.globalCompositeOperation = 'lighter';
      c.lineWidth = Math.max(1, 1.25*dpr);
      c.strokeStyle = 'rgba(255,255,255,1)';
      c.beginPath();
      for(let i=0;i<td.length;i++){
        const nx = (i/(td.length-1))*W;
        const ny = (1 - (td[i]/255))*H;
        (i===0)? c.moveTo(nx,ny) : c.lineTo(nx,ny);
      }
      c.stroke();
    }

    // ====== 円形モードなら “オービット火花” 追加 ======
    if (cfg.orbitSparks && (getState().spec?.mode)==='circular'){
      const cx=W/2, cy=H/2;
      const R = Math.min(W,H)*0.38;
      const n = 8;
      c.globalCompositeOperation='lighter';
      for(let i=0;i<n;i++){
        const a = (t/1000 * (0.6 + i*0.03)) + i*(Math.PI*2/n);
        const r = R + Math.sin(t/500 + i)*6*dpr;
        const x = cx + Math.cos(a)*r;
        const y = cy + Math.sin(a)*r;
        c.globalAlpha = 0.35 + 0.45*rms;
        c.beginPath();
        c.arc(x,y, (1.2+2*rms)*dpr, 0, Math.PI*2);
        c.fillStyle = `hsl(${(i/n)*360}, 90%, ${60 + rms*20}%)`;
        c.fill();
      }
    }
  }

  function start(){ if(!raf) raf = requestAnimationFrame(loop) }
  function stop(){ if(raf){ cancelAnimationFrame(raf); raf=0 } }

  // #spectrum の表示に追従
  const visObs = new MutationObserver(()=>{ (spec.style.display!=='none')? start():stop() });
  visObs.observe(spec, { attributes:true, attributeFilter:['style','class'] });
  window.addEventListener('load', ()=>{ (spec.style.display!=='none')? start():stop() });

  /* ====== 設定UIを “スペクトラム” タブに挿入 ====== */
  function panelSpec(){
    return document.querySelector('#settings .settings-panels [data-tab-panel="spec"]')
        || document.querySelector('#settings .settings-grid');
  }
  function buildSettings(){
    const p = panelSpec(); if(!p) return;
    if (p.querySelector('[data-spec-boost]')) return;

    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.dataset.specBoost = '1';
    sec.innerHTML = `
      <h4>スペクトラム強化 <span class="spec-boost-on">Boost</span></h4>
      <div class="row switch"><input id="sbNeon" type="checkbox"><label for="sbNeon">ネオングロー</label></div>
      <div class="row switch"><input id="sbCaps" type="checkbox"><label for="sbCaps">ピークキャップ</label></div>
      <div class="row switch"><input id="sbWave" type="checkbox"><label for="sbWave">波形オーバーレイ</label></div>
      <div class="row switch"><input id="sbOrbit" type="checkbox"><label for="sbOrbit">オービット火花（円形時）</label></div>

      <div class="row"><label>トレイル</label>
        <input id="sbTrail" type="range" min="0" max="0.4" step="0.02"/>
      </div>
      <div class="row"><label>グロー強度</label>
        <input id="sbGlow" type="range" min="0.5" max="1.5" step="0.05"/>
      </div>
      <div class="row"><label>FPS制限</label>
        <input id="sbFps" type="range" min="15" max="120" step="1"/>
      </div>
      <div class="row"><span class="spec-boost-note">※ CPU/GPUが厳しい時はFPSやトレイルを下げてね。</span></div>
    `;
    p.appendChild(sec);

    // 初期反映
    const byId = id => sec.querySelector('#'+id);
    byId('sbNeon').checked = !!cfg.neonGlow;
    byId('sbCaps').checked = !!cfg.peakCaps;
    byId('sbWave').checked = !!cfg.waveform;
    byId('sbOrbit').checked= !!cfg.orbitSparks;
    byId('sbTrail').value  = cfg.trails;
    byId('sbGlow').value   = cfg.glowStrength;
    byId('sbFps').value    = cfg.fps;

    const read = () => ({
      neonGlow:  byId('sbNeon').checked,
      peakCaps:  byId('sbCaps').checked,
      waveform:  byId('sbWave').checked,
      orbitSparks: byId('sbOrbit').checked,
      trails:    +byId('sbTrail').value,
      glowStrength:+byId('sbGlow').value,
      fps:       +byId('sbFps').value,
    });

    sec.addEventListener('input', ()=>{
      cfg = read(); store.set(KEY, cfg);
    });
    sec.addEventListener('change', ()=>{
      cfg = read(); store.set(KEY, cfg);
    });
  }

  // 設定を開いた時・起動時に挿入
  document.getElementById('btnSettings')?.addEventListener('click', () => setTimeout(buildSettings, 0), { once:true });
  window.addEventListener('load', () => setTimeout(buildSettings, 400));

  // ページ離脱で解放
  window.addEventListener('beforeunload', stop);
})();

// anim-plus.plugin.js
(() => {
  const qs=(s,r=document)=>r.querySelector(s);
  const wrap = qs('#playerWrap'); if(!wrap) return;

  // ===== 設定の保存 =====
  const store = {
    get(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch{ return d } },
    set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch{} }
  };
  const KEY='pc.animplus';
  const prefersReduced = matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let cfg = Object.assign({
    letterbox: true,         // ポーズ中に黒帯
    letterboxSize: 7.5,      // 画面高さ%（上下に適用）
    beatZoom: 0.06,          // 0〜0.12 推奨
    beams: true,             // 光の柱（ビーム）
    beamsMaxOpacity: .55,
    cursorSparks: !prefersReduced,
    cursorDensity: 0.55,     // 0〜1
  }, store.get(KEY, {}));

  // ===== レイヤー生成 =====
  // ビーム
  const beams = document.createElement('div');
  beams.className = 'ap-layer ap-beams';
  wrap.appendChild(beams);

  // レターボックス
  const lbTop = document.createElement('div');
  const lbBot = document.createElement('div');
  lbTop.className = 'ap-letterbox ap-lb-top';
  lbBot.className = 'ap-letterbox ap-lb-bot';
  wrap.appendChild(lbTop); wrap.appendChild(lbBot);

  // カーソル・スパーク用キャンバス
  const sparkCvs = document.createElement('canvas');
  sparkCvs.className = 'ap-cursor';
  wrap.appendChild(sparkCvs);
  const sctx = sparkCvs.getContext('2d');
  const dpr = Math.max(1, window.devicePixelRatio||1);
  function resize() {
    const r = wrap.getBoundingClientRect();
    sparkCvs.width = Math.max(1, Math.floor(r.width*dpr));
    sparkCvs.height= Math.max(1, Math.floor(r.height*dpr));
    sparkCvs.style.width = r.width+'px';
    sparkCvs.style.height= r.height+'px';
  }
  new ResizeObserver(resize).observe(wrap); resize();

  // ===== ビート取得（RMS） =====
  const getState = () => (window.state||{});
  const getAnalyser = () => getState().analyser || null;
  function getRMS(){
    const an = getAnalyser(); if(!an) return 0;
    // 既存コードが window.computeRMS を公開済み
    if (typeof window.computeRMS === 'function') return Math.min(1, window.computeRMS(an)*1.8);
    const buf = new Uint8Array(Math.min(1024, an.fftSize));
    an.getByteTimeDomainData(buf);
    let acc=0; for(let i=0;i<buf.length;i++){ const v=(buf[i]-128)/128; acc+=v*v }
    return Math.min(1, Math.sqrt(acc/buf.length)*1.8);
  }

  // ===== ループ（ビート・ズーム＆ビーム） =====
  let raf=0, last=0;
  function loop(t){
    raf = requestAnimationFrame(loop);
    if (t-last < 1000/60) return; last=t;

    const paused = !!qs('body')?.classList.contains('is-playing') ? false : true;
    // レターボックス
    if (cfg.letterbox){
      const px = Math.max(0, Math.min(25, +cfg.letterboxSize || 0));
      const h = paused ? px+'%' : '0';
      lbTop.style.height = h;
      lbBot.style.height = h;
    }else{
      lbTop.style.height='0'; lbBot.style.height='0';
    }

    // ビート
    const rms = paused ? 0 : getRMS(); // ポーズ時は演出を抑える
    const zoom = 1 + (cfg.beatZoom||0)*rms;
    document.documentElement.style.setProperty('--card-zoom', `scale(${zoom.toFixed(4)})`);

    // ビームの明るさ
    beams.style.opacity = (cfg.beams ? (cfg.beamsMaxOpacity||.5)*rms : 0).toFixed(3);
  }

  function start(){ if(!raf) raf=requestAnimationFrame(loop) }
  function stop(){ if(raf){ cancelAnimationFrame(raf); raf=0 } }
  window.addEventListener('beforeunload', stop);
  window.addEventListener('load', start);

  // ===== カーソル・スパーク =====
  let particles = [];
  let mouseX=0, mouseY=0, over=false, lastEmit=0;
  function emit(x,y){
    const n = Math.round(4 * Math.max(0, Math.min(1, cfg.cursorDensity)));
    for(let i=0;i<n;i++){
      particles.push({
        x, y,
        vx: (Math.random()-0.5)*1.2*dpr,
        vy: (Math.random()-0.8)*1.6*dpr,
        life: 1,
        hue: (performance.now()/40 + Math.random()*60)%360
      });
    }
  }
  function drawSparks(){
    if (!cfg.cursorSparks || !over) { sctx.clearRect(0,0,sparkCvs.width,sparkCvs.height); return; }
    sctx.clearRect(0,0,sparkCvs.width,sparkCvs.height);
    const now = performance.now();
    if(now-lastEmit>22){ emit(mouseX, mouseY); lastEmit=now }
    const rms = getRMS();
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.04*dpr; // 重力少し
      p.life -= 0.03 + 0.02*Math.random();
      if(p.life<=0){ particles.splice(i,1); continue; }
      const r = (1.2 + 2.4*rms)*dpr;
      sctx.globalCompositeOperation='lighter';
      sctx.globalAlpha = 0.25 + 0.55*p.life;
      sctx.beginPath();
      sctx.arc(p.x, p.y, r, 0, Math.PI*2);
      sctx.fillStyle = `hsl(${p.hue}, 90%, ${60 + rms*25}%)`;
      sctx.fill();
    }
    requestAnimationFrame(drawSparks);
  }
  wrap.addEventListener('mouseenter', e=>{ over=true; requestAnimationFrame(drawSparks) });
  wrap.addEventListener('mouseleave', e=>{ over=false; particles.length=0; sctx.clearRect(0,0,sparkCvs.width,sparkCvs.height) });
  wrap.addEventListener('mousemove', e=>{
    const r = wrap.getBoundingClientRect();
    mouseX = (e.clientX - r.left) * dpr;
    mouseY = (e.clientY - r.top ) * dpr;
  }, { passive:true });

  // ===== 設定UI（アニメタブに差し込む） =====
  function panelAnim(){
    return document.querySelector('#settings .settings-panels [data-tab-panel="anim"]')
        || document.querySelector('#settings .settings-grid');
  }
  function buildSettings(){
    const p = panelAnim(); if(!p) return;
    if (p.querySelector('[data-ap]')) return;

    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.dataset.ap = '1';
    sec.innerHTML = `
      <h4>アニメ拡張 <span class="ap-badge">Plus</span></h4>

      <div class="row switch">
        <input id="apLb" type="checkbox"><label for="apLb">ポーズ時のレターボックス</label>
      </div>
      <div class="row">
        <label>レターボックス高さ(%)</label>
        <input id="apLbSize" type="range" min="0" max="20" step="0.5">
      </div>

      <div class="row">
        <label>ビート・ズーム</label>
        <input id="apBeat" type="range" min="0" max="0.12" step="0.005">
      </div>

      <div class="row switch">
        <input id="apBeams" type="checkbox"><label for="apBeams">ビーム発光</label>
      </div>
      <div class="row">
        <label>ビーム最大不透明度</label>
        <input id="apBeamsOp" type="range" min="0" max="0.9" step="0.01">
      </div>

      <div class="row switch">
        <input id="apSparks" type="checkbox"><label for="apSparks">カーソル・スパーク</label>
      </div>
      <div class="row">
        <label>スパーク密度</label>
        <input id="apSparksDen" type="range" min="0" max="1" step="0.05">
      </div>

      <div class="row"><span class="ap-note">※ 負荷が気になる時はビーム不透明度やスパーク密度を下げてね。</span></div>
    `;
    p.appendChild(sec);

    // 初期値
    const id = x => sec.querySelector('#'+x);
    id('apLb').checked    = !!cfg.letterbox;
    id('apLbSize').value  = cfg.letterboxSize;
    id('apBeat').value    = cfg.beatZoom;
    id('apBeams').checked = !!cfg.beams;
    id('apBeamsOp').value = cfg.beamsMaxOpacity;
    id('apSparks').checked= !!cfg.cursorSparks;
    id('apSparksDen').value=cfg.cursorDensity;

    const read = () => ({
      letterbox: id('apLb').checked,
      letterboxSize: +id('apLbSize').value,
      beatZoom: +id('apBeat').value,
      beams: id('apBeams').checked,
      beamsMaxOpacity: +id('apBeamsOp').value,
      cursorSparks: id('apSparks').checked,
      cursorDensity: +id('apSparksDen').value,
    });
    const apply = () => {
      // 即時反映系
      beams.style.opacity = cfg.beams ? cfg.beamsMaxOpacity : 0;
      if (!cfg.cursorSparks){ particles.length=0; sctx.clearRect(0,0,sparkCvs.width,sparkCvs.height) }
    };

    sec.addEventListener('input', ()=>{ cfg = read(); store.set(KEY,cfg); apply(); });
    sec.addEventListener('change',()=>{ cfg = read(); store.set(KEY,cfg); apply(); });
    apply();
  }
  document.getElementById('btnSettings')?.addEventListener('click', () => setTimeout(buildSettings, 0), { once:true });
  window.addEventListener('load', () => setTimeout(buildSettings, 400));

  // 初期状態の反映
  beams.style.opacity = cfg.beams ? 0 : 0;
})();

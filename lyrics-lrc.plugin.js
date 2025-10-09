(() => {
  const v = document.getElementById('v');
  const wrap = document.getElementById('playerWrap');
  const grid = document.querySelector('#settings .settings-grid');
  if (!v || !wrap || !grid) return;
  const notify = (m,t='ok') => (window.toast ? window.toast(m,t,3000) : console.log('[lrc]',m));

  // 設定内セクション
  const sec = document.createElement('div');
  sec.className = 'settings-section';
  sec.innerHTML = `
    <h4>歌詞（LRC）</h4>
    <div class="row"><input type="file" id="lrcFile" accept=".lrc,.txt"><button class="btn" id="lrcUnload">解除</button></div>
    <div class="row"><input id="lrcUrl" type="url" placeholder="https://example.com/lyrics.lrc"><button class="btn ghost" id="lrcLoadUrl">URL読込</button></div>
    <div class="row split">
      <div class="col"><label>オフセット(ms)</label><input id="lrcOffset" type="number" step="10" value="0"></div>
      <div class="col" style="display:flex;gap:.35rem;align-items:end"><button class="btn ghost" id="lrcMinus">-100</button><button class="btn ghost" id="lrcPlus">+100</button></div>
    </div>
  `;
  grid.appendChild(sec);
  const $ = s => sec.querySelector(s);

  // オーバーレイ（プレイヤー上）
  const style = document.createElement('style');
  style.textContent = `
  .lrc-layer{position:absolute;left:0;right:0;bottom:12%;z-index:11;display:none;pointer-events:none;text-align:center;padding:0 .8rem}
  .lrc-line{font-weight:700;letter-spacing:.02em;text-shadow:0 0 8px rgba(0,0,0,.55), 0 0 18px rgba(0,0,0,.35)}
  :root:not(.light) .lrc-line{color:#fff}
  :root.light .lrc-line{color:#000}
  .lrc-main{font-size:28px;line-height:1.15;opacity:1;transition:opacity .2s ease}
  .lrc-sub{font-size:18px;line-height:1.15;opacity:.55; margin-top:.25rem}
  `;
  document.head.appendChild(style);
  const layer = document.createElement('div'); layer.className = 'lrc-layer';
  layer.innerHTML = `<div class="lrc-line lrc-main"></div><div class="lrc-line lrc-sub"></div>`;
  wrap.appendChild(layer);
  const mainEl = layer.querySelector('.lrc-main');
  const subEl  = layer.querySelector('.lrc-sub');

  // 状態
  let cues = [];  // {t, text}
  let offsetMs = 0;
  let raf = 0;

  const parseLRC = (txt) => {
    const lines = txt.replace(/\r/g,'').split('\n');
    const out = [];
    const timeTag = /\[(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))?\]/g;
    for (const raw of lines) {
      let m; let times = []; timeTag.lastIndex = 0;
      while ((m = timeTag.exec(raw))) {
        const mm = parseInt(m[1],10) || 0;
        const ss = parseInt(m[2],10) || 0;
        const cs = parseInt((m[3]||'0').padEnd(3,'0'),10) || 0;
        times.push(mm*60 + ss + cs/1000);
      }
      const line = raw.replace(timeTag,'').trim();
      if (!times.length || !line) continue;
      times.forEach(t => out.push({ t, text: line }));
    }
    return out.sort((a,b)=>a.t-b.t);
  };

  const show = (on) => { layer.style.display = on ? 'block' : 'none'; };
  const step = () => {
    raf = requestAnimationFrame(step);
    if (!cues.length) return;
    const t = (v.currentTime||0) + offsetMs/1000;
    let i = 0; let lo=0, hi=cues.length-1;
    while (lo<=hi){ const mid=(lo+hi)>>1; if(cues[mid].t<=t){ i=mid; lo=mid+1 } else { hi=mid-1 } }
    const cur = cues[i] || null;
    const next= cues[i+1] || null;
    mainEl.textContent = cur ? cur.text : '';
    subEl.textContent  = next ? next.text : '';
  };

  const loadText = (txt) => {
    cues = parseLRC(txt);
    if (!cues.length){ notify('LRCの解析に失敗','err'); return; }
    show(true);
    if (!raf){ raf = requestAnimationFrame(step); }
    notify('LRC読込');
  };

  $('#lrcFile').onchange = async (e) => {
    const f = e.target.files?.[0]; if(!f) return;
    try { loadText(await f.text()); }
    catch { notify('読込失敗','err'); }
  };
  $('#lrcLoadUrl').onclick = async ()=>{
    const url = $('#lrcUrl').value.trim(); if(!url) return;
    try{
      const res = await fetch(url, {mode:'cors'});
      loadText(await res.text());
    }catch{ notify('取得失敗（CORS？）','err'); }
  };
  $('#lrcUnload').onclick = ()=>{ cues = []; show(false); if(raf){ cancelAnimationFrame(raf); raf=0 } };
  $('#lrcOffset').onchange = e => offsetMs = parseInt(e.target.value||'0',10)||0;
  $('#lrcMinus').onclick = ()=>{ offsetMs -= 100; $('#lrcOffset').value = offsetMs; };
  $('#lrcPlus').onclick  = ()=>{ offsetMs += 100; $('#lrcOffset').value = offsetMs; };

  v.addEventListener('loadedmetadata', ()=>{ cues=[]; show(false); if(raf){cancelAnimationFrame(raf); raf=0} });
})();

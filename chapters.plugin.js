(() => {
  const v = document.getElementById('v');
  const grid = document.querySelector('#settings .settings-grid');
  if (!v || !grid) return;
  const notify = (m,t='ok') => (window.toast ? window.toast(m,t,3000) : console.log('[chap]',m));

  const sec = document.createElement('div');
  sec.className = 'settings-section';
  sec.innerHTML = `
    <h4>チャプター（VTT）</h4>
    <div class="row"><input type="file" id="chapFile" accept=".vtt"><button class="btn" id="chapClear">解除</button></div>
    <div id="chapList" style="max-height:220px;overflow:auto;border:1px solid color-mix(in oklab,var(--panel-2),#000 12%);border-radius:10px;padding:.4rem"></div>
  `;
  grid.appendChild(sec);
  const $ = s => sec.querySelector(s);
  const listEl = $('#chapList');
  let cues = [];

  const parseTime = (s) => {
    const m = s.trim().match(/(?:(\d{1,2}):)?(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))?/);
    if(!m) return 0;
    const hh = +(m[1]||0), mm=+m[2], ss=+m[3], ms=+(m[4]||0);
    return hh*3600 + mm*60 + ss + ms/1000;
  };
  const parseVTT = (txt) => {
    const lines = txt.replace(/\r/g,'').split('\n');
    const out = []; let i=0;
    while(i<lines.length){
      const l = lines[i++].trim();
      if (!l) continue;
      let timing = l.includes('-->') ? l : (lines[i++]||'');
      if (!timing.includes('-->')) continue;
      const [a,b] = timing.split('-->').map(s=>s.trim().split(' ')[0]);
      const start = parseTime(a), end = parseTime(b);
      let text = '';
      while(i<lines.length && lines[i].trim()!==''){ text += (text?'\n':'') + lines[i++]; }
      out.push({start, end, text: text.replace(/<[^>]+>/g,'').split('\n')[0]});
      while(i<lines.length && lines[i].trim()==='') i++;
    }
    return out.sort((x,y)=>x.start-y.start);
  };
  const fmt = s => {
    const mm = Math.floor(s/60), ss = Math.floor(s%60).toString().padStart(2,'0');
    const hh = Math.floor(mm/60);
    return hh ? `${hh}:${String(mm%60).padStart(2,'0')}:${ss}` : `${mm}:${ss}`;
  };
  const render = ()=>{
    listEl.innerHTML = '';
    cues.forEach((c,idx)=>{
      const row = document.createElement('div');
      row.style.cssText='display:flex;align-items:center;gap:.5rem;padding:.35rem .45rem;border-radius:8px;cursor:pointer';
      row.innerHTML = `<span class="badge" style="min-width:70px;text-align:center">${fmt(c.start)}</span>
                       <div style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.text||('Chapter '+(idx+1))}</div>`;
      row.onclick = ()=>{ try{ v.currentTime = Math.max(0, Math.min(v.duration||0, c.start)); v.play().catch(()=>{}); }catch{} };
      row.addEventListener('mouseenter', () => row.style.background = 'color-mix(in oklab,var(--panel-2),transparent 25%)');
      row.addEventListener('mouseleave', () => row.style.background = '');
      listEl.appendChild(row);
    });
  };

  $('#chapFile').onchange = async (e)=>{
    const f = e.target.files?.[0]; if(!f) return;
    try { cues = parseVTT(await f.text()); render(); notify('チャプター読込'); }
    catch { notify('解析失敗','err'); }
  };
  $('#chapClear').onclick = ()=>{ cues=[]; render(); };
  v.addEventListener('loadedmetadata', ()=>{ cues=[]; render(); });
})();

(() => {
  const v = document.getElementById('v');
  const grid = document.querySelector('#settings .settings-grid');
  if (!v || !grid) return;

  const notify = (m,t='ok') => (window.toast ? window.toast(m,t,3000) : console.log('[bm]',m));

  const sec = document.createElement('div');
  sec.className = 'settings-section';
  sec.innerHTML = `
    <h4>ブックマーク</h4>
    <div class="row" style="gap:.4rem;flex-wrap:wrap">
      <button class="btn ok" id="bmAdd">現在地を追加</button>
      <button class="btn ghost" id="bmExport">書き出し</button>
      <button class="btn ghost" id="bmImport">読込</button>
      <button class="btn danger" id="bmClear">全消去</button>
    </div>
    <div id="bmList" style="max-height:220px;overflow:auto;border:1px solid color-mix(in oklab,var(--panel-2),#000 12%);border-radius:10px;padding:.4rem"></div>
    <input type="file" id="bmImportFile" accept="application/json" style="display:none">
  `;
  grid.appendChild(sec);
  const $ = s => sec.querySelector(s);
  const listEl = $('#bmList');

  const keyPrefix = 'pc.bm:';
  const mediaKey = () => {
    const src = v.currentSrc || '';
    try {
      const u = new URL(src, location.href);
      return keyPrefix + (u.origin + u.pathname + u.search);
    } catch { return keyPrefix + (src || 'unknown'); }
  };

  const loadAll = () => {
    const all = {};
    for (let i=0; i<localStorage.length; i++){
      const k = localStorage.key(i);
      if (k && k.startsWith(keyPrefix)) {
        try { all[k] = JSON.parse(localStorage.getItem(k) || '[]'); } catch {}
      }
    }
    return all;
  };
  const load = () => JSON.parse(localStorage.getItem(mediaKey()) || '[]');
  const save = (arr) => localStorage.setItem(mediaKey(), JSON.stringify(arr));

  const fmt = s => {
    if (!Number.isFinite(s)) return '-';
    const mm = Math.floor(s/60); const ss = Math.floor(s%60).toString().padStart(2,'0');
    return `${mm}:${ss}`;
  };

  const render = () => {
    const data = load();
    listEl.innerHTML = '';
    data.forEach((it, idx) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:.5rem;padding:.35rem .45rem;border-radius:8px;transition:background .15s';
      row.innerHTML = `
        <span class="badge" style="min-width:56px;text-align:center">${fmt(it.t)}</span>
        <div style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.label||('Bookmark '+(idx+1))}</div>
        <button class="btn ghost go">⏵</button>
        <button class="btn ghost re">名変更</button>
        <button class="btn danger del">×</button>
      `;
      row.querySelector('.go').onclick = () => { try{ v.currentTime = Math.max(0, Math.min(v.duration||0, it.t)); v.play().catch(()=>{}); }catch{} };
      row.querySelector('.re').onclick = () => {
        const label = prompt('ブックマーク名', it.label || '');
        if (label!=null) { const arr = load(); arr[idx].label = label; save(arr); render(); }
      };
      row.querySelector('.del').onclick = () => { const arr = load(); arr.splice(idx,1); save(arr); render(); };
      row.addEventListener('mouseenter', () => row.style.background = 'color-mix(in oklab,var(--panel-2),transparent 25%)');
      row.addEventListener('mouseleave', () => row.style.background = '');
      listEl.appendChild(row);
    });
  };

  $('#bmAdd').onclick = () => {
    const t = v.currentTime || 0;
    const label = prompt('ブックマーク名', `Bookmark ${fmt(t)}`) ?? '';
    const arr = load(); arr.push({t, label}); save(arr); render(); notify('追加');
  };
  $('#bmExport').onclick = () => {
    const all = loadAll();
    const blob = new Blob([JSON.stringify(all,null,2)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download='bookmarks.json'; a.click();
    notify('書き出し完了');
  };
  $('#bmImport').onclick = () => $('#bmImportFile').click();
  $('#bmImportFile').onchange = async (e) => {
    const f = e.target.files?.[0]; if(!f) return;
    try{
      const json = JSON.parse(await f.text());
      Object.keys(json||{}).forEach(k=>{
        if (k.startsWith(keyPrefix)) localStorage.setItem(k, JSON.stringify(json[k]||[]));
      });
      render(); notify('読込完了');
    }catch{ notify('読込失敗','err'); }
  };
  $('#bmClear').onclick = () => {
    if (!confirm('このメディアのブックマークを全消去しますか？')) return;
    localStorage.removeItem(mediaKey()); render(); notify('消去');
  };

  v.addEventListener('loadedmetadata', render);
  render();
})();

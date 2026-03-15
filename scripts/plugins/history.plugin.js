// history.plugin.js
(() => {
  const KEY = 'pc.history';
  const MAX = 150;

  const get = () => (store.get(KEY, []) || []);
  const set = (arr) => store.set(KEY, arr);
  const nowISO = () => new Date().toISOString();
  const esc = (s) => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  function normalize(it){
    if (it?.url)  return { kind:'url',  url: it.url,  title: it.title || it.url,                 at: nowISO() };
    if (it?.file) return { kind:'file', name: it.file.name, title: it.title || it.file.name,     at: nowISO() };
    return null;
  }

  function addHistory(item){
    const h = normalize(item);
    if (!h) return;
    let arr = get();
    // URLはURLで、FILEはファイル名で重複排除して先頭へ
    arr = arr.filter(x => h.kind==='url' ? x.url !== h.url : x.name !== h.name);
    arr.unshift(h);
    if (arr.length > MAX) arr.length = MAX;
    set(arr);
    render();
  }

  function render(){
    const box = document.getElementById('historyList');
    if (!box) return;
    const arr = get();
    box.innerHTML = '';
    if (!arr.length){
      box.innerHTML = '<div class="subtitle">まだ履歴はありません</div>';
      return;
    }
    arr.slice(0,50).forEach(h => {
      const row = document.createElement('div');
      row.className = 'row';
      row.style.alignItems = 'center';

      const meta = document.createElement('div');
      meta.style.flex = '1';
      meta.style.minWidth = '0';
      meta.innerHTML = `
        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(h.title || h.url || h.name || 'Item')}</div>
        <div class="subtitle">${h.kind==='url' ? 'URL' : 'FILE'} — ${new Date(h.at).toLocaleString()}</div>
      `;
      row.appendChild(meta);

      if (h.kind === 'url'){
        const btn = document.createElement('button');
        btn.className = 'btn ghost';
        btn.textContent = '▶';
        btn.title = 'このURLを再生';
        btn.onclick = () => {
          try{
            addToPlaylist([{ url: h.url, title: h.title || h.url }], false);
            selectIndex(state.list.length - 1);
          }catch(e){ toast('再生できません','err') }
        };
        row.appendChild(btn);
      } else {
        // FILEはセキュリティ上、自動再読込できない。表示のみ。
      }
      box.appendChild(row);
    });
  }

  function injectSidebar(){
    const aside = document.querySelector('aside');
    if (!aside) return;
    const sec = document.createElement('div');
    sec.className = 'section';
    sec.innerHTML = `
      <h2>履歴</h2>
      <div class="row">
        <button class="btn ghost" id="histClear">全消去</button>
        <button class="btn ghost" id="histExport">JSON出力</button>
        <button class="btn ghost" id="histImport">読込</button>
      </div>
      <div id="historyList" style="max-height:220px;overflow:auto;"></div>
    `;
    aside.appendChild(sec);

    sec.querySelector('#histClear').onclick = () => { set([]); render(); toast('履歴を消去しました','ok') };
    sec.querySelector('#histExport').onclick = () => {
      const blob = new Blob([JSON.stringify(get(), null, 2)], { type:'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'omni-history.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
    sec.querySelector('#histImport').onclick = () => {
      const inp = document.createElement('input');
      inp.type = 'file'; inp.accept = 'application/json';
      inp.onchange = async () => {
        const f = inp.files?.[0]; if(!f) return;
        try{
          const arr = JSON.parse(await f.text());
          if (Array.isArray(arr)) { set(arr); render(); toast('履歴を読込ました','ok') }
        }catch(e){ toast('履歴の読込に失敗','err') }
      };
      inp.click();
    };

    render();
  }

  function hookSelectIndex(){
    if (!window.selectIndex) return;
    const orig = window.selectIndex;
    window.selectIndex = async function(i){
      await orig.call(this, i);
      try { const it = state.list[i]; addHistory(it) } catch(e){}
    };
  }

  window.addEventListener('load', () => { injectSidebar(); hookSelectIndex(); });
})();

(() => {
  const grid = document.querySelector('#settings .settings-grid');
  if (!grid) return;
  const notify = (m,t='ok') => (window.toast ? window.toast(m,t,3000) : console.log('[settings-io]',m));

  const sec = document.createElement('div');
  sec.className = 'settings-section';
  sec.innerHTML = `
    <h4>設定バックアップ</h4>
    <div class="row"><button class="btn ok" id="setExport">エクスポート</button><button class="btn ghost" id="setImport">インポート</button><button class="btn danger" id="setReset">初期化</button></div>
    <input type="file" id="setFile" accept="application/json" style="display:none">
    <div class="row"><span class="badge">対象: localStorage の "pc." プレフィックス全て</span></div>
  `;
  grid.appendChild(sec);
  const $ = s => sec.querySelector(s);

  const dump = () => {
    const out = {};
    for (let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i);
      if (k && /^pc\./.test(k)) out[k] = localStorage.getItem(k);
    }
    return out;
  };

  $('#setExport').onclick = () => {
    const blob = new Blob([JSON.stringify(dump(),null,2)],{type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download='omni_settings.json'; a.click();
    notify('書き出しました');
  };
  $('#setImport').onclick = ()=> $('#setFile').click();
  $('#setFile').onchange = async (e)=>{
    const f = e.target.files?.[0]; if(!f) return;
    try{
      const json = JSON.parse(await f.text());
      Object.keys(json||{}).forEach(k=>{
        if(/^pc\./.test(k)) localStorage.setItem(k, json[k]);
      });
      notify('読み込み完了。ページを再読み込みします'); setTimeout(()=>location.reload(), 800);
    }catch{ notify('読込失敗','err'); }
  };
  $('#setReset').onclick = ()=>{
    if (!confirm('Omni Player の "pc.*" 設定を全て初期化しますか？')) return;
    const del = [];
    for (let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i); if (k && /^pc\./.test(k)) del.push(k);
    }
    del.forEach(k=>localStorage.removeItem(k));
    notify('初期化しました。再読み込みします'); setTimeout(()=>location.reload(), 600);
  };
})();

(() => {
  const v = document.getElementById('v');
  const grid = document.querySelector('#settings .settings-grid');
  if (!v || !grid) return;
  const notify = (m,t='ok') => (window.toast ? window.toast(m,t,3000) : console.log('[shot]',m));

  const sec = document.createElement('div');
  sec.className = 'settings-section';
  sec.innerHTML = `
    <h4>スクリーンショット</h4>
    <div class="row split">
      <div class="col"><label>スケール</label><input id="shotScale" type="number" min="0.25" step="0.25" value="1"></div>
      <div class="col"><label>JPEG 品質</label><input id="shotQ" type="number" min="0.5" max="0.98" step="0.02" value="0.92"></div>
    </div>
    <div class="row"><button class="btn ok" id="shotNow">PNG保存</button><button class="btn ghost" id="shotJpg">JPEG保存</button></div>
    <div class="row"><span class="badge">※ CORS NG の動画は保存不可</span></div>
  `;
  grid.appendChild(sec);
  const $ = s => sec.querySelector(s);

  const baseName = () => {
    try{
      const t = document.getElementById('audioTitle')?.textContent?.trim();
      if (t) return t.replace(/[\\/:*?"<>|]/g,'_');
      const u = new URL(v.currentSrc, location.href);
      return (u.pathname.split('/').pop()||'frame').replace(/\.[^.]+$/,'');
    }catch{ return 'frame'; }
  };

  const capture = (type='png') => {
    if (!v.videoWidth || !v.videoHeight){ notify('動画フレームがありません','warn'); return; }
    const scale = Math.max(0.25, parseFloat($('#shotScale').value||'1'));
    const W = Math.round(v.videoWidth * scale), H = Math.round(v.videoHeight * scale);
    const cvs = document.createElement('canvas'); cvs.width = W; cvs.height = H;
    const ctx = cvs.getContext('2d');
    try{
      ctx.drawImage(v,0,0,W,H);
      let url, name = `${baseName()}_${Math.floor(v.currentTime||0)}s.${type==='png'?'png':'jpg'}`;
      if (type==='png'){ url = cvs.toDataURL('image/png'); }
      else { const q = Math.min(0.98, Math.max(0.5, parseFloat($('#shotQ').value||'0.92'))); url = cvs.toDataURL('image/jpeg', q); }
      const a = document.createElement('a'); a.href=url; a.download=name; a.click();
      notify('保存しました');
    }catch{ notify('保存不可（CORS？）','err'); }
  };

  $('#shotNow').onclick = ()=> capture('png');
  $('#shotJpg').onclick = ()=> capture('jpg');
})();

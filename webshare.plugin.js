// webshare.plugin.js
(() => {
  const v = document.getElementById('v');
  if (!v) return;

  const pickGrid = () =>
    document.querySelector('#settings .settings-panels [data-tab-panel="ext"]')
    || document.querySelector('#settings .settings-grid');

  function fmtTime(s){
    s = Math.max(0, Math.floor(s));
    const mm = Math.floor(s/60), ss = String(s%60).padStart(2,'0');
    const hh = Math.floor(mm/60);
    return hh ? `${hh}:${String(mm%60).padStart(2,'0')}:${ss}` : `${mm}:${ss}`;
  }

  function buildUI(){
    const grid = pickGrid(); if(!grid) return;
    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.innerHTML = `
      <h4>共有リンク</h4>
      <div class="row">
        <button class="btn" id="shareCopy">現在位置のリンク/テキストをコピー</button>
        <span class="badge">YouTube/HTTPは ?t= を付与</span>
      </div>
    `;
    grid.appendChild(sec);
    sec.querySelector('#shareCopy').onclick = async ()=>{
      const cur = Math.floor(v.currentTime||0);
      let text = '';
      try{
        const src = v.currentSrc || '';
        if (/^https?:/.test(src)) {
          const u = new URL(src, location.href);
          // 既存の t を上書き
          u.searchParams.set('t', String(cur));
          text = u.toString();
        } else {
          const name = src.split('/').pop() || 'local media';
          text = `${name} @ ${fmtTime(cur)} (sec=${cur})`;
        }
        await navigator.clipboard.writeText(text);
        (window.toast || console.log)('コピー: '+text);
      }catch{
        (window.toast || console.log)('コピー失敗','err');
      }
    };
  }

  const btn = document.getElementById('btnSettings');
  if (btn) btn.addEventListener('click', () => setTimeout(buildUI, 0), { once:true });
  window.addEventListener('load', () => setTimeout(buildUI, 200));
})();

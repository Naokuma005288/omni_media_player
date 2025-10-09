// rate-pitch.plugin.js
(() => {
  const v = document.getElementById('v');
  if (!v) return;

  const pickGrid = () =>
    document.querySelector('#settings .settings-panels [data-tab-panel="ext"]')
    || document.querySelector('#settings .settings-grid');

  function setPreserve(on){
    try{
      const k = ('preservesPitch' in v) ? 'preservesPitch'
            : ('mozPreservesPitch' in v) ? 'mozPreservesPitch'
            : ('webkitPreservesPitch' in v) ? 'webkitPreservesPitch' : null;
      if (k) v[k] = !!on;
      (window.toast || console.log)(on?'ピッチ保持: ON':'ピッチ保持: OFF');
    }catch{}
  }

  function buildUI(){
    const grid = pickGrid(); if(!grid) return;
    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.innerHTML = `
      <h4>速度プリセット & ピッチ</h4>
      <div class="row">
        <button class="btn ghost" data-rate="0.75">0.75x</button>
        <button class="btn ghost" data-rate="1.0">1.00x</button>
        <button class="btn ghost" data-rate="1.25">1.25x</button>
        <button class="btn ghost" data-rate="1.5">1.50x</button>
        <button class="btn ghost" data-rate="2.0">2.00x</button>
      </div>
      <div class="row">
        <button class="btn" id="pitchToggle">ピッチ保持 切替 (Q)</button>
        <span class="badge">※ ブラウザ依存（未対応環境もあり）</span>
      </div>
    `;
    grid.appendChild(sec);

    sec.querySelectorAll('[data-rate]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const r = parseFloat(btn.dataset.rate||'1')||1;
        try{ v.playbackRate = r; }catch{}
        const slider = document.getElementById('rate');
        if (slider){ slider.value = String(r); slider.dispatchEvent(new Event('input')); }
        (window.toast || console.log)('速度: '+r.toFixed(2)+'x');
      });
    });
    const tog = sec.querySelector('#pitchToggle');
    let on = true;
    tog.onclick = ()=>{ on = !on; setPreserve(on); };
  }

  // Qキーでピッチ保持切替（フォーム中は無効）
  document.addEventListener('keydown', (e)=>{
    const el=document.activeElement; const tag=(el?.tagName||'').toLowerCase();
    if (['input','textarea','select'].includes(tag) || el?.isContentEditable) return;
    if (e.key.toLowerCase() === 'q'){
      e.preventDefault();
      const ev = new Event('click');
      document.getElementById('pitchToggle')?.dispatchEvent(ev);
    }
  });

  const btn = document.getElementById('btnSettings');
  if (btn) btn.addEventListener('click', () => setTimeout(buildUI, 0), { once:true });
  window.addEventListener('load', () => setTimeout(buildUI, 200));
})();

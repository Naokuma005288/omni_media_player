// sub-offset.plugin.js
(() => {
  const v = document.getElementById('v');
  if (!v) return;

  // どのタブ化実装でも動くように、拡張タブがあれば優先
  const pickGrid = () =>
    document.querySelector('#settings .settings-panels [data-tab-panel="ext"]')
    || document.querySelector('#settings .settings-grid');

  function buildUI() {
    const grid = pickGrid();
    if (!grid) return;

    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.innerHTML = `
      <h4>字幕オフセット（VTT/SRT）</h4>
      <div class="row split">
        <div class="col"><label>オフセット(ms)</label>
          <input id="subOffsetVal" type="number" step="50" value="0"></div>
        <div class="col" style="display:flex;gap:.35rem;align-items:end">
          <button class="btn ghost" id="subOffsetMinus">-250</button>
          <button class="btn ghost" id="subOffsetPlus">+250</button>
          <button class="btn" id="subOffsetApply">適用</button>
          <button class="btn ghost" id="subOffsetReset">解除</button>
        </div>
      </div>
      <div class="row"><span class="badge">ASSは対象外 / ネイティブVTT/SRTのみ</span></div>
    `;
    grid.appendChild(sec);

    const $ = (s) => sec.querySelector(s);
    const val = $('#subOffsetVal');

    $('#subOffsetMinus').onclick = () => { val.value = (parseInt(val.value||'0',10) - 250); };
    $('#subOffsetPlus').onclick  = () => { val.value = (parseInt(val.value||'0',10) + 250); };
    $('#subOffsetReset').onclick = () => applyOffset(0);
    $('#subOffsetApply').onclick = () => applyOffset(parseInt(val.value||'0',10) || 0);
  }

  // 既存のTextTrackのcueを直接ずらす（ASSは不可）
  function applyOffset(ms){
    try{
      const tracks = v.textTracks;
      for (let i=0;i<tracks.length;i++){
        const tr = tracks[i];
        // 目視しやすいよう強制的にhidden → showing
        tr.mode = 'hidden';
        const cues = tr.cues || [];
        for (let j=0;j<cues.length;j++){
          const c = cues[j];
          // 元の開始終了を data-* に保存しておく（解除用）
          if (c.__origStart == null) { c.__origStart = c.startTime; }
          if (c.__origEnd == null)   { c.__origEnd   = c.endTime; }
          if (ms === 0){
            c.startTime = c.__origStart;
            c.endTime   = c.__origEnd;
          } else {
            c.startTime = Math.max(0, c.__origStart + ms/1000);
            c.endTime   = Math.max(c.startTime, c.__origEnd + ms/1000);
          }
        }
      }
      (window.toast || console.log)(ms===0?'字幕オフセット解除':'字幕オフセット適用: '+ms+'ms');
    }catch(e){
      (window.toast || console.warn)('字幕オフセット失敗','err');
    }
  }

  // 設定を開いたタイミングでもUIが出るように
  const btn = document.getElementById('btnSettings');
  if (btn) btn.addEventListener('click', () => setTimeout(buildUI, 0), { once:true });
  // ページロード時（すでに開いている場合の保険）
  window.addEventListener('load', () => setTimeout(buildUI, 200));
})();

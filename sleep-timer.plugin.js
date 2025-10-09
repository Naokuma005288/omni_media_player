(() => {
  const v = document.getElementById('v');
  const grid = document.querySelector('#settings .settings-grid');
  if (!v || !grid) return;
  const notify = (m,t='ok') => (window.toast ? window.toast(m,t,3000) : console.log('[sleep]',m));

  const sec = document.createElement('div');
  sec.className = 'settings-section';
  sec.innerHTML = `
    <h4>スリープタイマー</h4>
    <div class="row split">
      <div class="col"><label>分</label><input id="stMin" type="number" min="1" step="1" value="20"></div>
      <div class="col" style="display:flex;align-items:center;gap:.4rem"><input id="stFade" type="checkbox"><label for="stFade">フェードアウト（10秒）</label></div>
    </div>
    <div class="row"><button class="btn ok" id="stStart">開始</button><button class="btn danger" id="stStop">停止</button></div>
    <div class="row"><span class="badge" id="stLeft">—</span></div>
  `;
  grid.appendChild(sec);
  const $ = s => sec.querySelector(s);

  let timer = null, endAt = 0, leftRAF = 0, fading = false;

  const tickLeft = () => {
    cancelAnimationFrame(leftRAF);
    leftRAF = requestAnimationFrame(()=>{
      const left = Math.max(0, endAt - Date.now());
      $('#stLeft').textContent = left ? `残り ${Math.ceil(left/1000)} 秒` : '—';
      if (left) tickLeft();
    });
  };

  const fadeOut = () => {
    if (fading) return;
    fading = true;
    const volSlider = document.getElementById('vol');
    const start = Date.now(), dur = 10000;
    const v0 = parseFloat(volSlider?.value || '1');
    const step = () => {
      const t = Date.now() - start;
      const k = Math.max(0, 1 - t/dur);
      const vv = +(v0*k).toFixed(3);
      if (volSlider) { volSlider.value = vv; volSlider.dispatchEvent(new Event('input')); }
      else { v.volume = vv; }
      if (t < dur) requestAnimationFrame(step);
      else { try{ v.pause() }catch{} fading=false; }
    };
    step();
  };

  $('#stStart').onclick = ()=>{
    const min = Math.max(1, parseInt($('#stMin').value||'20',10));
    clearTimeout(timer); endAt = Date.now() + min*60*1000; tickLeft();
    const fadeFlag = $('#stFade').checked;
    const armFade = () => {
      if (!fadeFlag) return;
      const t = endAt - Date.now() - 10000;
      if (t > 0) setTimeout(fadeOut, t); else fadeOut();
    };
    timer = setTimeout(()=>{ try{ v.pause() }catch{}; notify('タイマー終了'); endAt=0; tickLeft(); }, min*60*1000);
    armFade();
    notify(`開始：${min}分`);
  };
  $('#stStop').onclick = ()=>{ clearTimeout(timer); endAt=0; tickLeft(); fading=false; notify('停止'); };
  v.addEventListener('loadedmetadata', ()=>{ clearTimeout(timer); endAt=0; tickLeft(); fading=false; });
})();

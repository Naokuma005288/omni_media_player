// AirPlay ピッカー（Safari / iOS/macOS）
// 依存: #v / toast()（任意）

(() => {
  const runtime = window.OPRuntime;
  const v = runtime?.refs?.v || window.$?.v;
  if (!v || typeof v.webkitShowPlaybackTargetPicker !== 'function') return;

  const pip = document.getElementById('pip');
  const btn = document.createElement('button');
  btn.id = 'btnAirPlay';
  btn.className = 'btn icon-btn';
  btn.textContent = '△';
  btn.title = 'AirPlay';
  btn.setAttribute('aria-label','AirPlay');
  pip?.parentElement?.insertBefore(btn, pip.nextSibling);

  btn.onclick = () => {
    try { v.webkitShowPlaybackTargetPicker(); }
    catch { (runtime?.toast || window.toast)?.('AirPlayが使えません','warn'); }
  };

  v.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', () => {
    const on = v.webkitCurrentPlaybackTargetIsWireless === true;
    btn.classList.toggle('ok', on);
  });
})();

// AirPlay ピッカー（Safari / iOS/macOS）
// 依存: #v / toast()（任意）

(() => {
  const v = window.$?.v;
  if (!v || typeof v.webkitShowPlaybackTargetPicker !== 'function') return;

  const pip = document.getElementById('pip');
  const btn = document.createElement('button');
  btn.id = 'btnAirPlay';
  btn.className = 'btn';
  btn.textContent = 'AirPlay';
  pip?.parentElement?.insertBefore(btn, pip.nextSibling);

  btn.onclick = () => {
    try { v.webkitShowPlaybackTargetPicker(); }
    catch { window.toast?.('AirPlayが使えません','warn'); }
  };

  v.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', () => {
    const on = v.webkitCurrentPlaybackTargetIsWireless === true;
    btn.classList.toggle('ok', on);
  });
})();

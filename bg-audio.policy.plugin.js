// bg-audio.policy.plugin.js
(() => {
  const KEY = 'pc.bg.allow'; // trueならタブを離れてもAudioContextを止めない（慎重）

  function resumeSafely(delay=50){
    setTimeout(() => {
      try {
        // すでにユーザー操作で解錠済み（state.triedOnce）かつAudioContextがある時だけ
        if (state?.audioCtx && (state.triedOnce || !document.hidden)) {
          state.audioCtx.resume?.();
        }
      } catch(e){}
    }, delay);
  }

  function onVis(){
    if (!store.get(KEY, false)) return;
    // 再生中なら、hiddenになっても直後にresumeして維持
    try {
      if (document.hidden) {
        if (typeof mediaPaused === 'function' && !mediaPaused()) resumeSafely(60);
      } else {
        resumeSafely(0);
      }
    } catch(e){}
  }

  function applyPolicy(enabled){
    // 既存の匿名ハンドラは外せないので、こちらで“後追いresume”する
    document.removeEventListener('visibilitychange', onVis, false);
    if (enabled) document.addEventListener('visibilitychange', onVis, false);
  }

  function injectSettingsToggle(){
    const card = document.querySelector('#settings .settings-card');
    if (!card) return;

    const extPanel =
      card.querySelector('.settings-grid[data-tab-panel="ext"]') ||
      card.querySelector('.settings-grid'); // フォールバック

    const sec = document.createElement('div');
    sec.className = 'settings-section';
    const enabled = !!store.get(KEY, false);
    sec.innerHTML = `
      <h4>バックグラウンド再生</h4>
      <div class="row switch">
        <input id="bgAudioAllow" type="checkbox" ${enabled ? 'checked' : ''}>
        <label for="bgAudioAllow">タブを離れても音を止めない（慎重に）</label>
      </div>
      <div class="row"><span class="subtitle">※ CPU/バッテリー消費が増える可能性があります。iOSなど一部環境では制限されます。</span></div>
    `;
    extPanel.appendChild(sec);

    sec.querySelector('#bgAudioAllow').addEventListener('change', (e) => {
      const v = !!e.target.checked;
      store.set(KEY, v);
      applyPolicy(v);
      toast(v ? 'バックグラウンド再生を許可: ON' : 'バックグラウンド再生を許可: OFF', v ? 'ok' : 'warn');
      if (v) resumeSafely(0);
    });
  }

  window.addEventListener('load', () => {
    injectSettingsToggle();
    applyPolicy(!!store.get(KEY, false));
  });
})();

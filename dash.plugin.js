// dash.plugin.js
(() => {
  if (!window.dashjs) return; // ライブラリ未読込なら何もしない

  // 既定を全体に寄せたい場合。必要なら後でUI化してもOK
  const defaultCfg = {
    streaming: {
      lowLatencyEnabled: true,
      fastSwitchEnabled: true,
      abr: {
        autoSwitchBitrate: { video: true, audio: true },
        initialBitrate: { video: 1600 }
      },
      text: { defaultEnabled: true }
    }
  };

  // コアの loadUrl 内で create() した直後に updateSettings を呼ぶので、
  // ここでは将来のためのフックだけ用意しておく
  window.OPDash = {
    applyDefaults(player){
      try { player.updateSettings(defaultCfg); } catch(e){}
    }
  };
})();

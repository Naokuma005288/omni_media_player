// Chromecast 送信（HTML5ソースをcast）
// 依存: cast_sender.js / #v / toast() / state, $（既存）

(() => {
  const v = window.$?.v;
  if (!v) return;

  // ボタンを追加（PiPの横）
  const pip = document.getElementById('pip');
  const btn = document.createElement('button');
  btn.id = 'btnCast';
  btn.className = 'btn';
  btn.textContent = 'Cast';
  pip?.parentElement?.insertBefore(btn, pip.nextSibling);

  function guessType(u = '') {
    if (/\.m3u8(\?|$)/i.test(u)) return 'application/x-mpegURL';
    if (/\.mpd(\?|$)/i.test(u))  return 'application/dash+xml';
    if (/\.mp3(\?|$)/i.test(u))  return 'audio/mpeg';
    if (/\.aac(\?|$)/i.test(u))  return 'audio/aac';
    if (/\.webm(\?|$)/i.test(u)) return 'video/webm';
    return 'video/mp4';
  }

  function initCast() {
    try {
      const ctx = cast.framework.CastContext.getInstance();
      ctx.setOptions({
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });

      btn.onclick = async () => {
        try {
          await ctx.requestSession();
          const session = ctx.getCurrentSession();
          const src = v.currentSrc;
          if (!src) { window.toast?.('メディアがありません','warn'); return; }

          // 埋め込み(YouTube/iframe)は対象外
          if (window.state?.usingYouTube || window.state?.usingIframe) {
            window.toast?.('埋め込みソースのCastは未対応','warn'); return;
          }

          const mi = new chrome.cast.media.MediaInfo(src, guessType(src));
          const req = new chrome.cast.media.LoadRequest(mi);
          session.loadMedia(req).then(
            () => window.toast?.('Casting開始'),
            (e) => window.toast?.('Cast失敗: '+(e?.code||''), 'err')
          );
        } catch (e) {
          window.toast?.('Cast接続に失敗', 'err');
        }
      };
    } catch (e) {
      // 何もしない（https/localhost以外だと来る）
    }
  }

  // Cast SDKの準備完了フック
  if (window.cast && window.cast.framework) initCast();
  else window.__onGCastApiAvailable = (ready) => ready && initCast();
})();

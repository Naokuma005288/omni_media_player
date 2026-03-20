/* OmniMedia SW v2.7 */
const VERSION = 'v3.1.0';
const CORE = [
  './',
  './index.html',
  './omni-player.html',
  './omni-player-mini.html',
  './assets/pwa/manifest.webmanifest',
  './assets/pwa/omni-player.webmanifest',
  './version.json',
  './assets/pwa/icon.svg',
  './assets/pwa/thumb-pc.svg',
  './assets/pwa/thumb-touch.svg',
  './styles/pages/omni-player.inline-1.css',
  './scripts/pages/omni-player.inline-1.js',
  './styles/plugins/op-anim-pack.css',
  './scripts/plugins/op-anim-pack.js',
  './styles/plugins/op-fun-pack.css',
  './scripts/plugins/op-fun-pack.js',
  './styles/plugins/op-aurora-pack.css',
  './scripts/plugins/op-aurora-pack.js',
  './styles/plugins/op-grid-pack.css',
  './scripts/plugins/op-grid-pack.js',
  './scripts/plugins/op-plugin-host.js',
  './scripts/plugins/progress-resume.plugin.js',
  './scripts/plugins/hotkeys-plus.plugin.js',
  './scripts/plugins/bookmarks.plugin.js',
  './scripts/plugins/lyrics-lrc.plugin.js',
  './scripts/plugins/chapters.plugin.js',
  './scripts/plugins/screenshot.plugin.js',
  './scripts/plugins/settings-io.plugin.js',
  './scripts/plugins/sleep-timer.plugin.js',
  './scripts/plugins/chapters.plugin.legacy.js',
  './scripts/plugins/intro-outro-skip.plugin.js',
  './scripts/plugins/sub-offset.plugin.js',
  './scripts/plugins/history.plugin.js',
  './scripts/plugins/bg-audio.policy.plugin.js',
  './scripts/plugins/webshare.plugin.js',
  './scripts/plugins/rate-pitch.plugin.js',
  './scripts/plugins/cover-plus.plugin.js',
  './styles/plugins/micro-anim.plugin.css',
  './scripts/plugins/micro-anim.plugin.js',
  './styles/plugins/spec-boost.plugin.css',
  './scripts/plugins/spec-boost.plugin.js',
  './styles/plugins/anim-plus.plugin.css',
  './scripts/plugins/anim-plus.plugin.js',
  './scripts/plugins/dash.plugin.js',
  './scripts/plugins/video-fx.plugin.js',
  './scripts/plugins/more-embeds.plugin.js',
  './scripts/plugins/cast.plugin.js',
  './scripts/plugins/airplay.plugin.js',
  './scripts/plugins/color-theme.plugin.js',
  './scripts/omni-boost.classic.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then(c => c.addAll(CORE)).then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== VERSION ? caches.delete(k) : Promise.resolve())))
    ).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // ignore cross-origin

  const isDocument = e.request.mode === 'navigate' || e.request.destination === 'document';

  if (url.pathname.endsWith('/version.json') || isDocument) {
    e.respondWith(
      fetch(e.request).then(r => {
        const copy = r.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
        return r;
      }).catch(()=> caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      const networkFetch = fetch(e.request).then(r => {
        const copy = r.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
        return r;
      }).catch(() => cached);
      if (cached) {
        e.waitUntil(networkFetch);
        return cached;
      }
      return networkFetch;
    })
  );
});

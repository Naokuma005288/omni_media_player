/* OmniMedia SW v3.4 */
const VERSION = 'v5.2.2-sw1';
const CORE = [
  './',
  './index.html',
  './readme.html',
  './README.md',
  './omni-player.html',
  './omni-player-mini.html',
  './assets/pwa/manifest.webmanifest',
  './assets/pwa/omni-player.webmanifest',
  './assets/pwa/omni-player-mini.webmanifest',
  './version.json',
  './assets/pwa/icon-192.png',
  './assets/pwa/icon-512.png',
  './assets/pwa/apple-touch-icon.png',
  './assets/pwa/fallback-audio-512.png',
  './assets/pwa/fallback-video-512.png',
  './assets/pwa/icon.svg',
  './assets/pwa/thumb-pc.svg',
  './assets/pwa/thumb-touch.svg',
  './styles/pages/readme.inline-1.css',
  './scripts/pages/readme.inline-1.js',
  './scripts/app/omni-playback-core.js',
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

async function putIfOk(cache, request, response){
  if(!response || !response.ok) return response;
  await cache.put(request, response.clone());
  return response;
}

async function networkFirst(request){
  try{
    const response = await fetch(request);
    const cache = await caches.open(VERSION);
    return await putIfOk(cache, request, response);
  }catch(_error){
    return caches.match(request);
  }
}

async function staleWhileRevalidate(request){
  const cached = await caches.match(request);
  const networkFetch = fetch(request).then(async response => {
    const cache = await caches.open(VERSION);
    return putIfOk(cache, request, response);
  }).catch(() => cached);
  if(cached) return { response:cached, background:networkFetch };
  return { response:await networkFetch, background:null };
}

async function precacheCoreAssets(){
  const cache = await caches.open(VERSION);
  const results = await Promise.allSettled(
    CORE.map(async (asset) => {
      const response = await fetch(asset, { cache:'no-cache' });
      if(!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      await cache.put(asset, response.clone());
    })
  );
  const failed = results
    .map((result, index) => result.status === 'rejected' ? `${CORE[index]}: ${result.reason?.message || result.reason}` : '')
    .filter(Boolean);
  if(failed.length){
    console.warn('[OmniMedia SW] precache skipped assets', failed);
  }
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    precacheCoreAssets().then(()=> self.skipWaiting())
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
  const isVersionFile = url.pathname.endsWith('/version.json');
  const isCodeAsset = /\.(?:js|css|webmanifest)$/i.test(url.pathname);

  if (isVersionFile || isDocument || isCodeAsset) {
    e.respondWith(networkFirst(e.request));
    return;
  }

  e.respondWith(
    staleWhileRevalidate(e.request).then(({ response, background }) => {
      if (background) e.waitUntil(background);
      return response;
    })
  );
});

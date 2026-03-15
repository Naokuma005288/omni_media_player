/* OmniMedia SW v1.9 */
const VERSION = 'v1.9.0';
const CORE = [
  './',
  './index.html',
  './assets/pwa/manifest.webmanifest',
  './version.json',
  './assets/pwa/icon.svg',
  './assets/pwa/thumb-pc.svg',
  './assets/pwa/thumb-touch.svg'
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

// Network-first for version.json (update signal), cache-first fallback for others
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // ignore cross-origin

  if (url.pathname.endsWith('/version.json')) {
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
    caches.match(e.request).then(cached => cached || fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(VERSION).then(c => c.put(e.request, copy));
      return r;
    }))
  );
});

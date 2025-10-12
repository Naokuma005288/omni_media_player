// ルート配置（/sw.js）。GitHub PagesでもOK
const CACHE = 'omni-js-boost-v1';
const ASSETS = [
  '/', '/index.html', '/main.js',
  // 外部CDNは動的取得に任せる。必要ならここに固定バージョンのURLを列挙して事前キャッシュも可。
];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', (e)=>{
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(res=> res || fetch(req).then(net=>{
      // 同一オリジンのみキャッシュ（CDNはネット優先）
      const url = new URL(req.url);
      if (url.origin === location.origin) {
        const copy = net.clone();
        caches.open(CACHE).then(c=> c.put(req, copy));
      }
      return net;
    }).catch(()=> caches.match('/index.html')))
  );
});

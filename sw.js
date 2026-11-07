/* QWACK 0.1.4 — offline scoped to this PWA only. */
const CACHE = 'qwack-pwa-v0.1.4';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png',
  './maskable-512.png', './apple-touch-icon.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(
    names.filter(name => name.startsWith('qwack-pwa-') && name !== CACHE).map(name => caches.delete(name))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(response => {
      if (response.ok) {
        const clone=response.clone();
        caches.open(CACHE).then(cache => cache.put('./index.html', clone));
      }
      return response;
    }).catch(async () => (await caches.match(req)) || (await caches.match('./index.html'))));
    return;
  }
  if (!new URL(req.url).pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});

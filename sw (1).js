const CACHE = 'sysbase-v1773863282';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('supabase.co')) return;
  if (e.request.url.includes('cdn.jsdelivr')) return;
  if (e.request.url.includes('fonts.google')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

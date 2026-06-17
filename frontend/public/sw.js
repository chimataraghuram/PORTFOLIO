const CACHE_NAME = 'cr-portfolio-v3';
const urlsToCache = [
  '/manifest.json',
  '/favicon.png',
  '/profile.jpg'
];

self.addEventListener('install', event => {
  // Skip waiting so the new SW activates immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Delete all old caches so stale JS/CSS never gets served
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Never cache JS/CSS assets or HTML — always fetch fresh from network
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html') ||
    url.pathname === '/'
  ) {
    event.respondWith(fetch(event.request));
    return;
  }
  // Cache-first only for static assets like images
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

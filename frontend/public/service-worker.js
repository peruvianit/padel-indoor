// Aggiungi risorse alla cache durante l'installazione del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/favicon_192x192.png',
          '/favicon_512x512.png',
          '/static/js/main.js',
          '/static/css/main.css',
        ]);
      })
    );
  });
  
  // Forza l'attivazione immediata del service worker
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['my-cache'];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
    self.skipWaiting(); // Forza l'attivazione del nuovo service worker
  });
  
  // Intercetta le richieste di rete per gestirle tramite la cache
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
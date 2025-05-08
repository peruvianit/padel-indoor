// Nome della cache
const CACHE_NAME = 'my-cache-v1';

// File da mettere in cache durante l'installazione
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon_192x192.png',
  '/favicon_512x512.png'
];

// Installazione del service worker - aggiungi risorse alla cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Intercettazione delle richieste di rete per rispondere con la cache (offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Restituisce la risposta dalla cache, se esiste, altrimenti effettua una richiesta di rete
      return response || fetch(event.request);
    })
  );
});

// Attivazione del service worker - rimuovi le vecchie cache
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Rimuovi cache non più necessarie
          }
        })
      );
    })
  );
});

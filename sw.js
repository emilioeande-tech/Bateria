const CACHE_NAME = 'bateria-v1';
const ARCHIVOS = [
  './Bateria.html',
  './Bateria.png',
  './manifest.json'
];

// Instalación: guarda en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARCHIVOS);
    })
  );
  self.skipWaiting();
});

// Activación: limpia cachés viejos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch: sirve desde caché, si no está, va a la red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((respuesta) => {
      return respuesta || fetch(e.request);
    })
  );
});
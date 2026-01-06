const CACHE_NAME = 'cv-builder-v3';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './libs/jspdf.umd.min.js',
  './libs/html2canvas.min.js'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Instalando arquivos offline...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((res) => {
      // Se tiver no cache, usa. Se não, busca na web.
      return res || fetch(evt.request);
    })
  );
});

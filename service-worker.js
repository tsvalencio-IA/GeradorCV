const CACHE_NAME = 'cv-pro-v9-stable'; // Versão incrementada
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './libs/jspdf.umd.min.js',
  './libs/html2canvas.min.js'
];

// Instalação: Cacheia os arquivos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // Força ativação imediata
  );
});

// Ativação: Limpa caches antigos para não dar conflito
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      })
    ))
  );
  self.clients.claim();
});

// Interceptação: Serve cache se offline ou falha na rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

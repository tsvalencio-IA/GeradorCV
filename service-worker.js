const CACHE_NAME = 'cv-pro-v6-final';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './libs/jspdf.umd.min.js',
  './libs/html2canvas.min.js'
];

// Instalação: Cacheia os arquivos essenciais
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

// Ativação: Limpa caches velhos
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
  )));
  self.clients.claim();
});

// Fetch: Serve do cache se estiver offline
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

const CACHE_NAME = 'sonarch-v1';
const ASSETS = ['/', '/index.html', '/src/css/global.css', '/src/main.js'];

self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', (e) => e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))));
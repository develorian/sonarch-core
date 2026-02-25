// sw.js (El Guardián Offline de SONARCH)

const CACHE_NAME = 'sonarch-core-v0.1.0';

// 🛡️ BÓVEDA DE SUPERVIVENCIA: Archivos mínimos para arrancar sin internet
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/src/css/global.css',
    '/src/core/engine.js',
    '/src/core/router.js'
    // Nota: Vite inyectará los demás dinámicamente en producción
];

// FASE 1: INSTALACIÓN (Descarga la app al disco duro)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SONARCH SW] Bóveda sellada. Sistema listo para Offline.');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // Fuerza a que el SW tome el control inmediatamente
});

// FASE 2: ACTIVACIÓN (Destruye versiones viejas del framework)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log(`[SONARCH SW] Purgando caché obsoleta: ${cache}`);
                        return caches.delete(cache); // Limpieza de RAM/Disco
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// FASE 3: INTERCEPTOR DE RED (Estrategia: Cache-First, Fallback to Network)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // 1. Si está en el disco duro (caché), devuélvelo a velocidad O(1)
            if (cachedResponse) return cachedResponse;
            
            // 2. Si no está en caché y hay internet, ve a buscarlo a la red
            return fetch(event.request).catch(() => {
                // 3. Si no hay internet y no está en caché... (El usuario está 100% offline)
                // Aquí podrías devolver una vista genérica de "Sin Conexión"
                console.error('[SONARCH SW] Recurso inalcanzable. Red caída.');
            });
        })
    );
});
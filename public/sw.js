// public/sw.js (El Guardián Offline de SONARCH v0.2.0 - Stale-While-Revalidate)

const CACHE_NAME = 'sonarch-vault-v1.0.0';

// Esto es CÓDIGO VIEJO: 😎
// 🛡️ BÓVEDA DE SUPERVIVENCIA: Archivos mínimos para arrancar sin internet
/*
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/src/css/global.css',
    '/src/core/engine.js',
    '/src/core/router.js'
    // Nota: Vite inyectará los demás dinámicamente en producción
];
*/

// ESTO EL FUTURO 🤩
// FASE 1: INSTALACIÓN (Descarga la app al disco duro)
self.addEventListener('install', (event) => {
    self.skipWaiting();
    // 🟢 Instalaciones exitosas
    console.log('>> [SONARCH SW] 💿 %c🆗 NODO SOBERANO INSTALADO ✅!.', 'color: #00ff00; font-weight: bold;');
});

// FASE 2: ACTIVACIÓN (Destruye versiones viejas del framework)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) {
                    // 🟠 Purgado de memoria
                    console.log(`>> [SONARCH SW] 🧹 %cEliminando caché obsoleto: ${key}`, 'color: #f4a75f; font-weight: bold;');
                    return caches.delete(key);
                }
            })
        ))
    );
    self.clients.claim();
});

// FASE 3: INTERCEPTOR DE RED (Estrategia: Stale-While-Revalidate)
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    if (url.origin !== location.origin) return;
    if (url.pathname.startsWith('/api/')) return;

    // ignorar todo lo que no sea http/https (ej.: ws://, chrome-extension://)
    if (!url.protocol.startsWith('http')) return;

    // 🛡️ Filtro Vite: Ignoramos las conexiones internas del servidor de desarrollo 
    // Esto repara tu LCP lento de 0.44s durante la programación.
    if (url.pathname.includes('/@vite/') ||
        url.pathname.includes('/@fs/') ||
        url.pathname.includes('node_modules/') ||
        url.pathname.includes('token=')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {

            // 1. Búsqueda en la red de forma asíncrona (segundo plano)
            const fetchPromise = fetch(event.request)
                .then((networkResponse) => {
                    // Clonar la respuesta inmediatamente antes de que el navegador la consuma
                    const responseToCache = networkResponse.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        // Se guarda el clon seguro en el Vault
                        cache.put(event.request, responseToCache);
                    });
                    // Devolvemos la respuesta intacta al navegador
                    return networkResponse;
                })
                .catch(async () => {
                    // 🟡 Advertencias: modo Offline
                    console.warn('>> [SONARCH SW] 📡 %cNodo aislado. Operando 100% Ofline.', 'color: #f2ff00; font-weight: bold;'); //#ffd700 -> otro tono de color
                    if (event.request.mode === 'navigate') {
                        const indexFallback = await caches.match('/index.html');
                        if (indexFallback) return indexFallback;
                    }

                    // Prevenimos el TypeError devolviendo una respuesta sintética:
                    if (!cachedResponse) {
                        console.error('>> [SONARCH SW] 🚨 %cRecurso inalcanzable. Red caída.', 'color: #ff0000; font-weight: bold;');
                        return new Response("<h1>Nodo aislado. Recurso Inalcanzable</h1>", {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: {
                                'Content-Type': 'text/html'
                            }
                        });
                    }
                });

            // 2. Si hay caché se devuelve al instante (0(1)).
            // Si está vacío, se espera la promesa de la red.
            return (cachedResponse) || fetchPromise;
        })
    );
});
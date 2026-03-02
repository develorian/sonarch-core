/**
 * @module Router
 * @description Sovereign SPA Router plugin. Zero-dependency, memory-safe.
 */
export class Router {
    constructor({ basePath = '' } = {}) {
        this.basePath = basePath;
        this.routes = [];
        this.currentParams = {};
        this.currentQuery = {};
    }

    add(path, viewFn) {
        const keys = [];
        // Soporte para rutas dinámicas y ruta comodín '*'
        let regexString = path === '*' ? "^.*$" : "^" + path.replace(/:([^\/]+)/g, (_, key) => {
            keys.push(key); return "([^/]+)";
        }) + "$";
        
        this.routes.push({ regex: new RegExp(regexString), keys, viewFn });
        return this; // Permite el encadenamiento: router.add().add()
    }

    navigate(path) {
        const fullPath = path === '/' ? this.basePath + '/' : this.basePath + path;
        window.history.pushState(null, '', fullPath);
        this.resolve();
    }

    resolve() {
        // ⏱️ Inicia el cronómetro táctico
        const startTime = performance.now();

        let path = window.location.pathname;
        if (this.basePath && path.startsWith(this.basePath)) {
            path = path.replace(this.basePath, '') || '/';
        }

        const searchParams = new URLSearchParams(window.location.search);
        this.currentQuery = {};
        for (const [key, value] of searchParams.entries()) this.currentQuery[key] = value;

        let matchFound = false;
        for (const route of this.routes) {
            const match = path.match(route.regex);
            if (match) {
                matchFound = true;
                this.currentParams = {};
                route.keys.forEach((k, i) => {
                    if(match[i + 1]) this.currentParams[k] = match[i + 1];
                });
                // Ejecuta la función inyectora de main.js
                route.viewFn(this.currentParams, this.currentQuery);
                break;
            }
        }
        // ⏱️ Detiene el cronómetro y dispara el log en consola
        const endTime = performance.now();
        console.log(
            `%cPUMMM!!! 🚀 Esto fue veloz, recarga en: ${(endTime - startTime).toFixed(3)} ms 😎 ¡Somos la ley!`, 
            'color: #00f2ff; font-weight: bold; font-size: 13px; text-shadow: 0 0 8px rgba(0, 242, 255, 0.8);'
        );
    }

    ignite() {
        window.addEventListener('popstate', () => this.resolve());
        document.body.addEventListener('click', e => {
            const path = e.composedPath();
            const target = path.find(el => el.hasAttribute && el.hasAttribute('data-link'));
            if (target) {
                e.preventDefault();
                this.navigate(target.getAttribute('href') || '/');
            }
        });
        this.resolve();
        console.log('>> [SONARCH ROUTER] ⚡ %cPLUGIN IGNITED.', 'color: rgb(208, 255, 0); font-weight: bold;');
    }
}
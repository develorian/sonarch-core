// src/core/router.js
export const Router = {
    routes: {},

    Route(path, layoutTag, viewTag) {
        this.routes[path] = { layoutTag, viewTag };
    },

    navigate(path) {
        console.log(`[SONARCH Router] pushState hacia: ${path}`);
        window.history.pushState({}, "", path);
        this.render();
    },

    render() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['/'];
        const appContainer = document.querySelector('sonarch-app');
        
        if (!appContainer) {
            console.error("[SONARCH Router] ERROR: Contenedor <sonarch-app> no encontrado.");
            return;
        }

        const currentLayout = appContainer.firstElementChild;
        console.log(`[SONARCH Router] Inyectando Vista: <${route.viewTag}>`);

        if (currentLayout && currentLayout.tagName.toLowerCase() === route.layoutTag) {
            // Reemplaza solo el contenido central (Cero parpadeos)
            currentLayout.innerHTML = `<${route.viewTag} slot="content"></${route.viewTag}>`;
        } else {
            // Construye toda la estructura si es la primera carga
            appContainer.innerHTML = `
                <${route.layoutTag}>
                    <${route.viewTag} slot="content"></${route.viewTag}>
                </${route.layoutTag}>
            `;
        }
    }
};

window.addEventListener("popstate", () => Router.render());

// SECUESTRADOR DE ENLACES (Bulletproof)
document.addEventListener("click", (e) => {
    const path = e.composedPath();
    
    // El uso de "?." (Optional Chaining) evita errores con Nodos de Texto o Documentos
    const anchor = path.find(el => el?.tagName?.toUpperCase() === 'A');

    if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault(); // Detiene la recarga de página brutal
        const routePath = new URL(anchor.href).pathname;
        Router.navigate(routePath);
    }
});
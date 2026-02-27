import { defineComponent } from '/src/core/engine.js';

defineComponent('view-busqueda', (attbr) => {
    // Si la URL es /busqueda?q=Soberania&filtro=Activos
    // El router inyecta mágicamente attbr.q y attbr.filtro
    const termino = attbr.q || 'Búsqueda vacía'; 
    const filtro = attbr.filtro || 'Todos';

    return {
        template: /*html*/`
            <div class="fx items-ctr just-ctr w-full anim-fade" style="min-height: calc(100vh - 120px);">
                <div class="gls-panel p-xl txt-ctr fx fx-col items-ctr" style="max-width: 500px;">
                    
                    <h2 class="txt-lg fw-bold tc-main tracking-widest">RESULTADOS DE BÚSQUEDA</h2>
                    
                    <div class="fx gap-md mt-4" style="margin: 1.5rem 0; width: 100%; justify-content: center;">
                        <div class="p-sm" style="border: 1px solid var(--color-cyan); border-radius: var(--sz-sm);">
                            <span class="tc-mut txt-sm">Término (?q=):</span><br>
                            <span class="tc-main fw-bold txt-md">${termino}</span>
                        </div>
                        <div class="p-sm" style="border: 1px solid var(--color-purple); border-radius: var(--sz-sm);">
                            <span class="tc-mut txt-sm">Filtro (?filtro=):</span><br>
                            <span class="tc-main fw-bold txt-md">${filtro}</span>
                        </div>
                    </div>

                    <p class="tc-mut txt-sm">
                        Tu enrutador parseó los Query Parameters sin recargar la página.
                    </p>

                    <a href="/enjambre" data-link class="btn-core mt-4" style="text-decoration: none; margin-top: 1.5rem;">VOLVER</a>
                </div>
            </div>
        `
    };
});
import { defineComponent } from '/src/core/engine.js';

defineComponent('sn-node', (attrs) => {
    // Si la URL es /nodo/777, attbr.id será "777"
    const nodoId = attrs.id || 'Desconocido';

    return {
        template: /*html*/`
            <div class="fx items-ctr just-ctr w-full anim-fade" style="min-height: calc(100vh - 120px);">
                <div class="gls-panel p-xl txt-ctr fx fx-col items-ctr" style="max-width: 400px;">
                    
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--grad-primary); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                        <span class="txt-xl fw-bold" style="color: white;">${nodoId}</span>
                    </div>
                    
                    <h2 class="txt-lg fw-bold tc-main tracking-widest">PERFIL DEL NODO</h2>
                    <p class="tc-mut txt-sm mt-2" style="margin-bottom: 2rem;">
                        Estás viendo la información dinámica del nodo aislado. La ruta ha inyectado el parámetro de forma nativa.
                    </p>

                    <a href="/enjambre" data-link class="btn-core" style="text-decoration: none;">VOLVER AL ENJAMBRE</a>
                </div>
            </div>
        `
    };
});
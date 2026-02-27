import { defineComponent } from '/src/core/engine.js'; 
import '/src/ui/components/sonarch-card.js';

defineComponent('view-enjambre', () => {
    return {
        template: /*html*/`
            <div class="fx items-ctr just-ctr w-full anim-fade" style="min-height: calc(100vh - 120px);">
                <section class="fx fx-col just-ctr items-ctr gap-xl" style="width: 100%; max-width: 1200px;">
                    
                    <div class="fx fx-col txt-ctr items-ctr" style="margin-top: 2rem;">
                        <h2 class="fw-bold tc-main tracking-widest" style="font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; margin: 0;">MONITOREO</h2>
                        <div style="height: 4px; width: 80px; background: var(--grad-primary); margin-top: 1.5rem; border-radius: 2px;"></div>
                        <p class="tc-mut txt-md" style="max-width: 600px; margin-top: 1.5rem;">
                            Red neuronal desplegada. Nodos sincronizados y operando bajo consenso distribuido.
                        </p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--sz-lg); width: 100%; align-items: stretch;">
                        <sonarch-card 
                            attbr-tipo="dinamica" 
                            attbr-icono="abeja">
                        </sonarch-card>
                        <sonarch-card attbr-icono="servidor" attbr-titulo="NODO BETA (ARCH)" attbr-desc="Servidor de bases de datos. KVM2 Activo." attbr-valor="UP"></sonarch-card>
                        <sonarch-card attbr-icono="red" attbr-titulo="LATENCIA DE RED" attbr-desc="Tiempo de respuesta P2P estimado." attbr-valor="12ms"></sonarch-card>
                    </div>

                    <div class="txt-ctr mt-4" style="margin-top: 1rem;">
                    
                    <!-- Agregamos par de combinaciones de búsquedas, para probar rutas con querys-->
                    <div class="fx gap-md mt-4 just-ctr" style="margin-top: 2rem;">
                        <a href="/busqueda?q=Criptografia" data-link class="btn-core" style="text-decoration: none;">Buscar Cripto</a>
                        
                        <a href="/busqueda?q=Redes+Mesh&filtro=Militares" data-link class="btn-core" style="text-decoration: none;">Buscar Redes (Con Filtro)</a>
                    </div>

                    <div class="txt-ctr mt-4" style="margin-top: 1rem;">
                    <a href="/nodo/777" data-link class="txt-md fw-bold tc-cyan hover-fx">>> INSPECIONAR NODO 777 <<</a>
                    </div>

                </section>
            </div>
        `
    };
});
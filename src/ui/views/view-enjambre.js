import { defineComponent } from '../../core/engine.js';
import '../components/sonarch-card.js';

defineComponent('view-enjambre', () => {
    return {
        template: `
            <div class="fx items-ctr just-ctr w-full anim-fade" style="height: 100%; padding: var(--sz-lg); overflow-y: auto;">
                
                <section class="fx fx-col gap-xl" style="width: 100%; max-width: 1200px; padding-top: 2rem;">
                    
                    <div class="fx fx-col txt-ctr items-ctr" style="margin-bottom: 2rem;">
                        <h2 class="fw-bold tc-main tracking-widest" style="font-size: clamp(3rem, 6vw, 5rem); line-height: 1; margin: 0;">MONITOREO</h2>
                        <div style="height: 4px; width: 80px; background: var(--grad-primary); margin-top: 1.5rem; border-radius: 2px;"></div>
                        <p class="tc-mut txt-md" style="max-width: 600px; margin-top: 1.5rem;">
                            Estado en tiempo real de los servidores soberanos. Cada instancia está aislada pero comunicada por el protocolo P2P.
                        </p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--sz-lg); width: 100%;">
                        
                        <sonarch-card></sonarch-card>

                        <sonarch-card 
                            attbr-titulo="NODO BETA (ARCH)"
                            attbr-desc="Servidor de bases de datos. KVM2 Activo."
                            attbr-valor="UP">
                        </sonarch-card>

                        <sonarch-card 
                            attbr-titulo="LATENCIA DE RED"
                            attbr-desc="Tiempo de respuesta entre la matriz y el cliente."
                            attbr-valor="12ms">
                        </sonarch-card>
                    </div>

                </section>
            </div>
        `
    };
});
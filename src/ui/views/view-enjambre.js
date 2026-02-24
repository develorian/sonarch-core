import { defineComponent } from '../../core/engine.js';
import '../components/sonarch-card.js';

defineComponent('view-enjambre', () => {
    return {
        template: `
            <div class="flex items-center justify-center w-full" style="height: 100%; padding: 2rem;">
                
                <section class="flex items-center justify-center gap-6" style="width: 100%; max-width: 900px; flex-wrap: wrap;">
                    
                    <div class="flex col" style="flex: 1; min-width: 300px;">
                        <h2 class="font-bold text-dark tracking-widest" style="font-size: clamp(3rem, 8vw, 5rem); line-height: 1;">ENJAMBRE</h2>
                        <div style="height: 4px; width: 80px; background: var(--color-accent-cyan); margin-top: 1.5rem; box-shadow: 0 0 10px var(--color-accent-cyan);"></div>
                        <p class="text-light mt-6" style="max-width: 400px;">
                            Monitoreo en tiempo real de la soberanía de la red. 
                            Cada conexión es un pilar inquebrantable en la matriz post-cuántica.
                        </p>
                    </div>

                    <div class="flex justify-center" style="flex: 1; min-width: 300px;">
                        <sonarch-card></sonarch-card>
                    </div>

                </section>

            </div>
        `
    };
});
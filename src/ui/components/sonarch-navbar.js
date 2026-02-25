import { defineComponent } from '../../core/engine.js';
import './sonarch-theme-toggle.js'; // El toggle ahora pertenece a la Navbar

defineComponent('sonarch-navbar', () => {
    return {
        // Extraemos exactamente el mismo diseño de Isla Flotante
        template: `
            <header class="fx just-btw items-ctr gls-panel" style="margin: var(--sz-md) var(--sz-lg) 0; padding: var(--sz-md) var(--sz-lg); border-radius: var(--sz-lg); z-index: 50;">
                
                <h1 class="txt-lg fw-bold tc-grad tracking-widest" style="margin: 0;">NODO ALPHA</h1>
                
                <div class="fx items-ctr gap-md">
                    <nav class="fx gap-lg">
                        <a href="/" class="txt-sm fw-bold tc-mut hover-fx" style="text-decoration:none;">INICIO</a>
                        <a href="/enjambre" class="txt-sm fw-bold tc-mut hover-fx" style="text-decoration:none;">ENJAMBRE</a>
                    </nav>
                    
                    <div style="width: 1px; height: 20px; background: var(--text-mut); opacity: 0.3; margin: 0 var(--sz-sm);"></div>
                    
                    <sonarch-theme-toggle></sonarch-theme-toggle>
                </div>

            </header>
        `
    };
});

import { defineComponent } from '../../core/engine.js';
// Importamos la Navbar recién creada
import '../components/sonarch-navbar.js'; 

defineComponent('layout-base', () => {
    return {
        // El Layout ahora es un mapa espacial puro, sin código basura
        template: `
            <div class="fx fx-col min-h-screen">
                
                <sonarch-navbar></sonarch-navbar>

                <main class="flex-1 p-lg fx just-ctr items-ctr" style="position: relative; z-index: 10;">
                    <slot name="content"></slot>
                </main>

            </div>
        `
    };
});
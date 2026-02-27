import { defineComponent } from '/src/core/engine.js';

defineComponent('sonarch-app', () => {
    return {
        template: /*html*/`
            <div class="sonarch-root-container">
                <slot></slot> 
            </div>
        `,
        setup: () => {
            console.log("[SONARCH] Capa de aplicación raíz montada y asegurada.");
        }
    };
});
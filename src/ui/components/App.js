import { defineComponent } from '/src/core/engine.js';

defineComponent('sn-dapp', () => {
    return {
        template: /*html*/`
            <div class="sn-root-container">
                <slot></slot> 
            </div>
        `,
        setup: () => {
            console.log("[SONARCH] Capa de aplicación raíz montada y asegurada.");
        }
    };
});
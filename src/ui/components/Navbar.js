import { defineComponent } from '/src/core/engine.js';
import './ThemeToggle.js';

defineComponent('sn-navbar', () => {
    return {
        template: /*html*/`
            <style>
                /* Mantiene la barra fija en la parte superior al hacer scroll */
                :host {
                    position: sticky;
                    top: var(--sz-md);
                    z-index: 100;
                    display: block;
                }
            </style>
            <header class="fx just-btw items-ctr gls-panel" style="margin: 0 var(--sz-lg); padding: var(--sz-md) var(--sz-lg); border-radius: var(--sz-lg);">
                <h1 class="txt-lg fw-bold tc-grad tracking-widest" style="margin: 0;">NODO ALPHA</h1>
                <div class="fx items-ctr gap-md">
                    <nav class="fx gap-lg">
                        <a href="/" data-link class="txt-sm fw-bold tc-mut hover-fx" style="text-decoration:none;">INICIO</a>
                        <a href="/enjambre" data-link class="txt-sm fw-bold tc-mut hover-fx" style="text-decoration:none;">ENJAMBRE</a>
                        <a href="/dashboard" data-link class="txt-sm fw-bold tc-mut hover-fx" style="text-decoration:none;">DASHBOARD</a>
                    </nav>
                    <div style="width: 1px; height: 20px; background: var(--text-mut); opacity: 0.3; margin: 0 var(--sz-sm);"></div>
                    <sn-theme-toggle></sn-theme-toggle>
                </div>
            </header>
        `
    };
});
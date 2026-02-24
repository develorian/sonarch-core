import { defineComponent } from '../../core/engine.js';
import '../components/sonarch-theme-toggle.js'; // Asegúrate de que este archivo exista con este nombre exacto

defineComponent('layout-base', () => {
    return {
        template: `
            <div class="flex col min-h-screen">
                <header class="flex justify-between items-center p-6 bg-glass border-glass shadow-md">
                    <h1 class="text-xl font-bold text-accent tracking-widest">NODO ALPHA</h1>
                    <div class="flex items-center gap-6">
                        <nav class="flex gap-6">
                            <a href="/" class="text-sm font-bold text-light hover-up cursor-pointer" style="text-decoration:none;">INICIO</a>
                            <a href="/enjambre" class="text-sm font-bold text-light hover-up cursor-pointer" style="text-decoration:none;">ENJAMBRE</a>
                        </nav>
                        <sonarch-theme-toggle></sonarch-theme-toggle>
                    </div>
                </header>
                <main class="flex-1 p-6 flex justify-center items-center">
                    <slot name="content"></slot>
                </main>
            </div>
        `
    };
});
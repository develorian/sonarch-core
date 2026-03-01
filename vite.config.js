import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// Convertimos la configuración en una función que detecta el comando actual
// @ts-ignore
export default defineConfig(({ command }) => {
    // Si el comando es 'build' (producción), usa la ruta de GitHub Pages.
    // Si es 'serve' (local), usa la raíz estandar '/'.
    // @ts-ignore
    const currentBase = command === 'build' ? '/sonarch-core/' : '/';
    return {
        base: currentBase,
        plugins: [wasm(), topLevelAwait()],
    server: { port: 8080 }
    } 
});
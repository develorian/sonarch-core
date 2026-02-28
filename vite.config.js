import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
    base: '/sonarch-core/',
    plugins: [wasm(), topLevelAwait()],
    server: { port: 8080 }
});
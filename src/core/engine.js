// src/core/engine.js

// 1. IMPORTACIÓN SÍNCRONA CRUDA (Evita el error de MIME type de Vite)
import cssText from '../css/global.css?raw';

// 2. CREAMOS LA HOJA MAESTRA COMPARTIDA
const globalSheet = new CSSStyleSheet();
globalSheet.replaceSync(cssText);

// 3. INYECTAMOS AL DOCUMENTO GLOBAL (Fondo negro y variables :root)
document.adoptedStyleSheets = [globalSheet];

// Sistema de Señales
export function createSignal(initialValue) {
    let value = initialValue;
    const listeners = new Set();
    return {
        get value() { return value; },
        set value(newVal) { value = newVal; listeners.forEach(fn => fn(value)); },
        subscribe: (fn) => listeners.add(fn)
    };
}

// Tema Global
const getInitialTheme = () => localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
export const themeSignal = createSignal(getInitialTheme());

themeSignal.subscribe((theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Creador de Componentes Nativos
export function defineComponent(tagName, renderFn) {
    if (customElements.get(tagName)) return; 
    
    customElements.define(tagName, class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            
            // MAGIA: Inyectamos la hoja maestra sin hacer peticiones de red
            this.shadowRoot.adoptedStyleSheets = [globalSheet];
        }
        
        connectedCallback() { this.mount(); }
        
        get attbrs() {
            const attrs = {};
            for (let attr of this.attributes) {
                const key = attr.name.startsWith('attbr-') ? attr.name.slice(6) : attr.name;
                attrs[key] = attr.value;
            }
            return attrs;
        }
        
        mount() {
            const { template, setup } = renderFn(this.attbrs);
            
            // SIN @import. Solo forzamos el tamaño correcto.
            this.shadowRoot.innerHTML = `
                <style>:host { display: block; width: 100%; height: 100%; }</style>
                ${template}
            `;
            
            if (setup) setup(this.shadowRoot);
        }
    });
}
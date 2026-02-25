// src/core/engine.js
import cssText from '../css/global.css?raw';

// 🛡️ MOTOR CSS (Constructable Stylesheets - Rendimiento Extremo)
const globalSheet = new CSSStyleSheet();
globalSheet.replaceSync(cssText);
document.adoptedStyleSheets = [globalSheet]; // Aplica al documento general

/**
 * @template T
 * @typedef {Object} Signal
 * @property {T} value
 * @property {function(function(T): void): function(): void} subscribe
 */

// ==========================================================================
// 1. MOTOR REACTIVO (Memoria Grano Fino O(1))
// ==========================================================================

/**
 * Crea un nodo de memoria reactiva.
 * @template T
 * @param {T} initialValue
 * @returns {Signal<T>}
 */
export function createSignal(initialValue) {
    let value = initialValue;
    /** @type {Set<function(T): void>} */
    const subscribers = new Set();
    
    return {
        get value() { return value; },
        set value(newValue) {
            if (value === newValue) return;
            value = newValue;
            subscribers.forEach(fn => fn(value));
        },
        subscribe(fn) {
            subscribers.add(fn);
            fn(value);
            return () => subscribers.delete(fn); // Detonador de limpieza
        }
    };
}

/** @type {Signal<string>} */
export const themeSignal = createSignal('dark');
themeSignal.subscribe(theme => document.documentElement.setAttribute('data-theme', String(theme)));


// ==========================================================================
// 2. FÁBRICA DE COMPONENTES SOBERANOS (Shadow DOM)
// ==========================================================================

/**
 * @typedef {Object} ComponentConfig
 * @property {string} template
 * @property {function(ShadowRoot): (function(): void | void)} [setup]
 */

/**
 * Registra un Web Component de grado militar.
 * @param {string} tagName
 * @param {function(Object<string, string>): ComponentConfig} componentFn
 */
export function defineComponent(tagName, componentFn) {
    if (customElements.get(tagName)) return;

    customElements.define(tagName, class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            /** @type {function(): void | null} */
            this._cleanup = null;
        }

        connectedCallback() {
            /** @type {Object<string, string>} */
            const attbr = {};
            Array.from(this.attributes).forEach(attr => {
                if (attr.name.startsWith('attbr-')) {
                    attbr[attr.name.replace('attbr-', '')] = attr.value;
                }
            });

            const { template, setup } = componentFn(attbr);

            if (this.shadowRoot) {
                // 🚀 INYECCIÓN CSS NATIVA Y SOBERANA
                this.shadowRoot.adoptedStyleSheets = [globalSheet];
                this.shadowRoot.innerHTML = template;
            }

            if (setup && this.shadowRoot) {
                this._cleanup = setup(this.shadowRoot) || null; 
            }
        }

        disconnectedCallback() {
            if (typeof this._cleanup === 'function') {
                this._cleanup();
            }
            this._cleanup = null;
        }
    });
}
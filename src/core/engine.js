// src/core/engine.js

/**
 * @template T
 * @param {T} initialValue
 * @returns {{ value: T, subscribe: (fn: (val: T) => void) => () => boolean }}
 */
export function createSignal(initialValue) {
    let _value = initialValue;
    /** @type {Set<(val: T) => void>} */
    const subscribers = new Set();
    return {
        get value() { return _value; },
        set value(newValue) {
            // @ts-ignore
            _value = typeof newValue === 'function' ? newValue(_value) : newValue;
            subscribers.forEach(fn => fn(_value));
        },
        subscribe: (subscriber) => {
            subscribers.add(subscriber);
            return () => subscribers.delete(subscriber);
        }
    };
}

/** @type {ReturnType<typeof createSignal<string>>} */
export const themeSignal = createSignal('dark');

// ==========================================
// OPTIMIZACIÓN LEYENDA: Constructable Stylesheets (Síncrono)
// ==========================================
// @ts-ignore -> Le decimos a VSCode que ignore esta sintaxis exclusiva de Vite
import globalCss from '/src/css/global.css?inline';

/** @type {CSSStyleSheet} */
const globalSheet = new CSSStyleSheet();
globalSheet.replaceSync(globalCss); // ¡Carga instantánea en RAM, cero esperas de red!

// ==========================================
// DEFINICIÓN DE COMPONENTES Y SHADOW DOM
// ==========================================
/**
 * @typedef {Object} ComponentConfig
 * @property {string} template
 * @property {(dom: ShadowRoot) => (void | (() => void))} [setup]
 */

/**
 * @param {string} tagName
 * @param {(attbr: Record<string, string>) => ComponentConfig} componentFactory
 */
export function defineComponent(tagName, componentFactory) {
    if (customElements.get(tagName)) return;

    customElements.define(tagName, class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            /** @type {Array<() => void>} */
            this._cleanupFns = [];
        }

        // Ya no somos asíncronos. La velocidad es máxima.
        connectedCallback() {
            /** @type {Record<string, string>} */
            const attbr = {};
            for (let attr of this.attributes) {
                if (attr.name.startsWith('attbr-')) {
                    attbr[attr.name.replace('attbr-', '')] = attr.value;
                }
            }

            const { template, setup } = componentFactory(attbr);
            
            if(this.shadowRoot) {
                this.shadowRoot.innerHTML = template;
                // Adoptamos la hoja maestra instantáneamente
                this.shadowRoot.adoptedStyleSheets = [globalSheet];
            }

            if (setup && this.shadowRoot) {
                const cleanup = setup(this.shadowRoot);
                if (typeof cleanup === 'function') {
                    this._cleanupFns.push(cleanup);
                }
            }
        }

        disconnectedCallback() {
            this._cleanupFns.forEach(fn => fn());
            this._cleanupFns = [];
        }
    });
}
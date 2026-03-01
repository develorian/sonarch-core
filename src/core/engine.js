/**
 * @module SovereignEngine
 * @description Zero-VDOM, memory-safe reactive core
 */

// @ts-ignore
import globalCss from '/src/css/global.css?inline';

/** @type {CSSStyleSheet} */
const globalSheet = new CSSStyleSheet();
globalSheet.replaceSync(globalCss);

/**
 * Creates a reactive state primitive with functional update support.
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
            const nextValue = typeof newValue === 'function' ? newValue(_value) : newValue;
            if (nextValue !== _value) {
                _value = nextValue;
                subscribers.forEach(fn => fn(_value));
            }
        },
        subscribe: (subscriber) => {
            subscribers.add(subscriber);
            subscriber(_value);
            return () => subscribers.delete(subscriber);
        }
    };
}

/** @type {ReturnType<typeof createSignal<string>>} */
export const themeSignal = createSignal('dark');

/**
 * @template T
 * @typedef {Object} ComponentConfig
 * @property {string} template - Native HTML with <slot> support.
 * @property {Record<string, function(Event, HTMLElement): void>} [actions] - Auto-binder methods.
 * @property {(dom: ShadowRoot) => (void | (() => void))} [setup] - Surgical DOM injection and logic.
 */

/**
 * Defines a memory-safe Sovereign Web Component.
 * @param {string} tagName
 * @param {(attrs: Record<string, string>) => ComponentConfig} componentFactory
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

        connectedCallback() {
            /** @type {Record<string, string>} */
            const attrs = {};
            // 🛡️ BUCLE SELLADO CORRECTAMENTE
            for (let attr of Array.from(this.attributes)) {
                if (attr.name.startsWith('attrs-')) {
                    attrs[attr.name.replace('attrs-', '')] = attr.value;
                }
            }

            const { template, actions, setup } = componentFactory(attrs);

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = template;
                this.shadowRoot.adoptedStyleSheets = [globalSheet];

                // ⚡ SONARCH AUTO-BINDER
                if (actions) { // 🛡️ IF SELLADO CORRECTAMENTE
                    this.shadowRoot.querySelectorAll('*').forEach(el => {
                        for (let attr of Array.from(el.attributes)) {
                            if (attr.name.startsWith('@')) { 
                                const eventName = attr.name.substring(1);
                                const actionName = attr.value;

                                if (typeof actions[actionName] === 'function') {
                                    const boundAction = (e) => actions[actionName](e, /** @type {HTMLElement} */(el));
                                    el.addEventListener(eventName, boundAction);
                                    el.removeAttribute(attr.name); // 🛡️ TIPO CORREGIDO
                                    this._cleanupFns.push(() => {
                                        el.removeEventListener(eventName, boundAction);
                                    });
                                }
                            }
                        }
                    });
                }

                if (setup && this.shadowRoot) {
                    const cleanup = setup(this.shadowRoot);
                    if (typeof cleanup === 'function') {
                        this._cleanupFns.push(cleanup);
                    }
                }
            }
        }

        disconnectedCallback() {
            this._cleanupFns.forEach(fn => fn());
            this._cleanupFns = [];
        }
    });
}
/**
 * @module DApp
 * @description SONARCH Aplication Instance. Ecosystem manager for Sovereing Nodes.
 */
export class DApp {
    /**
     * @param {Object} config 
     * @param {string} [config.name]
     * @param {string} [config.version]
     */
    constructor(config = {}) {
        this.name = config.name || 'SONARCH Node';
        this.version = config.version || 'v0.1.1-alpha-MicroMotorJS';

        this.plugins = new Map();
        this.globalState = new Map();

        console.log(`[SONARCH] ✅ Engine initialized: ${this.name} (${this.version})`);
    }

    /**
     * Registers a plugin or module (e.g., Router, Vault, HttpClient).
     * @param {string} id
     * @param {any} instance
     * @returns {this}
     */
    use(id, instance) {
        this.plugins.set(id, instance);
        return this; // Permite el encadenamiento: app.use('a', A).use('b', B)
    }

    /**
     * Mounts the application to the physical DOM and triggers plugins.
     * @param {string} selector|
     */
    mount(selector) {
        const root = document.querySelector(selector);
        if (!root) throw new Error(`[SONARCH] 404: Root element ${selector} not found.`);

        // If a router plugin exists, ignite it.
        if (this.plugins.has('router')) {
            const router = this.plugins.get('router');
            router.ignite(root);
        }
    }
}
/**
 * @module HttpClient
 * @description Military-grade HTTP client plugin for Sovereign Nodes. Features Exponential Backoff and strict HTTPS enforcement.
 */
export class HttpClient {
    /**
     * @param {string} baseURL 
     * @param {Record<string, string>} defaultHeaders 
     */
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.headers = defaultHeaders;
    }

    async request(endpoint, options = {}, retries = 3, backoff = 1000) {
        const url = endpoint.startsWith('http') ? endpoint : this.baseURL + endpoint;

        // 🛡️ FIREWALL TÁCTICO: Bloqueo de peticiones no seguras.
        if (url.startsWith('http://') && !url.includes('localhost')) {
            throw new Error(`[SONARCH] 🛡️ Brecha de Seguridad: Conexión HTTP rechazada hacia ${url}. Utiliza HTTPS`);
        }

        const finalOptions = { 
            ...options, 
            headers: { 
                'Content-Type': 'application/json', 
                ...this.headers, .
                ..options.headers 
            } 
        };

        for (let i = 0; i <= retries; i++) {
            try {
                const response = await fetch(url, finalOptions);
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                return await response.json(); 
            } catch (err) {
                if (err.name === 'AbortError') throw err;
                if (i === retries) throw err;
                await new Promise(r => setTimeout(r, backoff));
                backoff *= 2; // ALGORITMO DE EXPONENTIOAL BACKOFF
            }
        }
    }

    get(endpoint, options = {}) { 
        return this.request(endpoint, { ...options, method: 'GET' }); 
    }

    post(endpoint, body, options = {}) { 
        return this.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }); 
    }
}
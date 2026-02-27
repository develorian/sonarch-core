export const Http = {
    baseUrl: '',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

    async request(endpoint, options = {}, retries = 3, backoff = 1000) {
        const url = endpoint.startsWith('http') ? endpoint : this.baseUrl + endpoint;
        if (url.startsWith('http://') && !url.includes('localhost')) {
            throw new Error(`[SONARCH] Seguridad: Conexión HTTP rechazada hacia ${url}.`);
        }

        const finalOptions = { ...options, headers: { ...this.headers, ...options.headers } };

        for (let i = 0; i <= retries; i++) {
            try {
                const response = await fetch(url, finalOptions);
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                return await response.json(); 
            } catch (err) {
                if (err.name === 'AbortError') throw err;
                if (i === retries) throw err;
                await new Promise(r => setTimeout(r, backoff));
                backoff *= 2; 
            }
        }
    },
    get(endpoint, options = {}) { return this.request(endpoint, { ...options, method: 'GET' }); },
    post(endpoint, body, options = {}) { return this.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }); }
};
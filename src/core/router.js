// src/core/router.js

/**
 * @typedef {Object} Route
 * @property {RegExp} regex
 * @property {string[]} keys
 * @property {string} tag
 */

/** @type {Record<string, string>} */
export let currentParams = {};
/** @type {Record<string, string>} */
export let currentQuery = {};
/** @type {Route[]} */
const routes = [];

export const Router = {
    /**
     * @param {string} path
     * @param {string} tag
     */
    add: (path, tag) => {
        /** @type {string[]} */
        const keys = [];
        const regexString = "^" + path.replace(/:([^\/]+)/g, (_, key) => {
            keys.push(key); return "([^/]+)";
        }) + "$";
        routes.push({ regex: new RegExp(regexString), keys, tag });
    },
    
    /** @param {string} path */
    navigate: (path) => {
        history.pushState(null, '', path);
        Router.resolve();
    },
    
    resolve: () => {
        const routerOutlet = document.querySelector('main');
        const path = window.location.pathname;
        const searchParams = new URLSearchParams(window.location.search);

        currentQuery = {};
        for (const [key, value] of searchParams.entries()) currentQuery[key] = value;

        let matchFound = false;
        for (const route of routes) {
            const match = path.match(route.regex);
            if (match) {
                matchFound = true;
                currentParams = {};
                route.keys.forEach((k, i) => {
                    if(match[i + 1]) currentParams[k] = match[i + 1];
                });

                let attrs = '';
                for (const k in currentParams) attrs += `attbr-${k}="${currentParams[k]}" `;
                for (const k in currentQuery) attrs += `attbr-${k}="${currentQuery[k]}" `;

                if (routerOutlet) {
                    routerOutlet.innerHTML = `<${route.tag} ${attrs.trim()}></${route.tag}>`;
                }
                break;
            }
        }
        if (!matchFound && routerOutlet) {
            routerOutlet.innerHTML = `<h2 style="text-align:center; margin-top:2rem;">404 - Nodo no encontrado</h2>`;
        }
    }
};

window.addEventListener('popstate', Router.resolve);
document.body.addEventListener('click', e => {
    // @ts-ignore
    const path = e.composedPath();
    const target = path.find(el => el.hasAttribute && el.hasAttribute('data-link'));

    if (target) {
        e.preventDefault();
        Router.navigate(target.getAttribute('href') || '/');
    }
});
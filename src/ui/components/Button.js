import { defineComponent, createSignal } from '/src/core/engine.js';

export const conex = createSignal(0);

defineComponent('sn-btn', (attrs) => ({
    template: /*html*/`
        <button class="btn-core w-full mt-4">
            <span id="texto">${conex.value > 0 ? 'CONECTADO' : (attrs.text || 'ACCIÓN')}</span> 
            <span class="txt-tn ml-2" style="opacity: 0.8; color: white;">
                [ Nodos: <span id="contador">${conex.value}</span> ]
            </span>
        </button>
    `,
    setup: (shadowDOM) => {
        const btn = shadowDOM.querySelector('button');
        const counter = shadowDOM.querySelector('#contador');
        const text = shadowDOM.querySelector('#texto');

        const unsubscribe = conex.subscribe(val => {
            if (counter) counter.textContent = String(val);
        });

        if (btn) btn.addEventListener('click', () => {
            if (!text || text.textContent === "CONECTANDO...") return;
            text.textContent = "CONECTANDO...";
            setTimeout(() => {
                if (text) text.textContent = "CONECTADO";
                conex.value++;
            }, 400);
        });

        return unsubscribe; // Limpieza automática
    }
}));
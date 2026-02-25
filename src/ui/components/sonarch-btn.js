import { defineComponent, createSignal } from '../../core/engine.js';

export const conexiones = createSignal(0);

defineComponent('sonarch-btn', (attbr) => ({
    template: /*html*/`
        <button class="btn-core w-full mt-4">
            <span id="texto">${conexiones.value > 0 ? 'CONECTADO' : attbr.text}</span> 
            <span class="txt-tn ml-2" style="opacity: 0.8; color: white;">
                [ Nodos: <span id="contador">${conexiones.value}</span> ]
            </span>
        </button>
    `,
    setup: (dom) => {
        const btn = dom.querySelector('button');
        const contador = dom.querySelector('#contador');
        const texto = dom.querySelector('#texto');

        conexiones.subscribe(val => {
            if (contador) contador.textContent = String(val);
        });

        if (btn) btn.addEventListener('click', () => {
            if (!texto || texto.textContent === "CONECTANDO...") return;
            texto.textContent = "CONECTANDO...";
            setTimeout(() => {
                if (texto) texto.textContent = "CONECTADO";
                conexiones.value++;
            }, 800);
        });
    }
}));
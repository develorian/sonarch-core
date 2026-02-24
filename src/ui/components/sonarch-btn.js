import { defineComponent, createSignal } from '../../core/engine.js';
import { IniciarEnjambreUseCase } from '../../domain/useCases/iniciarEnjambreUseCase.js';

// Este estado vive en la RAM, fuera del componente. Sobrevive a los cambios de ruta.
export const conexiones = createSignal(0); // exports no es necesario si el dato vive en la misma página.
const useCase = new IniciarEnjambreUseCase();

defineComponent('sonarch-btn', (attbr) => {
    return {
        // MAGIA: Inyectamos ${conexiones.value} directo en el template inicial
        template: `
            <button class="bg-gradient text-dark font-bold py-4 px-8 rounded-2xl shadow-lg transition hover-up cursor-pointer w-full mt-4 border-none">
                <span id="texto-btn">${conexiones.value > 0 ? 'CONECTADO' : attbr.text}</span> 
                <span class="text-xs ml-2 opacity-70" style="color: black;">
                    [ Nodos: <span id="contador">${conexiones.value}</span> ]
                </span>
            </button>
        `,
        setup: (shadowDOM) => {
            const btn = shadowDOM.querySelector('button');
            const contador = shadowDOM.querySelector('#contador');
            const textoBtn = shadowDOM.querySelector('#texto-btn');

            // 1. Suscribirse a cambios FUTUROS
            conexiones.subscribe(val => {
                contador.textContent = val;
            });

            // 2. Lógica del clic
            btn.addEventListener('click', async () => {
                if (textoBtn.textContent === "CONECTANDO...") return; // Evitar spam de clics

                textoBtn.textContent = "CONECTANDO...";

                const result = await useCase.execute("Alpha");

                if (result.success) {
                    textoBtn.textContent = "CONECTADO";
                    conexiones.value++; // Esto actualiza el número automáticamente
                }
            });
        }
    };
});
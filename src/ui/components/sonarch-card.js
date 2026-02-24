import { defineComponent } from '../../core/engine.js';
import { conexiones } from './sonarch-btn.js'; // Importamos la memoria compartida

// SVG de la Abeja Cibernética y el Enjambre
const cyberBeeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="140" height="140" class="drop-shadow-cyan">
    <g transform="translate(100, 100)">
        <polygon points="0,-40 34,-20 34,20 0,40 -34,20 -34,-20" fill="#1f242d" stroke="#00f2ff" stroke-width="2"/>
        <rect x="-15" y="-25" width="30" height="50" rx="15" fill="#13161c" stroke="#ffffff" stroke-width="3"/>
        <line x1="-15" y1="-5" x2="15" y2="-5" stroke="#00f2ff" stroke-width="3"/>
        <line x1="-15" y1="5" x2="15" y2="5" stroke="#00f2ff" stroke-width="3"/>
        <path d="M 15 -10 Q 50 -40 60 -10 Q 50 20 15 10" fill="none" stroke="#00f2ff" stroke-width="3"/>
        <path d="M -15 -10 Q -50 -40 -60 -10 Q -50 20 -15 10" fill="none" stroke="#00f2ff" stroke-width="3"/>
        <circle cx="0" cy="-35" r="10" fill="#13161c" stroke="#ffffff" stroke-width="2"/>
        <circle cx="-4" cy="-37" r="2" fill="#00f2ff"/>
        <circle cx="4" cy="-37" r="2" fill="#00f2ff"/>
    </g>
    <g transform="translate(30, 40) scale(0.35)">
        <rect x="-15" y="-25" width="30" height="50" rx="15" fill="#13161c" stroke="#ffffff" stroke-width="3"/>
        <path d="M 15 -10 Q 50 -40 60 -10 Q 50 20 15 10" fill="none" stroke="#00f2ff" stroke-width="3"/>
        <path d="M -15 -10 Q -50 -40 -60 -10 Q -50 20 -15 10" fill="none" stroke="#00f2ff" stroke-width="3"/>
    </g>
    <g transform="translate(160, 150) scale(0.4)">
        <rect x="-15" y="-25" width="30" height="50" rx="15" fill="#13161c" stroke="#00f2ff" stroke-width="3"/>
        <path d="M 15 -10 Q 50 -40 60 -10 Q 50 20 15 10" fill="none" stroke="#ffffff" stroke-width="3"/>
        <path d="M -15 -10 Q -50 -40 -60 -10 Q -50 20 -15 10" fill="none" stroke="#ffffff" stroke-width="3"/>
    </g>
    <g transform="translate(40, 160) scale(0.25)">
        <rect x="-15" y="-25" width="30" height="50" rx="15" fill="#13161c" stroke="#ffffff" stroke-width="3"/>
        <path d="M 15 -10 Q 50 -40 60 -10 Q 50 20 15 10" fill="none" stroke="#00f2ff" stroke-width="3"/>
        <path d="M -15 -10 Q -50 -40 -60 -10 Q -50 20 -15 10" fill="none" stroke="#00f2ff" stroke-width="3"/>
    </g>
</svg>
`;

defineComponent('sonarch-card', () => {
    // Obtenemos la fecha actual
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    return {
        template: `
            <div class="bg-glass border-glass rounded-2xl p-8 flex col items-center text-center shadow-lg" style="width: 100%; max-width: 320px;">
                ${cyberBeeSvg}
                
                <h3 class="text-xl font-bold text-accent mt-4">PULSO DEL ENJAMBRE</h3>
                <p class="text-sm text-light mt-2 mb-6">Nodos activos fortificando la red neuronal descentralizada. Presencia confirmada.</p>
                
                <div class="font-bold text-dark" style="font-size: 4rem; line-height: 1; text-shadow: 0 0 15px rgba(0,242,255,0.4);">
                    <span id="nodo-display">${conexiones.value}</span>
                </div>
                
                <div class="text-xs text-light mt-6 opacity-70 tracking-widest uppercase">
                    ${fecha}
                </div>
            </div>
        `,
        setup: (shadowDOM) => {
            const display = shadowDOM.querySelector('#nodo-display');

            // Si el estado cambia mientras estamos en esta pantalla, se actualiza solo
            conexiones.subscribe(val => {
                display.textContent = val;
            });
        }
    };
});
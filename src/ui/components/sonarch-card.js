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

defineComponent('sonarch-card', (attbr) => {
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    // 🌟 RECEPCIÓN DE ATRIBUTOS (Props): Leemos lo que nos manda el Padre
    // Si no manda nada, usamos valores por defecto (Fallback)
    const titulo = attbr.titulo || 'PULSO DEL ENJAMBRE';
    const desc = attbr.desc || 'Nodos activos fortificando la red neuronal descentralizada. Presencia confirmada.';
    const valor = attbr.valor || conexiones.value; 

    return {
        template: /*html*/`
            <div class="gls-panel p-xl fx fx-col items-ctr txt-ctr hover-fx" style="width: 100%; min-width: 250px;">
                ${cyberBeeSvg}
                <h3 class="txt-lg fw-bold tc-grad" style="margin-top: 1rem; text-transform: uppercase;">${titulo}</h3>
                <p class="txt-sm tc-mut" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">${desc}</p>
                <div class="fw-bold tc-main" style="font-size: 4rem; line-height: 1; text-shadow: 0 0 20px color-mix(in srgb, var(--color-cyan) 40%, transparent);">
                    <span ${!attbr.valor ? 'id="nodo-display"' : ''}>${valor}</span>
                </div>
                <div class="txt-tn tc-mut" style="margin-top: 1.5rem; opacity: 0.7; letter-spacing: 0.1em; text-transform: uppercase;">
                    ${fecha}
                </div>
            </div>
        `,
        setup: (shadowDOM) => {
            // SOLO nos suscribimos a la Señal Global si esta tarjeta es la del "Enjambre Principal"
            // (Es decir, si no le pasaron un "attbr-valor" estático)
            if (!attbr.valor) {
                const display = shadowDOM.querySelector('#nodo-display');
                if(display) conexiones.subscribe(val => display.textContent = String(val));
            }
        }
    };
});
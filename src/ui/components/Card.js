import { defineComponent } from '/src/core/engine.js';
import { conex } from './Button.js';

const iconsSvg = {
    abeja: `
        <svg viewBox="0 0 200 200" width="100" height="100" class="drop-shadow-cyan">
            <g transform="translate(100, 100)">
                <polygon points="0,-40 34,-20 34,20 0,40 -34,20 -34,-20" fill="#1f242d" stroke="#00f2ff" stroke-width="2"/>
                <rect x="-15" y="-25" width="30" height="50" rx="15" fill="#13161c" stroke="#ffffff" stroke-width="3"/>
                <line x1="-15" y1="-5" x2="15" y2="-5" stroke="#00f2ff" stroke-width="3"/>
                <line x1="-15" y1="5" x2="15" y2="5" stroke="#00f2ff" stroke-width="3"/>
                <path d="M 15 -10 Q 50 -40 60 -10 Q 50 20 15 10" fill="none" stroke="#00f2ff" stroke-width="3"/>
                <path d="M -15 -10 Q -50 -40 -60 -10 Q -50 20 -15 10" fill="none" stroke="#00f2ff" stroke-width="3"/>
                <circle cx="0" cy="-35" r="10" fill="#13161c" stroke="#ffffff" stroke-width="2"/>
                <circle cx="-4" cy="-37" r="2" fill="#00f2ff"/><circle cx="4" cy="-37" r="2" fill="#00f2ff"/>
            </g>
        </svg>`,
    servidor: `
        <svg viewBox="0 0 200 200" width="100" height="100" class="drop-shadow-cyan">
            <g transform="translate(100, 100)">
                <rect x="-45" y="-40" width="90" height="25" rx="5" fill="#1f242d" stroke="#00f2ff" stroke-width="3"/>
                <circle cx="-25" cy="-27.5" r="4" fill="#00f2ff"/><circle cx="-10" cy="-27.5" r="4" fill="#8b5cf6"/>
                <line x1="10" y1="-27.5" x2="35" y2="-27.5" stroke="#4facfe" stroke-width="3" stroke-linecap="round"/>
                
                <rect x="-45" y="15" width="90" height="25" rx="5" fill="#1f242d" stroke="#00f2ff" stroke-width="3"/>
                <circle cx="-25" cy="27.5" r="4" fill="#00f2ff"/><circle cx="-10" cy="27.5" r="4" fill="#8b5cf6"/>
                <line x1="10" y1="27.5" x2="35" y2="27.5" stroke="#4facfe" stroke-width="3" stroke-linecap="round"/>
                
                <line x1="0" y1="-15" x2="0" y2="15" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="6 4"/>
            </g>
        </svg>`,
    red: `
        <svg viewBox="0 0 200 200" width="100" height="100" class="drop-shadow-cyan">
            <g transform="translate(100, 100)">
                <circle cx="0" cy="0" r="45" fill="none" stroke="#00f2ff" stroke-width="2" stroke-dasharray="10 6"/>
                <circle cx="0" cy="0" r="20" fill="none" stroke="#8b5cf6" stroke-width="3"/>
                <circle cx="0" cy="0" r="6" fill="#4facfe"/>
                <path d="M-20,-20 L-45,-45 M20,20 L45,45 M-20,20 L-45,45 M20,-20 L45,-45" stroke="#00f2ff" stroke-width="3" stroke-linecap="round"/>
                <circle cx="-45" cy="-45" r="5" fill="#8b5cf6"/><circle cx="45" cy="45" r="5" fill="#8b5cf6"/>
                <circle cx="-45" cy="45" r="5" fill="#8b5cf6"/><circle cx="45" cy="-45" r="5" fill="#8b5cf6"/>
            </g>
        </svg>`
};

defineComponent('sn-card', (attrs) => {
    const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const isDinamic = attrs.type === 'dinamica';
    const title = attrs.title || 'PULSO DEL ENJAMBRE';
    const desc = attrs.desc || 'Nodos activos fortificando la red neuronal descentralizada. Presencia confirmada.';
    const currentVaule = isDinamic ? conex.value : (attrs.value || '0');

    // Seleccionamos el SVG correspondiente, por defecto la abeja
    const svgEscogido = iconsSvg[attrs.icon] || iconsSvg.abeja;

    return {
        template: /*html*/`
            <div class="gls-panel p-lg fx fx-col items-ctr txt-ctr hover-fx h-full" style="width: 100%;">
                ${svgEscogido}
                <h3 class="txt-md fw-bold tc-grad" style="margin-top: 1rem; text-transform: uppercase;">${title}</h3>
                <p class="txt-sm tc-mut" style="margin-top: 0.5rem; margin-bottom: 1.5rem; flex: 1;">${desc}</p>
                
                <div class="fw-bold tc-main" style="font-size: 3.5rem; line-height: 1; text-shadow: 0 0 20px color-mix(in srgb, var(--color-cyan) 40%, transparent);">
                    <span ${isDinamic ? 'id="nodo-display"' : ''}>${currentVaule}</span>
                </div>
                
                <div class="txt-tn tc-mut" style="margin-top: 1.5rem; opacity: 0.7; letter-spacing: 0.1em; text-transform: uppercase;">
                    ${date}
                </div>
            </div>
        `,
        setup: (shadowDOM) => {
            if (isDinamic) {
                const display = shadowDOM.querySelector('#nodo-display');
                if (display) {
                    display.textContent = String(conex.value);
                    return conex.subscribe(val => display.textContent = String(val));
                }
            }
        }
    };
});
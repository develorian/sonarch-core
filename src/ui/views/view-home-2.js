import { defineComponent } from '/src/core/engine.js'; // Ruta absoluta
import '/src/ui/components/sonarch-btn.js';           // Ruta absoluta

const svgLogo = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="180" height="180" class="drop-shadow-cyan" style="margin-bottom: 2rem;">
    <path d="M200 20 L60 220 L200 180 L340 220 Z" fill="#2b313d" />
    <path d="M200 180 L60 220 L200 360 L340 220 Z" fill="#1f242d" />
    <path d="M80 120 L40 80 M320 120 L360 80 M60 170 L20 170 M340 170 L380 170 M100 260 L60 300 M300 260 L340 300" stroke="#00f2ff" stroke-width="4" stroke-linecap="round"/>
    <circle cx="40" cy="80" r="5" fill="#00f2ff"/><circle cx="360" cy="80" r="5" fill="#00f2ff"/>
    <circle cx="20" cy="170" r="5" fill="#00f2ff"/><circle cx="380" cy="170" r="5" fill="#00f2ff"/>
    <circle cx="60" cy="300" r="5" fill="#00f2ff"/><circle cx="340" cy="300" r="5" fill="#00f2ff"/>
    <path d="M140 130 C130 90 150 70 170 90 C180 85 220 85 230 90 C250 70 270 90 260 130 C290 180 260 230 200 250 C140 230 110 180 140 130 Z" fill="#13161c" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
    <path d="M160 145 Q175 140 185 155 Q170 160 160 145 Z" fill="#00f2ff" />
    <path d="M240 145 Q225 140 215 155 Q230 160 240 145 Z" fill="#00f2ff" />
    <path d="M195 190 Q200 195 205 190 L200 210 Z" fill="#ffffff" />
    <path d="M200 90 L200 130 L180 150 M200 130 L220 150" fill="none" stroke="#00f2ff" stroke-width="3"/>
    <circle cx="180" cy="150" r="3" fill="#00f2ff"/><circle cx="220" cy="150" r="3" fill="#00f2ff"/>
    <path d="M140 180 L160 180 L170 200 M260 180 L240 180 L230 200" fill="none" stroke="#00f2ff" stroke-width="3"/>
    <circle cx="200" cy="310" r="40" fill="#13161c" />
    <circle cx="200" cy="310" r="30" fill="none" stroke="#00f2ff" stroke-width="5"/>
    <circle cx="200" cy="310" r="15" fill="none" stroke="#00f2ff" stroke-width="3"/>
    <circle cx="200" cy="310" r="5" fill="#00f2ff"/>
</svg>`;

defineComponent('view-home', () => {
    return {
        template: `
            <div class="fx items-ctr just-ctr w-full anim-fade" style="height: 100%;">
                <section class="fx fx-col items-ctr txt-ctr gap-lg" style="max-width: 600px; margin: 0 auto;">
                    ${svgLogo}
                    <h2 class="txt-xl fw-bold tc-main">LA WEB SOBERANA</h2>
                    <p class="txt-md tc-mut">
                        Construyendo sistemas resilientes, post-cuánticos y sin intermediarios. 
                        El poder ha vuelto a los nodos.
                    </p>
                    <sonarch-btn attbr-text="CONECTAR AL ENJAMBRE"></sonarch-btn>
                </section>
            </div>
        `
    };
});
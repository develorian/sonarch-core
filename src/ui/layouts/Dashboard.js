import { defineComponent, createSignal } from "/src/core/engine.js";

// Global State Simulation (can be moved to a state manager later)
const userSignal = createSignal({ name: 'Develorian', rank: 'Developer', tokens: 1_000_000 });

defineComponent('sn-dashboard', () => {
    return {
        // 1.- NATIVE SLOTS & HOLOGRAM CSS STRUCTURE
        template: /*html*/`
            <div class="gls-panel p-xl w-full anim-fade" style="max-width: 800px; margin: 2rem auto;">
                
                <header class="fx just-btw items-ctr w-full" style="border-bottom: 1px solid color-mix(in srgb, var(--color-cyan) 30%, transparent); padding-bottom: 1rem; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
                    <slot name="title"><h2 class="txt-lg fw-bold tc-grad">Default Node Console</h2></slot>
                    <div class="rank-badge txt-sm fw-bold tc-main gls-panel hover-fx" style="padding: 0.5rem 1rem; border-radius: 20px; border-color: var(--color-cyan);"></div>
                </header>

                <main class="fx fx-col items-ctr just-ctr w-full">
                    <div class="gls-panel p-xl fx fx-col items-ctr txt-ctr hover-fx" style="width: 100%; background: color-mix(in srgb, var(--bg-base) 40%, transparent);">
                        <h3 class="txt-md tc-mut fw-bold" style="text-transform: uppercase; letter-spacing: 0.1em;">Sovereign Tokens</h3>
                        <span id="token-display" class="fw-bold tc-cyan" style="font-size: clamp(3rem, 8vw, 5rem); text-shadow: 0 0 20px color-mix(in srgb, var(--color-cyan) 50%, transparent); line-height: 1; margin-top: 1rem;">0</span>
                    </div>
                </main>

                <footer class="fx just-ctr items-ctr gap-md w-full" style="margin-top: 2rem; flex-wrap: wrap;">
                    <button class="btn-core hover-fx" @click="mineToken" style="flex: 1; min-width: 200px;">
                        Minar Token (+100)
                    </button>
                    <button class="btn-core hover-fx" @click="lockNode" style="flex: 1; min-width: 200px; background: transparent; border: 1px solid #ff3366; color: #ff3366; box-shadow: 0 0 15px rgba(255, 51, 102, 0.2);">
                        Bloquear Nodo
                    </button>
                </footer>
            </div>
        `,

        // 2.- ACTIONS LOGIC (Auto-bound to the HTML)
        actions: {
            mineToken: (event, el) => {
                const current = userSignal.value;
                // Mutación mutable: Esto dispara el motor reactivo
                userSignal.value = { ...current, tokens: current.tokens + 100 };

                // Efecto visual de rebote (Opcional)
                el.style.transform = 'scale(0.95)';
                setTimeout(() => el.style.transform = 'scale(1)', 100);
            },
            updateTokens: (event, el) => {
                el.querySelector('#tokens').textContent = userSignal.value.tokens;
            },
            lockNode: (event, el) => alert('Nodo encriptado y bloqueado')
        },

        // 4. SURGICAL INJECTION (No re-rendering the whole component)
        setup: (shadowDOM) => {
            const tokenEl = shadowDOM.querySelector('#token-display');
            const rankEl = shadowDOM.querySelector('.rank-badge');

            // Suscribe to signal. When value changes, ONLY update the next node.
            const unsuscribe = userSignal.subscribe(user => {
                // Formato de miles de comas
                tokenEl.textContent = user.tokens.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                rankEl.textContent = user.rank;
            });

            // Return cleanup function to prevent memory leaks ir component destroyed
            return unsuscribe;
        }
    }
});
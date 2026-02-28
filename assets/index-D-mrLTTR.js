(function() {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) a(t);
  new MutationObserver((t) => {
    for (const e of t) if (e.type === "childList") for (const i of e.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && a(i);
  }).observe(document, { childList: true, subtree: true });
  function o(t) {
    const e = {};
    return t.integrity && (e.integrity = t.integrity), t.referrerPolicy && (e.referrerPolicy = t.referrerPolicy), t.crossOrigin === "use-credentials" ? e.credentials = "include" : t.crossOrigin === "anonymous" ? e.credentials = "omit" : e.credentials = "same-origin", e;
  }
  function a(t) {
    if (t.ep) return;
    t.ep = true;
    const e = o(t);
    fetch(t.href, e);
  }
})();
let p = {}, h = {};
const g = [], f = { add: (r, s) => {
  const o = [], a = "^" + r.replace(/:([^\/]+)/g, (t, e) => (o.push(e), "([^/]+)")) + "$";
  g.push({ regex: new RegExp(a), keys: o, tag: s });
}, navigate: (r) => {
  history.pushState(null, "", r), f.resolve();
}, resolve: () => {
  const r = document.querySelector("main"), s = window.location.pathname, o = new URLSearchParams(window.location.search);
  h = {};
  for (const [t, e] of o.entries()) h[t] = e;
  let a = false;
  for (const t of g) {
    const e = s.match(t.regex);
    if (e) {
      a = true, p = {}, t.keys.forEach((n, d) => {
        e[d + 1] && (p[n] = e[d + 1]);
      });
      let i = "";
      for (const n in p) i += `attbr-${n}="${p[n]}" `;
      for (const n in h) i += `attbr-${n}="${h[n]}" `;
      r && (r.innerHTML = `<${t.tag} ${i.trim()}></${t.tag}>`);
      break;
    }
  }
  !a && r && (r.innerHTML = '<h2 style="text-align:center; margin-top:2rem;">404 - Nodo no encontrado</h2>');
} };
window.addEventListener("popstate", f.resolve);
document.body.addEventListener("click", (r) => {
  const o = r.composedPath().find((a) => a.hasAttribute && a.hasAttribute("data-link"));
  o && (r.preventDefault(), f.navigate(o.getAttribute("href") || "/"));
});
const y = `:host{display:block;width:100%;box-sizing:border-box}:root{--color-cyan: #00f2ff;--color-blue: #4facfe;--color-purple: #8b5cf6;--bg-base: #f8f9fa;--bg-surface: #ffffff;--text-main: #1e293b;--text-mut: #64748b;--grad-primary: linear-gradient(135deg, var(--color-purple), var(--color-blue));--sz-tn: clamp(.25rem, 1vw, .5rem);--sz-sm: clamp(.5rem, 2vw, .75rem);--sz-md: clamp(1rem, 3vw, 1.25rem);--sz-lg: clamp(1.5rem, 4vw, 2rem);--sz-xl: clamp(2rem, 5vw, 3rem);font-family:Inter,system-ui,sans-serif;color-scheme:light dark}[data-theme=dark]{--bg-base: #0a0a12;--bg-surface: #13161c;--text-main: #f0f4f8;--text-mut: #94a3b8;--grad-primary: linear-gradient(135deg, var(--color-blue), var(--color-cyan))}*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}body{background-color:var(--bg-base);color:var(--text-main);height:100dvh;position:relative;overflow:hidden;transition:background-color .4s ease,color .4s ease;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}body:before{content:"";position:fixed;inset:0;z-index:-2;background-color:color-mix(in srgb,var(--text-main) 5%,transparent);mask-image:url("data:image/svg+xml,%3Csvg width='60' height='103.9' viewBox='0 0 60 103.9' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M30 103.9l25.98-15v-30L30 43.9l-25.98 15v30z' fill-opacity='0' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E");mask-size:60px 103.9px;pointer-events:none}body{background-color:var(--bg-base);color:var(--text-main);min-height:100dvh;position:relative;overflow-x:hidden;overflow-y:auto;transition:background-color .4s ease,color .4s ease;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;scrollbar-width:none;-ms-overflow-style:none}body::-webkit-scrollbar{display:none}@keyframes pulse-network{0%{opacity:.5;transform:scale(1)}to{opacity:1;transform:scale(1.05)}}.fx{display:flex}.fx-col{flex-direction:column}.items-ctr{align-items:center}.just-ctr{justify-content:center}.just-btw{justify-content:space-between}.w-full{width:100%}.h-full{height:100%}.gap-tn{gap:var(--sz-tn)}.gap-sm{gap:var(--sz-sm)}.gap-md{gap:var(--sz-md)}.gap-lg{gap:var(--sz-lg)}.gap-xl{gap:var(--sz-xl)}.p-tn{padding:var(--sz-tn)}.p-sm{padding:var(--sz-sm)}.p-md{padding:var(--sz-md)}.p-lg{padding:var(--sz-lg)}.p-xl{padding:var(--sz-xl)}.txt-tn{font-size:clamp(.65rem,.8vw,.75rem)}.txt-sm{font-size:clamp(.75rem,1vw,.875rem)}.txt-md{font-size:clamp(.875rem,1vw + .5rem,1rem);text-wrap:pretty}.txt-lg{font-size:clamp(1.125rem,2vw + .5rem,1.25rem);text-wrap:balance}.txt-xl{font-size:clamp(2rem,5vw,4rem);text-wrap:balance;line-height:1.1;font-weight:800;letter-spacing:-.02em}.fw-bold{font-weight:700}.txt-ctr{text-align:center}.tc-main{color:var(--text-main)}.tc-mut{color:var(--text-mut)}.tc-grad{background:var(--grad-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.gls-panel{background:color-mix(in srgb,var(--bg-surface) 60%,transparent);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid color-mix(in srgb,var(--text-main) 10%,transparent);border-radius:var(--sz-md);box-shadow:0 8px 32px color-mix(in srgb,var(--text-main) 5%,transparent);transition:all .3s cubic-bezier(.16,1,.3,1)}.gls-panel.hover-fx:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--color-cyan) 30%,transparent);box-shadow:0 15px 40px color-mix(in srgb,var(--color-cyan) 10%,transparent)}.btn-core{background:var(--grad-primary);color:#fff;border:none;padding:var(--sz-sm) var(--sz-lg);border-radius:var(--sz-tn);font-weight:700;cursor:pointer;transition:all .2s ease}.btn-core:hover{transform:scale(1.02);filter:brightness(1.1);box-shadow:0 0 20px color-mix(in srgb,var(--color-cyan) 40%,transparent)}.btn-core:active{transform:scale(.98)}@keyframes fadeInSlide{0%{opacity:0;transform:translateY(20px);filter:blur(5px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}.anim-fade{animation:fadeInSlide .5s cubic-bezier(.16,1,.3,1) forwards}`;
function x(r) {
  let s = r;
  const o = /* @__PURE__ */ new Set();
  return { get value() {
    return s;
  }, set value(a) {
    s = typeof a == "function" ? a(s) : a, o.forEach((t) => t(s));
  }, subscribe: (a) => (o.add(a), () => o.delete(a)) };
}
const m = x("dark"), b = new CSSStyleSheet();
b.replaceSync(y);
function c(r, s) {
  customElements.get(r) || customElements.define(r, class extends HTMLElement {
    constructor() {
      super(), this.attachShadow({ mode: "open" }), this._cleanupFns = [];
    }
    connectedCallback() {
      const o = {};
      for (let e of this.attributes) e.name.startsWith("attbr-") && (o[e.name.replace("attbr-", "")] = e.value);
      const { template: a, setup: t } = s(o);
      if (this.shadowRoot && (this.shadowRoot.innerHTML = a, this.shadowRoot.adoptedStyleSheets = [b]), t && this.shadowRoot) {
        const e = t(this.shadowRoot);
        typeof e == "function" && this._cleanupFns.push(e);
      }
    }
    disconnectedCallback() {
      this._cleanupFns.forEach((o) => o()), this._cleanupFns = [];
    }
  });
}
c("sonarch-app", () => ({ template: `
            <div class="sonarch-root-container">
                <slot></slot> 
            </div>
        `, setup: () => {
  console.log("[SONARCH] Capa de aplicaci\xF3n ra\xEDz montada y asegurada.");
} }));
c("sonarch-theme-toggle", () => {
  const r = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>', s = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  return { template: '<button class="p-2 rounded-full cursor-pointer bg-glass border-glass text-dark transition" id="theme-btn" style="background:transparent; border:none; color:var(--text-main);"></button>', setup: (o) => {
    const a = o.querySelector("#theme-btn"), t = (i) => a.innerHTML = i === "dark" ? s : r, e = m.subscribe(t);
    return t(m.value), a.addEventListener("click", () => {
      m.value = m.value === "light" ? "dark" : "light", document.documentElement.setAttribute("data-theme", m.value);
    }), e;
  } };
});
c("sonarch-navbar", () => ({ template: `
            <style>
                /* Mantiene la barra fija en la parte superior al hacer scroll */
                :host {
                    position: sticky;
                    top: var(--sz-md);
                    z-index: 100;
                    display: block;
                }
            </style>
            <header class="fx just-btw items-ctr gls-panel" style="margin: 0 var(--sz-lg); padding: var(--sz-md) var(--sz-lg); border-radius: var(--sz-lg);">
                <h1 class="txt-lg fw-bold tc-grad tracking-widest" style="margin: 0;">NODO ALPHA</h1>
                <div class="fx items-ctr gap-md">
                    <nav class="fx gap-lg">
                        <a href="/" data-link class="txt-sm fw-bold tc-mut hover-fx" style="text-decoration:none;">INICIO</a>
                        <a href="/enjambre" data-link class="txt-sm fw-bold tc-mut hover-fx" style="text-decoration:none;">ENJAMBRE</a>
                    </nav>
                    <div style="width: 1px; height: 20px; background: var(--text-mut); opacity: 0.3; margin: 0 var(--sz-sm);"></div>
                    <sonarch-theme-toggle></sonarch-theme-toggle>
                </div>
            </header>
        ` }));
c("layout-base", () => ({ template: `
            <div class="fx fx-col min-h-screen">
                <sonarch-navbar></sonarch-navbar>
                <div class="content-area p-md fx fx-col items-ctr" style="flex: 1; padding-bottom: 4rem;">
                    <slot></slot> 
                </div>
            </div>
        ` }));
const l = x(0);
c("sonarch-btn", (r) => ({ template: `
        <button class="btn-core w-full mt-4">
            <span id="texto">${l.value > 0 ? "CONECTADO" : r.text || "ACCI\xD3N"}</span> 
            <span class="txt-tn ml-2" style="opacity: 0.8; color: white;">
                [ Nodos: <span id="contador">${l.value}</span> ]
            </span>
        </button>
    `, setup: (s) => {
  const o = s.querySelector("button"), a = s.querySelector("#contador"), t = s.querySelector("#texto"), e = l.subscribe((i) => {
    a && (a.textContent = String(i));
  });
  return o && o.addEventListener("click", () => {
    !t || t.textContent === "CONECTANDO..." || (t.textContent = "CONECTANDO...", setTimeout(() => {
      t && (t.textContent = "CONECTADO"), l.value++;
    }, 400));
  }), e;
} }));
const w = `
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
c("view-home", () => ({ template: `
            <div class="fx items-ctr just-ctr w-full anim-fade" style="height: 100%;">
                <section class="fx fx-col items-ctr txt-ctr gap-lg" style="max-width: 600px; margin: 0 auto;">
                    ${w}
                    <h2 class="txt-xl fw-bold tc-main">LA WEB SOBERANA</h2>
                    <p class="txt-md tc-mut">
                        Construyendo sistemas resilientes, post-cu\xE1nticos y sin intermediarios. 
                        El poder ha vuelto a los nodos.
                    </p>
                    <sonarch-btn attbr-text="CONECTAR AL ENJAMBRE"></sonarch-btn>
                </section>
            </div>
        ` }));
const u = { abeja: `
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
        </svg>`, servidor: `
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
        </svg>`, red: `
        <svg viewBox="0 0 200 200" width="100" height="100" class="drop-shadow-cyan">
            <g transform="translate(100, 100)">
                <circle cx="0" cy="0" r="45" fill="none" stroke="#00f2ff" stroke-width="2" stroke-dasharray="10 6"/>
                <circle cx="0" cy="0" r="20" fill="none" stroke="#8b5cf6" stroke-width="3"/>
                <circle cx="0" cy="0" r="6" fill="#4facfe"/>
                <path d="M-20,-20 L-45,-45 M20,20 L45,45 M-20,20 L-45,45 M20,-20 L45,-45" stroke="#00f2ff" stroke-width="3" stroke-linecap="round"/>
                <circle cx="-45" cy="-45" r="5" fill="#8b5cf6"/><circle cx="45" cy="45" r="5" fill="#8b5cf6"/>
                <circle cx="-45" cy="45" r="5" fill="#8b5cf6"/><circle cx="45" cy="-45" r="5" fill="#8b5cf6"/>
            </g>
        </svg>` };
c("sonarch-card", (r) => {
  const s = (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" }), o = r.tipo === "dinamica", a = r.titulo || "PULSO DEL ENJAMBRE", t = r.desc || "Nodos activos fortificando la red neuronal descentralizada. Presencia confirmada.", e = o ? l.value : r.valor || "0";
  return { template: `
            <div class="gls-panel p-lg fx fx-col items-ctr txt-ctr hover-fx h-full" style="width: 100%;">
                ${u[r.icono] || u.abeja}
                <h3 class="txt-md fw-bold tc-grad" style="margin-top: 1rem; text-transform: uppercase;">${a}</h3>
                <p class="txt-sm tc-mut" style="margin-top: 0.5rem; margin-bottom: 1.5rem; flex: 1;">${t}</p>
                
                <div class="fw-bold tc-main" style="font-size: 3.5rem; line-height: 1; text-shadow: 0 0 20px color-mix(in srgb, var(--color-cyan) 40%, transparent);">
                    <span ${o ? 'id="nodo-display"' : ""}>${e}</span>
                </div>
                
                <div class="txt-tn tc-mut" style="margin-top: 1.5rem; opacity: 0.7; letter-spacing: 0.1em; text-transform: uppercase;">
                    ${s}
                </div>
            </div>
        `, setup: (n) => {
    if (o) {
      const d = n.querySelector("#nodo-display");
      if (d) return d.textContent = String(l.value), l.subscribe((v) => d.textContent = String(v));
    }
  } };
});
c("view-enjambre", () => ({ template: `
            <div class="fx items-ctr just-ctr w-full anim-fade" style="min-height: calc(100vh - 120px);">
                <section class="fx fx-col just-ctr items-ctr gap-xl" style="width: 100%; max-width: 1200px;">
                    
                    <div class="fx fx-col txt-ctr items-ctr" style="margin-top: 2rem;">
                        <h2 class="fw-bold tc-main tracking-widest" style="font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; margin: 0;">MONITOREO</h2>
                        <div style="height: 4px; width: 80px; background: var(--grad-primary); margin-top: 1.5rem; border-radius: 2px;"></div>
                        <p class="tc-mut txt-md" style="max-width: 600px; margin-top: 1.5rem;">
                            Red neuronal desplegada. Nodos sincronizados y operando bajo consenso distribuido.
                        </p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--sz-lg); width: 100%; align-items: stretch;">
                        <sonarch-card 
                            attbr-tipo="dinamica" 
                            attbr-icono="abeja">
                        </sonarch-card>
                        <sonarch-card attbr-icono="servidor" attbr-titulo="NODO BETA (ARCH)" attbr-desc="Servidor de bases de datos. KVM2 Activo." attbr-valor="UP"></sonarch-card>
                        <sonarch-card attbr-icono="red" attbr-titulo="LATENCIA DE RED" attbr-desc="Tiempo de respuesta P2P estimado." attbr-valor="12ms"></sonarch-card>
                    </div>

                </section>
            </div>
        ` }));
f.add("/", "view-home");
f.add("/enjambre", "view-enjambre");
f.resolve();
console.log(">> SONARCH CORE: INICIADO CORRECTAMENTE");

(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) a(e);
  new MutationObserver((e) => {
    for (const o of e) if (o.type === "childList") for (const n of o.addedNodes) n.tagName === "LINK" && n.rel === "modulepreload" && a(n);
  }).observe(document, { childList: true, subtree: true });
  function r(e) {
    const o = {};
    return e.integrity && (o.integrity = e.integrity), e.referrerPolicy && (o.referrerPolicy = e.referrerPolicy), e.crossOrigin === "use-credentials" ? o.credentials = "include" : e.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function a(e) {
    if (e.ep) return;
    e.ep = true;
    const o = r(e);
    fetch(e.href, o);
  }
})();
class k {
  constructor(t = {}) {
    this.name = t.name || "SONARCH Node", this.version = t.version || "v0.1.1-alpha-MicroMotorJS", this.plugins = /* @__PURE__ */ new Map(), this.globalState = /* @__PURE__ */ new Map(), console.log(`>> [SONARCH ENGINE] \u2705 
Engine initialized: %c${this.name}%c (${this.version})`, "color: rgb(34, 255, 0); font-weight: bold;", "color: hsl(74, 93%, 55%); font-weight: bold;");
  }
  use(t, r) {
    return this.plugins.set(t, r), this;
  }
  mount(t) {
    const r = document.querySelector(t);
    if (!r) throw new Error(`>> [SONARCH] 404: Root element ${t} not found.`);
    this.plugins.has("router") && this.plugins.get("router").ignite(r);
  }
}
class E {
  constructor({ basePath: t = "" } = {}) {
    this.basePath = t, this.routes = [], this.currentParams = {}, this.currentQuery = {};
  }
  add(t, r) {
    const a = [];
    let e = t === "*" ? "^.*$" : "^" + t.replace(/:([^\/]+)/g, (o, n) => (a.push(n), "([^/]+)")) + "$";
    return this.routes.push({ regex: new RegExp(e), keys: a, viewFn: r }), this;
  }
  navigate(t) {
    const r = t === "/" ? this.basePath + "/" : this.basePath + t;
    window.history.pushState(null, "", r), this.resolve();
  }
  resolve() {
    const t = performance.now();
    let r = window.location.pathname;
    this.basePath && r.startsWith(this.basePath) && (r = r.replace(this.basePath, "") || "/");
    const a = new URLSearchParams(window.location.search);
    this.currentQuery = {};
    for (const [o, n] of a.entries()) this.currentQuery[o] = n;
    for (const o of this.routes) {
      const n = r.match(o.regex);
      if (n) {
        this.currentParams = {}, o.keys.forEach((c, l) => {
          n[l + 1] && (this.currentParams[c] = n[l + 1]);
        }), o.viewFn(this.currentParams, this.currentQuery);
        break;
      }
    }
    const e = performance.now();
    console.log(`%cPUMMM!!! \u{1F680} Esto fue veloz, recarga en: ${(e - t).toFixed(3)} ms \u{1F60E} \xA1Somos la ley!`, "color: #00f2ff; font-weight: bold; font-size: 13px; text-shadow: 0 0 8px rgba(0, 242, 255, 0.8);");
  }
  ignite() {
    window.addEventListener("popstate", () => this.resolve()), document.body.addEventListener("click", (t) => {
      const a = t.composedPath().find((e) => e.hasAttribute && e.hasAttribute("data-link"));
      a && (t.preventDefault(), this.navigate(a.getAttribute("href") || "/"));
    }), this.resolve(), console.log(">> [SONARCH ROUTER] \u26A1 %cPLUGIN IGNITED.", "color: rgb(208, 255, 0); font-weight: bold;");
  }
}
const L = `:host{display:block;width:100%;box-sizing:border-box}:root{--color-cyan: #00f2ff;--color-blue: #4facfe;--color-purple: #8b5cf6;--bg-base: #f8f9fa;--bg-surface: #ffffff;--text-main: #1e293b;--text-mut: #64748b;--grad-primary: linear-gradient(135deg, var(--color-purple), var(--color-blue));--sz-tn: clamp(.25rem, 1vw, .5rem);--sz-sm: clamp(.5rem, 2vw, .75rem);--sz-md: clamp(1rem, 3vw, 1.25rem);--sz-lg: clamp(1.5rem, 4vw, 2rem);--sz-xl: clamp(2rem, 5vw, 3rem);font-family:Inter,system-ui,sans-serif;color-scheme:light dark}[data-theme=dark]{--bg-base: #0a0a12;--bg-surface: #13161c;--text-main: #f0f4f8;--text-mut: #94a3b8;--grad-primary: linear-gradient(135deg, var(--color-blue), var(--color-cyan))}*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}body:before{content:"";position:fixed;inset:0;z-index:-2;background-color:color-mix(in srgb,var(--text-main) 5%,transparent);mask-image:url("data:image/svg+xml,%3Csvg width='60' height='103.9' viewBox='0 0 60 103.9' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0' stroke='%23000' stroke-width='1'/%3E%3Cpath d='M30 103.9l25.98-15v-30L30 43.9l-25.98 15v30z' fill-opacity='0' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E");mask-size:60px 103.9px;pointer-events:none}body{background-color:var(--bg-base);color:var(--text-main);min-height:100dvh;position:relative;overflow-x:hidden;overflow-y:auto;transition:background-color .4s ease,color .4s ease;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;scrollbar-width:none;-ms-overflow-style:none}body::-webkit-scrollbar{display:none}@keyframes pulse-network{0%{opacity:.5;transform:scale(1)}to{opacity:1;transform:scale(1.05)}}.fx{display:flex}.fx-col{flex-direction:column}.items-ctr{align-items:center}.just-ctr{justify-content:center}.just-btw{justify-content:space-between}.w-full{width:100%}.h-full{height:100%}.gap-tn{gap:var(--sz-tn)}.gap-sm{gap:var(--sz-sm)}.gap-md{gap:var(--sz-md)}.gap-lg{gap:var(--sz-lg)}.gap-xl{gap:var(--sz-xl)}.p-tn{padding:var(--sz-tn)}.p-sm{padding:var(--sz-sm)}.p-md{padding:var(--sz-md)}.p-lg{padding:var(--sz-lg)}.p-xl{padding:var(--sz-xl)}.txt-tn{font-size:clamp(.65rem,.8vw,.75rem)}.txt-sm{font-size:clamp(.75rem,1vw,.875rem)}.txt-md{font-size:clamp(.875rem,1vw + .5rem,1rem);text-wrap:pretty}.txt-lg{font-size:clamp(1.125rem,2vw + .5rem,1.25rem);text-wrap:balance}.txt-xl{font-size:clamp(2rem,5vw,4rem);text-wrap:balance;line-height:1.1;font-weight:800;letter-spacing:-.02em}.fw-bold{font-weight:700}.txt-ctr{text-align:center}.tc-main{color:var(--text-main)}.tc-mut{color:var(--text-mut)}.tc-grad{background:var(--grad-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.gls-panel{background:color-mix(in srgb,var(--bg-surface) 60%,transparent);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid color-mix(in srgb,var(--text-main) 10%,transparent);border-radius:var(--sz-md);box-shadow:0 8px 32px color-mix(in srgb,var(--text-main) 5%,transparent);transition:all .3s cubic-bezier(.16,1,.3,1)}.gls-panel.hover-fx:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--color-cyan) 30%,transparent);box-shadow:0 15px 40px color-mix(in srgb,var(--color-cyan) 10%,transparent)}.btn-core{background:var(--grad-primary);color:#fff;border:none;padding:var(--sz-sm) var(--sz-lg);border-radius:var(--sz-tn);font-weight:700;cursor:pointer;transition:all .2s ease}.btn-core:hover{transform:scale(1.02);filter:brightness(1.1);box-shadow:0 0 20px color-mix(in srgb,var(--color-cyan) 40%,transparent)}.btn-core:active{transform:scale(.98)}@keyframes fadeInSlide{0%{opacity:0;transform:translateY(20px);filter:blur(5px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}.anim-fade{animation:fadeInSlide .5s cubic-bezier(.16,1,.3,1) forwards}`, b = new CSSStyleSheet();
b.replaceSync(L);
function h(s) {
  let t = s;
  const r = /* @__PURE__ */ new Set();
  return { get value() {
    return t;
  }, set value(a) {
    const e = typeof a == "function" ? a(t) : a;
    e !== t && (t = e, r.forEach((o) => o(t)));
  }, subscribe: (a) => (r.add(a), a(t), () => r.delete(a)) };
}
const m = h("dark");
function i(s, t) {
  customElements.get(s) || customElements.define(s, class extends HTMLElement {
    constructor() {
      super(), this.attachShadow({ mode: "open" }), this._cleanupFns = [];
    }
    connectedCallback() {
      const r = {};
      for (let n of Array.from(this.attributes)) n.name.startsWith("attrs-") && (r[n.name.replace("attrs-", "")] = n.value);
      const { template: a, actions: e, setup: o } = t(r);
      if (this.shadowRoot && (this.shadowRoot.innerHTML = a, this.shadowRoot.adoptedStyleSheets = [b], e && this.shadowRoot.querySelectorAll("*").forEach((n) => {
        for (let c of Array.from(n.attributes)) if (c.name.startsWith("@")) {
          const l = c.name.substring(1), p = c.value;
          if (typeof e[p] == "function") {
            const g = (w) => e[p](w, n);
            n.addEventListener(l, g), n.removeAttribute(c.name), this._cleanupFns.push(() => {
              n.removeEventListener(l, g);
            });
          }
        }
      }), o && this.shadowRoot)) {
        const n = o(this.shadowRoot);
        typeof n == "function" && this._cleanupFns.push(n);
      }
    }
    disconnectedCallback() {
      this._cleanupFns.forEach((r) => r()), this._cleanupFns = [];
    }
  });
}
i("sn-dapp", () => ({ template: `
            <div class="sn-root-container">
                <slot></slot> 
            </div>
        `, setup: () => {
  console.log("[SONARCH] Capa de aplicaci\xF3n ra\xEDz montada y asegurada.");
} }));
i("sn-theme-toggle", () => {
  const s = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>', t = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  return { template: `
            <button class="p-2 rounded-full cursor-pointer bg-glass border-glass text-dark transition" id="theme-btn" style="background:transparent; border:none; color:var(--text-main);"></button>`, setup: (r) => {
    const a = r.querySelector("#theme-btn"), e = (n) => a.innerHTML = n === "dark" ? t : s, o = m.subscribe(e);
    return e(m.value), a.addEventListener("click", () => {
      m.value = m.value === "light" ? "dark" : "light", document.documentElement.setAttribute("data-theme", m.value);
    }), o;
  } };
});
i("sn-navbar", () => ({ template: `
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
                        <a href="/dashboard" data-link class="txt-sm fw-bold tc-mut hover-fx" style="text-decoration:none;">DASHBOARD</a>
                    </nav>
                    <div style="width: 1px; height: 20px; background: var(--text-mut); opacity: 0.3; margin: 0 var(--sz-sm);"></div>
                    <sn-theme-toggle></sn-theme-toggle>
                </div>
            </header>
        ` }));
const d = h(0);
i("sn-btn", (s) => ({ template: `
        <button class="btn-core w-full mt-4">
            <span id="texto">${d.value > 0 ? "CONECTADO" : s.text || "ACCI\xD3N"}</span> 
            <span class="txt-tn ml-2" style="opacity: 0.8; color: white;">
                [ Nodos: <span id="contador">${d.value}</span> ]
            </span>
        </button>
    `, setup: (t) => {
  const r = t.querySelector("button"), a = t.querySelector("#contador"), e = t.querySelector("#texto"), o = d.subscribe((n) => {
    a && (a.textContent = String(n));
  });
  return r && r.addEventListener("click", () => {
    !e || e.textContent === "CONECTANDO..." || (e.textContent = "CONECTANDO...", setTimeout(() => {
      e && (e.textContent = "CONECTADO"), d.value++;
    }, 400));
  }), o;
} }));
const x = { abeja: `
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
i("sn-card", (s) => {
  const t = (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" }), r = !s.type, a = s.title || "PULSO DEL ENJAMBRE", e = s.desc || "Nodos activos fortificando la red neuronal descentralizada. Presencia confirmada.", o = r ? d.value : s.value;
  return { template: `
            <div class="gls-panel p-lg fx fx-col items-ctr txt-ctr hover-fx h-full" style="width: 100%;">
                ${x[s.icon] || x.abeja}
                <h3 class="txt-md fw-bold tc-grad" style="margin-top: 1rem; text-transform: uppercase;">${a}</h3>
                <p class="txt-sm tc-mut" style="margin-top: 0.5rem; margin-bottom: 1.5rem; flex: 1;">${e}</p>
                
                <div class="fw-bold tc-main" style="font-size: 3.5rem; line-height: 1; text-shadow: 0 0 20px color-mix(in srgb, var(--color-cyan) 40%, transparent);">
                    <span ${r ? 'id="nodo-display"' : ""}>${o}</span>
                </div>
                
                <div class="txt-tn tc-mut" style="margin-top: 1.5rem; opacity: 0.7; letter-spacing: 0.1em; text-transform: uppercase;">
                    ${t}
                </div>
            </div>
        `, setup: (c) => {
    if (r) {
      const l = c.querySelector("#nodo-display");
      if (l) return l.textContent = String(d.value), d.subscribe((p) => l.textContent = String(p));
    }
  } };
});
const u = h({ name: "Develorian", rank: "Developer", tokens: 1e6 });
i("sn-dashboard", () => ({ template: `
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
        `, actions: { mineToken: (s, t) => {
  const r = u.value;
  u.value = { ...r, tokens: r.tokens + 100 }, t.style.transform = "scale(0.95)", setTimeout(() => t.style.transform = "scale(1)", 100);
}, updateTokens: (s, t) => {
  t.querySelector("#tokens").textContent = u.value.tokens;
}, lockNode: (s, t) => alert("Nodo encriptado y bloqueado") }, setup: (s) => {
  const t = s.querySelector("#token-display"), r = s.querySelector(".rank-badge");
  return u.subscribe((e) => {
    t.textContent = e.tokens.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), r.textContent = e.rank;
  });
} }));
i("sn-base-layout", () => ({ template: `
            <div class="fx fx-col min-h-screen">
                <sn-navbar></sn-navbar>
                <div class="content-area p-md fx fx-col items-ctr" style="flex: 1; padding-bottom: 4rem;">
                    <slot></slot> 
                </div>
            </div>
        ` }));
const C = `
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
i("sn-home", () => ({ template: `
            <div class="fx items-ctr just-ctr w-full anim-fade" style="height: 100%;">
                <section class="fx fx-col items-ctr txt-ctr gap-lg" style="max-width: 600px; margin: 0 auto;">
                    ${C}
                    <h2 class="txt-xl fw-bold tc-main">LA WEB SOBERANA</h2>
                    <p class="txt-md tc-mut">
                        Construyendo sistemas resilientes, post-cu\xE1nticos y sin intermediarios. 
                        El poder ha vuelto a los nodos.
                    </p>
                    <sn-btn attrs-text="CONECTAR AL ENJAMBRE"></sn-btn>
                </section>
            </div>
        ` }));
i("sn-swarm", () => ({ template: `
            <div class="fx items-ctr just-ctr w-full anim-fade" style="min-height: calc(100vh - 120px);">
                <section class="fx fx-col just-ctr items-ctr gap-xl" style="width: 100%; max-width: 1200px;">
                    
                    <div class="fx fx-col txt-ctr items-ctr" style="margin-top: 2rem;">
                        <h2 class="fw-bold tc-main tracking-widest" style="font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; margin: 0;">MONITOREO</h2>
                        <div style="height: 4px; width: 80px; background: var(--grad-primary); margin-top: 1.5rem; border-radius: 2px;"></div>
                        <p class="tc-mut txt-md" style="max-width: 600px; margin-top: 1.5rem;">
                            Red neuronal desplegada. Nodos sincronizados y operando bajo consenso distribuido.
                        </p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 3fr)); gap: var(--sz-lg); width: 100%; align-items: stretch;">
                        <sn-card></sn-card>
                        <sn-card 
                            attrs-type="server" 
                            attrs-icon="servidor" 
                            attrs-title="NODO BETA (ARCH)" 
                            attrs-desc="Servidor de bases de datos. KVM2 Activo." 
                            attrs-value="UP">
                        </sn-card>
                        <sn-card 
                            attrs-type="web" 
                            attrs-icon="red" 
                            attrs-title="LATENCIA DE RED" 
                            attrs-desc="Tiempo de respuesta P2P estimado." 
                            attrs-value="12ms">
                        </sn-card>
                    </div>

                    <div class="txt-ctr mt-4" style="margin-top: 1rem;">
                    
                    <!-- Agregamos par de combinaciones de b\xFAsquedas, para probar rutas con querys-->
                    <div class="fx gap-md mt-4 just-ctr" style="margin-top: 2rem;">
                        <a href="/busqueda?q=Criptografia" data-link class="btn-core" style="text-decoration: none;">Buscar Cripto</a>
                        
                        <a href="/busqueda?q=Redes+Mesh&filtro=Militares" data-link class="btn-core" style="text-decoration: none;">Buscar Redes (Con Filtro)</a>
                    </div>

                    <div class="txt-ctr mt-4" style="margin-top: 1rem;">
                    <a href="/nodo/777" data-link class="txt-md fw-bold tc-cyan hover-fx">>> INSPECIONAR NODO 777 <<</a>
                    </div>

                </section>
            </div>
        ` }));
i("sn-node", (s) => ({ template: `
            <div class="fx items-ctr just-ctr w-full anim-fade" style="min-height: calc(100vh - 120px);">
                <div class="gls-panel p-xl txt-ctr fx fx-col items-ctr" style="max-width: 400px;">
                    
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--grad-primary); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                        <span class="txt-xl fw-bold" style="color: white;">${s.id || "Desconocido"}</span>
                    </div>
                    
                    <h2 class="txt-lg fw-bold tc-main tracking-widest">PERFIL DEL NODO</h2>
                    <p class="tc-mut txt-sm mt-2" style="margin-bottom: 2rem;">
                        Est\xE1s viendo la informaci\xF3n din\xE1mica del nodo aislado. La ruta ha inyectado el par\xE1metro de forma nativa.
                    </p>

                    <a href="/enjambre" data-link class="btn-core" style="text-decoration: none;">VOLVER AL ENJAMBRE</a>
                </div>
            </div>
        ` }));
i("sn-search", (s) => {
  const t = s.q || "B\xFAsqueda vac\xEDa", r = s.filtro || "Todos";
  return { template: `
            <div class="fx items-ctr just-ctr w-full anim-fade" style="min-height: calc(100vh - 120px);">
                <div class="gls-panel p-xl txt-ctr fx fx-col items-ctr" style="max-width: 500px;">
                    
                    <h2 class="txt-lg fw-bold tc-main tracking-widest">RESULTADOS DE B\xDASQUEDA</h2>
                    
                    <div class="fx gap-md mt-4" style="margin: 1.5rem 0; width: 100%; justify-content: center;">
                        <div class="p-sm" style="border: 1px solid var(--color-cyan); border-radius: var(--sz-sm);">
                            <span class="tc-mut txt-sm">T\xE9rmino (?q=):</span><br>
                            <span class="tc-main fw-bold txt-md">${t}</span>
                        </div>
                        <div class="p-sm" style="border: 1px solid var(--color-purple); border-radius: var(--sz-sm);">
                            <span class="tc-mut txt-sm">Filtro (?filtro=):</span><br>
                            <span class="tc-main fw-bold txt-md">${r}</span>
                        </div>
                    </div>

                    <p class="tc-mut txt-sm">
                        Tu enrutador parse\xF3 los Query Parameters sin recargar la p\xE1gina.
                    </p>

                    <a href="/enjambre" data-link class="btn-core mt-4" style="text-decoration: none; margin-top: 1.5rem;">VOLVER</a>
                </div>
            </div>
        ` };
});
const v = new k({ name: "SONARCH Node", version: "v0.2.0-alpha-MicroMotorJS-NakedF-Stable" }), M = "/sonarch-core", y = new E({ basePath: M }), f = document.querySelector("main") || document.querySelector("sn-dapp");
y.add("/", () => {
  f.innerHTML = "<sn-home></sn-home>";
}).add("/enjambre", () => {
  f.innerHTML = "<sn-swarm></sn-swarm>";
}).add("/busqueda", () => {
  f.innerHTML = "<sn-search></sn-search>";
}).add("/dashboard", () => {
  f.innerHTML = `
            <sn-dashboard>
                <h2 slot="title">\u{1F30E} Global Command Center</h2>
            </sn-dashboard>
        `;
}).add("/nodo/:id", (s) => {
  f.innerHTML = `<sn-node attrs-id="${s.id}"></sn-node>`;
}).add("*", () => {
  f.innerHTML = '<h2 style="color: red; text-align: center;">404 - Node Not Found</h2>';
});
v.use("router", y);
v.mount("sn-dapp");
console.log(">> [SONARCH CORE]: \u2705 %cINICIADO CORRECTAMENTE", "color: rgb(208, 255, 0); font-weight: bold;");

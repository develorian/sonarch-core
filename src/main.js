// src/main.js
// GLOBAL STYLES (Carga en RAM)
import "/src/css/global.css"; // No borrar -> Agrega los estilos

// CORE & INFRAESTRUCTURE
import { DApp } from "/src/core/DApp.js";
import { Router } from "/src/core/router.js";

// UI COMPONENTS REGISTRATION: Side-effect imports (Registra los CustomElements)
import "/src/ui/components/App.js"; // <- Nueva ruta implementada para validación de rutas Query.
import "/src/ui/components/Navbar.js";
import "/src/ui/components/Button.js";
import "/src/ui/components/Card.js";
import "/src/ui/components/ThemeToggle.js";

// UI LAYOUTS REGISTRATION
import '/src/ui/layouts/Dashboard.js';
import "/src/ui/layouts/BaseLayout.js";

// UI VIEWS REGISTRATION:
import "/src/ui/views/Home.js";
import "/src/ui/views/Swarm.js";
import "/src/ui/views/Node.js";
import "/src/ui/views/Search.js";

// SYSTEM IGNITION
// Instanciar la DApp
const dapp = new DApp({ name: 'SONARCH Node', version: 'v0.2.0-alpha-MicroMotorJS-NakedF-Stable' });

// Instanciar el Router Plugin (Ajusta basePath si suber a GitHub Pages = 'sonarch-core')
// ⚡ INTERRUPTOR INTELIGENTE: Vite lo cambia automáticamente.
const currentBasePath = import.meta.env.DEV ? '' : '/sonarch-core/';

// Instanciar el Router Plugin con la ruta dinámica
const router = new Router({ basePath: currentBasePath });
const rootOutlet = document.querySelector('main') || document.querySelector('sn-dapp');

// Registrar Rutas (Nueva sintaxis: inyectar el componente en el root)
// C. Registrar las Rutas del Router
// El Router inyectará las etiquetas HTML en el DOM principal
router
    .add('/', () => {
        rootOutlet.innerHTML = `<sn-home></sn-home>`;
    })
    .add('/enjambre', () => { // Ruta en español para el swarm
        rootOutlet.innerHTML = `<sn-swarm></sn-swarm>`;
    })
    .add('/busqueda', () => {
        rootOutlet.innerHTML = `<sn-search></sn-search>`;
    })
    .add('/dashboard', () => {
        rootOutlet.innerHTML = `
            <sn-dashboard>
                <h2 slot="title">🌎 Global Command Center</h2>
            </sn-dashboard>
        `;
    })
    .add('/nodo/:id', (params) => {
        rootOutlet.innerHTML = `<sn-node attrs-id="${params.id}"></sn-node>`;
    })
    .add('*', () => { // Fallback de seguridad (404)
        rootOutlet.innerHTML = `<h2 style="color: red; text-align: center;">404 - Node Not Found</h2>`;
    });


// Conectar plugins y arrancar el motor
dapp.use('router', router);
dapp.mount('sn-dapp');

// Mensaje de verificación
console.log(">> [SONARCH CORE]: ✅ INICIADO CORRECTAMENTE");
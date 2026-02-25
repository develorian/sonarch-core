import { Router } from './core/router.js';

// Importar todos los nodos visuales
import './ui/layouts/layout-base.js';
import './ui/views/view-enjambre.js';
import './ui/views/view-home.js';
import './ui/components/sonarch-navbar.js';

// Registrar Rutas
Router.Route('/', 'layout-base', 'view-home');
Router.Route('/enjambre', 'layout-base', 'view-enjambre');



// Ejecutar directamente (Sin esperar a DOMContentLoaded)
Router.render();
console.log(">> SONARCH CORE: INICIADO CORRECTAMENTE");
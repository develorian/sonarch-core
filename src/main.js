// src/main.js
import "/src/css/global.css"; // No borrar -> Agrega los estilos a tus views

// IMPORTAR Router DEL router.js
import { Router } from "/src/core/router.js";

// IMPORTAR LA DIRECCIÓN (PATH) DE LAS RUTAS DE TU DWPA:
import "/src/ui/components/sonarch-app.js";
import "/src/ui/layouts/layout-base.js";
import "/src/ui/components/sonarch-navbar.js";
import "/src/ui/views/view-home.js";
import "/src/ui/views/view-enjambre.js";
import "/src/ui/views/view-nodo.js";
import "/src/ui/views/view-busqueda.js"; // <- Nueva ruta implementada para validación de rutas Query.

// AGREGAR RUTAS AQUÍ:
Router.add('/', 'view-home');
Router.add('/enjambre', 'view-enjambre');
Router.add('/nodo/:id', 'view-nodo');
Router.add('/busqueda', 'view-busqueda');

Router.resolve();

// COMPROBACIÓN DE INICIO POR CONSOLA:
console.log(">> SONARCH CORE: INICIADO CORRECTAMENTE");
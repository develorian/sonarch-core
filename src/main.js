// src/main.js
import "/src/css/global.css";

import { Router } from "/src/core/router.js";

import "/src/ui/components/sonarch-app.js";
import "/src/ui/layouts/layout-base.js";
import "/src/ui/components/sonarch-navbar.js";
import "/src/ui/views/view-home.js";
import "/src/ui/views/view-enjambre.js";
import "/src/ui/views/view-nodo.js";

// Si faltaba un punto y coma arriba, esto fallaba. Ahora está asegurado.
Router.add('/', 'view-home');
Router.add('/enjambre', 'view-enjambre');
Router.add('/nodo/:id', 'view-nodo');

Router.resolve();

console.log(">> SONARCH CORE: INICIADO CORRECTAMENTE");
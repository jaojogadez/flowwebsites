/**
 * index.js – Flow Web Sites
 * Ponto de entrada JS (type="module")
 * Importa e inicializa todos os módulos da aplicação.
 */

import { initNavbar } from './navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
});
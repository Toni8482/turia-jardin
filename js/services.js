
import { initCTAs } from './modules/ctas.js';
import { safeInit } from './modules/safeInit.js';


async function initApp() {
  try {

    safeInit(initCTAs, 'ctas');

  } catch (error) {
    console.error('Error inicializando la aplicación:', error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);

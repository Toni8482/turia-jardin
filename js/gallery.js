
import { initModal } from './modules/modal.js';
import { safeInit } from './modules/safeInit.js';


async function initApp() {
  try {
    safeInit(initModal, 'modal');

  } catch (error) {
    console.error('Error inicializando la aplicación:', error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);

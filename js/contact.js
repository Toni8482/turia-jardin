
import { initContactForm } from './modules/contactForm.js';
import { safeInit } from './modules/safeInit.js';

async function initApp() {
  try {
   
    safeInit(initContactForm, 'contactForm');

  } catch (error) {
    console.error('Error inicializando la aplicación:', error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);

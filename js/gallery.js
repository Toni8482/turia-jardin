
import { initModal } from './modules/modal.js';


import { loadComponent } from './modules/loadComponents.js';
import { safeInit } from './modules/safeInit.js';

// Registrar ScrollTrigger si existe
if (
  typeof gsap !== 'undefined' &&
  typeof ScrollTrigger !== 'undefined'
) {
  gsap.registerPlugin(ScrollTrigger);
}

async function initApp() {
  try {
    // Cargar componentes comunes
    const base = document.body.dataset.base || '.';

    await loadComponent(
      '#header-container',
      `${base}/components/header.html`
    );

    await loadComponent(
      '#footer-container',
      `${base}/components/footer.html`
    );

     await loadComponent(
      '#btn-whatsapp',
      `${base}/components/btnWhatsApp.html`
    );
     await loadComponent(
      '#btn-scroll-top',
      `${base}/components/btnScrollTop.html`
    );

      await loadComponent(
      '#cta-container',
      `${base}/components/cta.html`
    );

   safeInit(initPreloader, 'preloader');





safeInit(initModal, 'modal');



  } catch (error) {
    console.error('Error inicializando la aplicación:', error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);

// Refrescar ScrollTrigger cuando todo esté cargado

/** */
window.addEventListener('load', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});
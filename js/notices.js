import { initPreloader } from './modules/preloader.js';
import { initProgressBar } from './modules/progressBar.js';

import { initReveal } from './modules/reveal.js';

import { initLightbox } from './modules/lightbox.js';
import { initHeaderShrink } from './modules/headerShrink.js';
import { initMobileMenu } from './modules/mobileMenu.js';

import { initCTAs } from './modules/ctas.js';
import { initTheme } from './modules/theme.js';

import { initScrollTop } from './modules/scrollTop.js';

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
safeInit(initProgressBar, 'progressBar');

safeInit(initReveal, 'reveal');

safeInit(initLightbox, 'lightbox');

safeInit(initHeaderShrink, 'headerShrink');
safeInit(initMobileMenu, 'mobileMenu');
safeInit(initTheme, 'theme');

safeInit(initScrollTop, 'scrollTop');

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
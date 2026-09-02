import { initPreloader } from './modules/preloader.js';
import { initReveal } from './modules/reveal.js';

import { initLightbox } from './modules/lightbox.js';

import { initMobileMenu } from './modules/mobileMenu.js';

import { initTheme } from './modules/theme.js';
import { initMagneticButtons } from './modules/magneticButtons.js';

import { initHeaderShrink } from './modules/headerShrink.js';
import { initScrollTop } from './modules/scrollTop.js';

import { safeInit } from './modules/safeInit.js';
import { loadComponent } from './modules/loadComponents.js';
import { initProgressBar } from './modules/progressBar.js';
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
safeInit(initReveal, 'reveal');

safeInit(initLightbox, 'lightbox');


safeInit(initMobileMenu, 'mobileMenu');
safeInit(initTheme, 'theme');

safeInit(initHeaderShrink, 'headerShrink');
safeInit(initMagneticButtons, 'magneticButtons');


safeInit(initScrollTop, 'scrollTop');
safeInit(initProgressBar, 'progressBar');



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



  const lenis = new Lenis({
    duration: 1.1,       // suavidad de frenada
    smoothWheel: true,   // rueda del ratón suave
    wheelMultiplier: 1,  // velocidad
    touchMultiplier: 1.5
});


function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

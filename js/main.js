
import { initModal } from './modules/modal.js';
import { initCTAs } from './modules/ctas.js';
import {
  initParallaxHero,// initParallaxServicesAAV
} from './modules/parallaxHero.js';
import {
  initBeforeAfterLazy, initBeforeAfterResize
} from './modules/beforeAfterSplit.js';
import { initSwipers } from './modules/swipers.js';
import { initFaq } from './modules/faq.js';
import { safeInit } from './modules/safeInit.js';
import { initTextRotator } from './modules/textRotator.js';
import { initReviewsGoogle } from './modules/reviewsGoogle..js';
// Registrar ScrollTrigger si existe
if (
  typeof gsap !== 'undefined' &&
  typeof ScrollTrigger !== 'undefined'
) {
  gsap.registerPlugin(ScrollTrigger);
}

async function initApp() {
  try {
   
    safeInit(initTextRotator, 'textRotator');
    safeInit(initReviewsGoogle, 'reviewsGoogle');
    safeInit(initModal, 'modal');
    safeInit(initCTAs, 'ctas');
    safeInit(initParallaxHero, 'parallaxHero');
    safeInit(initBeforeAfterLazy, 'beforeAfterLazy');
    safeInit(initBeforeAfterResize, 'beforeAfterResize');
    safeInit(initSwipers, 'swipers');
    safeInit(initFaq, 'faq');

  } catch (error) {
    console.error('Error inicializando la aplicación:', error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);

// Refrescar ScrollTrigger cuando todo esté cargado

window.addEventListener('load', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});
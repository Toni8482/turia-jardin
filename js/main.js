import { initPreloader } from './modules/preloader.js';
import { initProgressBar } from './modules/progressBar.js';
import { initTypewriter } from './modules/typewriter.js';
import { initReveal } from './modules/reveal.js';
import { initCounters } from './modules/counters.js';
import { initLightbox } from './modules/lightbox.js';
import { initHeaderShrink } from './modules/headerShrink.js';
import { initMobileMenu } from './modules/mobileMenu.js';
import { initModal } from './modules/modal.js';
import { initCTAs } from './modules/ctas.js';
import { initTheme } from './modules/theme.js';
import { initMagneticButtons } from './modules/magneticButtons.js';
import { initGsapAnimations } from './modules/gsapAnimations.js';
import { initParallaxHero } from './modules/parallaxHero.js';
import { initBeforeAfterSplit } from './modules/beforeAfterSplit.js';
import { initSwipers } from './modules/swipers.js';
import { initScrollTop } from './modules/scrollTop.js';
import { initContactForm } from './modules/contactForm.js';
import { initFaq } from './modules/faq.js';
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
safeInit(initTypewriter, 'typewriter');
safeInit(initReveal, 'reveal');
safeInit(initCounters, 'counters');
safeInit(initLightbox, 'lightbox');

safeInit(initHeaderShrink, 'headerShrink');
safeInit(initMobileMenu, 'mobileMenu');
safeInit(initTheme, 'theme');

safeInit(initModal, 'modal');
safeInit(initCTAs, 'ctas');
safeInit(initMagneticButtons, 'magneticButtons');

safeInit(initGsapAnimations, 'gsapAnimations');
safeInit(initParallaxHero, 'parallaxHero');

safeInit(initBeforeAfterSplit, 'beforeAfterSplit');
safeInit(initSwipers, 'swipers');

safeInit(initScrollTop, 'scrollTop');

safeInit(initContactForm, 'contactForm');
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
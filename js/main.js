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

// Registrar ScrollTrigger si no está ya registrado (a veces es necesario)
gsap.registerPlugin(ScrollTrigger);

// Inicializar todos los módulos después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initProgressBar();
  initTypewriter();
  initReveal();
  initCounters();
  initLightbox();
  initHeaderShrink();
  initMobileMenu();
  initModal();
  initCTAs();
  initTheme();
  initMagneticButtons();
  initGsapAnimations();
  initParallaxHero();
  initBeforeAfterSplit();
  initSwipers();
  initScrollTop();
  initContactForm();
});

// Refrescar ScrollTrigger cuando todo el contenido esté cargado (imágenes, etc.)
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
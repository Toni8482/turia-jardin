export function initReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal-fade').forEach(el => revealObserver.observe(el));

  // También activar elementos ya visibles al cargar
  window.addEventListener('load', () => {
    document.querySelectorAll('.reveal-fade').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 80) {
        el.classList.add('revealed');
      }
    });
  });
}
export function initGsapAnimations() {
  // Tarjetas de servicios
  gsap.fromTo('.service-card', {
    opacity: 0,
    y: 35
  }, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.08,
    scrollTrigger: {
      trigger: '#servicesBrief',
      start: 'top 80%'
    }
  });

  // Módulos de detalle
  gsap.utils.toArray('.detail-module').forEach((mod, i) => {
    gsap.fromTo(mod, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: mod,
        start: 'top 85%'
      }
    });
  });
}
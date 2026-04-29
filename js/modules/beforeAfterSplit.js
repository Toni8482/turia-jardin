export function initBeforeAfterSplit() {
  if (document.querySelector('.ba-card')) {
    gsap.utils.toArray('.ba-card').forEach(card => {
      const antesImg = card.querySelector('.ba-image:first-child img');
      const despuesImg = card.querySelector('.ba-image:last-child img');
      if (antesImg && despuesImg) {
        gsap.to(antesImg, {
          x: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6
          }
        });
        gsap.to(despuesImg, {
          x: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6
          }
        });
      }
    });
  }
}
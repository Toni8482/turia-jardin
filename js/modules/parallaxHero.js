export function initParallaxHero() {
  gsap.to('.hero-bg', {
    yPercent: -9,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    }
  });

  gsap.to('.hero-content', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8
    }
  });
}
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

export function initParallaxServicesAAV() {

  
 /*
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

 const section = document.querySelector('.hero-services-aav');
 if (!section) return;
  section.style.backgroundPositionY = scroll * 1.5 + "px";
});

*/





  gsap.to('.hero-services-aav', {
  yPercent: -12,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-services-aav',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1
  }
});
}
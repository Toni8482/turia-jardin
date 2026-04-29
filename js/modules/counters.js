export function initCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  const startCounter = (c) => {
    const target = parseInt(c.dataset.target);
    let current = 0;
    const inc = target / 50;
    const update = () => {
      current += inc;
      if (current < target) {
        c.innerText = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        c.innerText = target;
      }
    };
    update();
  };

  counters.forEach(c => {
    const obs = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        startCounter(c);
        obs.unobserve(c);
      }
    }, { threshold: 0.5 });
    obs.observe(c);
  });
}
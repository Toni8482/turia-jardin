export function initCTAs() {
  const presupuestoBtn = document.getElementById('presupuestoBtn');
  const mainCta = document.getElementById('mainCta');
  const finalContactBtn = document.getElementById('finalContactBtn');

  if (presupuestoBtn) {
    presupuestoBtn.addEventListener('click', () => window.open('https://wa.me/34600987654', '_blank'));
  }
  if (mainCta) {
    mainCta.addEventListener('click', () => document.querySelector('#servicesBrief')?.scrollIntoView({ behavior: 'smooth' }));
  }
  if (finalContactBtn) {
    finalContactBtn.addEventListener('click', () => window.open('https://wa.me/34600987654', '_blank'));
  }
}
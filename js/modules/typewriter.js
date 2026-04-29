export function initTypewriter() {
  const phrases = ["Poda de palmeras", "Endoterapia avanzada", "Cuidado profesional", "Turia Jardín"];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;
  const typeEl = document.getElementById("typewriter");
  if (!typeEl) return;

  function typeEffect() {
    const current = phrases[phraseIdx];
    if (!isDeleting && charIdx <= current.length) {
      typeEl.innerHTML = current.substring(0, charIdx);
      charIdx++;
      setTimeout(typeEffect, isDeleting ? 40 : 100);
    } else if (isDeleting && charIdx >= 0) {
      typeEl.innerHTML = current.substring(0, charIdx);
      charIdx--;
      setTimeout(typeEffect, 35);
    } else if (!isDeleting && charIdx > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIdx < 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeEffect, 300);
    }
  }
  typeEffect();
}
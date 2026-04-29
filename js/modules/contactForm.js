export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('📩 Mensaje enviado. En breve nos pondremos en contacto.');
    form.reset();
  });
}
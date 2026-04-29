export function initPreloader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('preloader')?.classList.add('hidden');
    }, 300);
  });
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
  }, 3000);
}
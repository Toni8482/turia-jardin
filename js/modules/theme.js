export function initTheme() {
  const desktopBtn = document.getElementById('themeToggleDesktop');
  const mobileBtn = document.getElementById('themeToggleMobile');

  const buttons = [desktopBtn, mobileBtn].filter(Boolean);

  const applyTheme = (isLight) => {
    document.body.classList.toggle('light', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    buttons.forEach(btn => {
      btn.setAttribute('aria-pressed', isLight);
      btn.textContent = isLight ? '🌙' : '🌞';
    });
  };

  const isLight = localStorage.getItem('theme') === 'light';
  applyTheme(isLight);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(!document.body.classList.contains('light'));
    });
  });
}
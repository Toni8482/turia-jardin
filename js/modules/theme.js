export function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeToggle.textContent = '🌙';
  } else {
    themeToggle.textContent = '🌞';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', isLight);
    themeToggle.textContent = isLight ? '🌙' : '🌞';
  });
}
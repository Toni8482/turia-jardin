export function initMobileMenu() {
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');

  const themeButton = document.getElementById('themeToggleMobile');
  const themeSwitch = document.getElementById('themeSwitch');
  const themeIcon = themeButton?.querySelector('i');

  // Actualizar icono según el tema
  function updateThemeIcon() {
    if (!themeIcon || !themeSwitch) return;

    themeIcon.className = themeSwitch.checked
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';
  }

  // Botón de tema móvil
  if (themeButton && themeSwitch) {
    themeButton.addEventListener('click', () => {
      themeSwitch.click();
    });

    themeSwitch.addEventListener('change', updateThemeIcon);
    updateThemeIcon();
  }

  if (!menuIcon || !navLinks) return;

  // Abrir/cerrar menú hamburguesa
  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Cerrar submenús al cerrar el menú principal
    if (!navLinks.classList.contains('active')) {
      document.querySelectorAll('.has-submenu').forEach(parent => {
        parent.classList.remove('open');
      });
    }
  });

  // Submenú en móvil
  document.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 750) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', e => {
    const isClickInside =
      navLinks.contains(e.target) ||
      menuIcon.contains(e.target);

    if (!isClickInside) {
      navLinks.classList.remove('active');

      document.querySelectorAll('.has-submenu').forEach(parent => {
        parent.classList.remove('open');
      });
    }
  });

  // Cerrar menú al pulsar enlaces normales
  document
    .querySelectorAll('.nav-links > li:not(.has-submenu) > a')
    .forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');

        document.querySelectorAll('.has-submenu').forEach(parent => {
          parent.classList.remove('open');
        });
      });
    });
}
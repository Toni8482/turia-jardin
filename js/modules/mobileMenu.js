export function initMobileMenu() {
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');

  if (!menuIcon || !navLinks) return;

  // Abrir/cerrar hamburguesa
  menuIcon.onclick = () => {
    navLinks.classList.toggle('active');

    // cerrar submenus si se cierra el menú
    if (!navLinks.classList.contains('active')) {
      document.querySelectorAll('.has-submenu').forEach(parent => parent.classList.remove('open'));
    }
  };

  // Submenu clic en móvil
  const submenuParents = document.querySelectorAll('.has-submenu > a');
  submenuParents.forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    const isClickInside = navLinks.contains(e.target) || menuIcon.contains(e.target);
    if (!isClickInside) {
      navLinks.classList.remove('active');
      document.querySelectorAll('.has-submenu').forEach(parent => parent.classList.remove('open'));
    }
  });

  // Cerrar menú al tocar enlaces que no son submenu
  document.querySelectorAll('.nav-links > li > a:not(.has-submenu > a)').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      document.querySelectorAll('.has-submenu').forEach(parent => parent.classList.remove('open'));
    });
  });
}


export function initMobileMenu() {
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');
  if (!menuIcon || !navLinks) return;

  menuIcon.onclick = () => navLinks.classList.toggle('active');
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}
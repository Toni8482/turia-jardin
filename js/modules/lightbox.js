export function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');
  if (!lightbox) return;

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.onclick = () => lightbox.classList.remove('active');
  lightbox.onclick = (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  };
}
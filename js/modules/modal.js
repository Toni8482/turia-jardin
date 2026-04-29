export function initModal() {
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  if (!modal) return;

  function openModal(service) {
    modalTitle.innerText = service;
    modal.classList.add('active');
  }

  modalCloseBtn.onclick = () => modal.classList.remove('active');
  modalWhatsappBtn.onclick = () => window.open('https://wa.me/34600987654', '_blank');
  window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('active');
  };

  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const service = btn.getAttribute('data-service') || 'Servicio';
      openModal(service);
    });
  });
}
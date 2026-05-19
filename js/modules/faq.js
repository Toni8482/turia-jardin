export function initFaq() {
 const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  button.addEventListener("click", () => {
    if(item.classList.contains("active")) {
      // cerrar
      answer.style.maxHeight = null;
      item.classList.remove("active");
    } else {
      // abrir
      answer.style.maxHeight = answer.scrollHeight + "px";
      item.classList.add("active");
    }
  });
});
}
console.log("Hola mundo");

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carrusel");
  const slides = document.querySelectorAll(".carrusel img");

  let index = 0;

  setInterval(() => {
    index++;
    track.style.transition = "transform 1.8s ease-in-out";
    track.style.transform = `translateX(-${index * 100}%)`;

    if (index === slides.length - 1) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        index = 0;
      }, 2800);
    }
  }, 10000);

  const caja_i = document.querySelectorAll(".main-galery-i");

  caja_i.forEach((element) => {
    window.addEventListener("scroll", () => {
      const posicion = element.getBoundingClientRect().top;
      const alturaPantalla = window.innerHeight;

      if (posicion < alturaPantalla - 100) {
        element.classList.add("activa");
      }
    });
  });

  const caja_d = document.querySelectorAll(".main-galery-d");

  caja_d.forEach((element) => {
    window.addEventListener("scroll", () => {
      const posicion = element.getBoundingClientRect().top;
      const alturaPantalla = window.innerHeight;

      if (posicion < alturaPantalla - 100) {
        element.classList.add("activa");
      }
    });
  });
});

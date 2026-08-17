export function initSwipers() {
  if (document.querySelector('.beforeafter-swiper')) {
    new Swiper('.beforeafter-swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      spaceBetween: 30,
      slidesPerView: 1
    });
  }

  if (document.querySelector('.clients-swiper')) {
    new Swiper('.clients-swiper', {
      loop: true,
      autoplay: {
        delay:0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      speed:8000,
      // IMPORTANTE: Esto evita saltos bruscos cuando las fotos entran a pantalla
   
      slidesPerView: 2,
      spaceBetween: 20,
        slidesPerGroup: 2,
      pagination: {
        el: '.clients-pagination',
        clickable: true
      },
     breakpoints: {
    480: {
        slidesPerView: 2,
        slidesPerGroup:2
    },

    768: {
        slidesPerView: 3,
        slidesPerGroup: 2
    },

    1024: {
        slidesPerView: 4,
        slidesPerGroup:2
    }
}
    });
  }
}
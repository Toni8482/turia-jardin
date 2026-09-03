import { initReveal } from './reveal.js';

export async function initReviewsGoogle() {
    const data = await getReviews();

    if (!data) return;

    createSummary(data);

     // ✅ Ordenar reseñas antes de crear las tarjetas
    const sortedReviews = sortReviewsByDate(data.reviews);

       
    // ✅ Filtrar reseñas con 3 o más estrellas
    const filteredReviews = filterReviewsByRating(sortedReviews, 4);
    
    createReviewCards(filteredReviews);
    initSwiperReviews();
    initReveal();
}

async function getReviews() {
    try {
        const response = await fetch("https://my-first-worker.turia-jardin.workers.dev/api/reviews");

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        return null;
    }
}

function createSummary(data) {
    const summary = document.getElementById("reviews-summary");

    summary.innerHTML = `
        <div class="rating">
            <div class="rating-stars">
                ★★★★★
            </div>
            <h2>${data.rating.toFixed(1).replace(".", ",")}</h2>
            <a
                class="google-button"
                href="https://www.google.com/maps/place/?q=place_id:ChIJz58WbjdPYA0R9eucw9qZ8HU"
                target="_blank"
                rel="noopener noreferrer">
                <img src="./assets/imagenes/logo_google.png" alt="Google logo" />
               
            </a>

            <p class="rating-count">
                <strong>${data.userRatingCount}</strong> reseñas verificadas
            </p>
           
        </div>
    `;
}

function createReviewCards(reviews) {
    const testimonialsGrid = document.getElementById('testimonials-grid');

    reviews.forEach((review, index) => {
        const testimonialCard = document.createElement('div');
        const stars = document.createElement('div');
        const testimonialsText = document.createElement('p');
        const testimonialsFooter = document.createElement('div');
        const testimonialsAvatar = document.createElement('div');
        const testimonialsAuthor = document.createElement('div');
        const testimonialsAuthorText = document.createElement('h3');
        const avatar = document.createElement('img');
        const logoGoogle = document.createElement('img');

        // Contenedor para el texto con el botón "Leer más"
        const textContainer = document.createElement('div');
        textContainer.className = 'testimonial-text-container';

        const textWrapper = document.createElement('div');
        textWrapper.className = 'testimonial-text-wrapper';

        // Contenedor para el texto (sin el botón)
        const textContentWrapper = document.createElement('div');
        textContentWrapper.className = 'testimonial-text-content';

        const readMoreBtn = document.createElement('button');
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.textContent = 'Leer más';
        readMoreBtn.setAttribute('aria-expanded', 'false');
        readMoreBtn.style.display = 'none';

        // Configurar avatar
        avatar.src = review.authorAttribution.photoUri || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(review.authorAttribution.displayName) + '&background=1a73e8&color=fff&size=48';
        avatar.alt = review.authorAttribution.displayName;
        avatar.className = 'testimonial-avatar-img';
        avatar.loading = 'lazy';
        testimonialsAvatar.appendChild(avatar);


          logoGoogle.src = './assets/imagenes/g_google.png';
        logoGoogle.alt = 'Logo google';
        logoGoogle.className = 'logo-google-img';
        logoGoogle.loading = 'lazy';
       

        // Configurar tarjeta
        testimonialCard.className = 'swiper-slide testimonial-card reveal-fade';
        testimonialCard.dataset.index = index;
        stars.className = 'stars';
        testimonialsText.className = 'testimonial-text';
        testimonialsFooter.className = 'testimonial-footer';
        testimonialsAvatar.className = 'testimonial-avatar';
        testimonialsAuthor.className = 'testimonial-author';

        // Crear estrellas
        const maxStars = Math.min(review.rating || 0, 5);
        for (let i = 0; i < maxStars; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.textContent = '★';
            stars.appendChild(star);
        }

        for (let i = maxStars; i < 5; i++) {
            const star = document.createElement('span');
            star.className = 'star empty';
            star.textContent = '☆';
            stars.appendChild(star);
        }

        // Texto del testimonio
        const textContent = review.originalText?.text || review.text || 'Sin texto disponible';
        testimonialsText.textContent = textContent;

        // Configurar autor y fecha
        testimonialsAuthorText.textContent = review.authorAttribution.displayName;
        const reviewDate = document.createElement('span');
        reviewDate.className = 'testimonial-date';
reviewDate.textContent = formatReviewDate(review);
        testimonialsAuthor.appendChild(testimonialsAuthorText);
        testimonialsAuthor.appendChild(reviewDate);

        // Ensamblar - El texto va dentro de textContentWrapper
        textContentWrapper.appendChild(testimonialsText);
        
        // El wrapper contiene: el texto + el botón (fuera del overflow)
        textWrapper.appendChild(textContentWrapper);
        textWrapper.appendChild(readMoreBtn); // El botón va DESPUÉS del contenido de texto
        
        textContainer.appendChild(textWrapper);

        testimonialsFooter.appendChild(testimonialsAvatar);
        testimonialsFooter.appendChild(testimonialsAuthor);
testimonialsFooter.appendChild(logoGoogle);
       
        testimonialCard.appendChild(testimonialsFooter);
        testimonialCard.appendChild(stars);
        testimonialCard.appendChild(textContainer);
       

        testimonialsGrid.appendChild(testimonialCard);

        // Configurar el "Leer más"
        setTimeout(() => {
            setupReadMore(testimonialCard, testimonialsText, textContentWrapper, textWrapper, readMoreBtn);
        }, 150);
    });
}

function setupReadMore(card, textElement, textContentWrapper, wrapper, button) {
    // Ocultar temporalmente para medir
    textContentWrapper.style.maxHeight = 'none';
    textContentWrapper.style.overflow = 'visible';
    
    const textHeight = textElement.scrollHeight;
    const computedStyle = getComputedStyle(textElement);
    const lineHeight = parseFloat(computedStyle.lineHeight) || 1.6;
    const maxLines = 4;
    const maxHeight = lineHeight * maxLines;
    
    // Restaurar estado inicial
    textContentWrapper.style.maxHeight = `${maxHeight}px`;
    textContentWrapper.style.overflow = 'hidden';
    
    // Añadir clase para los tres puntos
    textContentWrapper.classList.add('text-clamped');
    
    if (textHeight > maxHeight + 5) {
        button.style.display = 'inline-block';
        
        let isExpanded = false;

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            isExpanded = !isExpanded;

            if (isExpanded) {
                textContentWrapper.style.maxHeight = `${textHeight + 20}px`;  // Expandir
                this.textContent = 'Ocultar';
                this.setAttribute('aria-expanded', 'true');
                card.classList.add('expanded');
                textContentWrapper.classList.remove('text-clamped');
            } else {
                textContentWrapper.style.maxHeight = `${maxHeight}px`;  // Colapsar
                this.textContent = 'Leer más';
                this.setAttribute('aria-expanded', 'false');
                card.classList.remove('expanded');
                textContentWrapper.classList.add('text-clamped');
            }
        });

    } else {
        button.style.display = 'none';
        textContentWrapper.style.maxHeight = 'none';
        textContentWrapper.style.overflow = 'visible';
        textContentWrapper.classList.remove('text-clamped');
    }
}

function initSwiperReviews() {
    new Swiper(".reviews-swiper", {
        slidesPerView: 1.2,
        spaceBetween: 20,
        navigation: {
            nextEl: ".reviews-next",
            prevEl: ".reviews-prev",
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2.5,
            }
        }
    });
}

function formatReviewDate(review) {
    if (!review.publishTime) return 'Fecha no disponible';
    
    const date = new Date(review.publishTime);
    
    // Formato: "5 de mayo de 2026"
    return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}


function sortReviewsByDate(reviews) {
    // Crear una copia del array para no mutar el original
    return [...reviews].sort((a, b) => {
        // Si no tienen publishTime, ponerlos al final
        if (!a.publishTime) return 1;
        if (!b.publishTime) return -1;
        
        // Convertir a Date y comparar
        const dateA = new Date(a.publishTime);
        const dateB = new Date(b.publishTime);
        
        // Más reciente primero (orden descendente)
        return dateB - dateA;
    });
}

function filterReviewsByRating(reviews, minRating = 3) {
    if (!reviews || !Array.isArray(reviews)) return [];
    
    return reviews.filter(review => {
        const rating = review.rating || 0;
        return rating >= minRating;
    });
}
// ============================================================
// BEFORE/AFTER SLIDER - VERSIÓN PARA SWIPER
// Soporte táctil, escritorio y sincronización con Swiper
// ============================================================

export function initBeforeAfterSliders() {
    // Buscar todos los sliders dentro de la sección beforeafter
    const sliders = document.querySelectorAll('#beforeafter .ba-slider-wrapper');
    
    if (!sliders.length) {
        console.warn('⚠️ No se encontraron sliders .ba-slider-wrapper en #beforeafter');
        return;
    }
    
    console.log(`✅ Inicializando ${sliders.length} before/after sliders`);
    
    sliders.forEach((wrapper, index) => {
        // ===== OBTENER ELEMENTOS =====
        const input = wrapper.querySelector('.ba-slider-input');
        const beforeWrapper = wrapper.querySelector('.ba-image-before-wrapper');
        const line = wrapper.querySelector('.ba-slider-line');
        const handle = wrapper.querySelector('.ba-slider-handle');
        
        // ===== VALIDAR ELEMENTOS =====
        if (!input || !beforeWrapper || !line || !handle) {
            console.warn(`⚠️ Slider ${index}: faltan elementos necesarios`);
            return;
        }
        
        let isDragging = false;
        let touchId = null;
        
        // ===== FUNCIÓN DE ACTUALIZACIÓN =====
        function updateSlider(value) {
            const percent = Math.min(100, Math.max(0, parseFloat(value))) + '%';
            beforeWrapper.style.width = percent;
            line.style.left = percent;
            handle.style.left = percent;
        }
        
        // ===== OBTENER PORCENTAJE DESDE COORDENADA =====
        function getPercent(clientX, rect) {
            const x = (clientX - rect.left) / rect.width;
            return Math.min(100, Math.max(0, x * 100));
        }
        
        // ===== INICIALIZAR POSICIÓN =====
        function initialize() {
            const initialValue = parseFloat(input.value) || 50;
            input.value = initialValue;
            updateSlider(initialValue);
        }
        
        // ============================================================
        // EVENTOS DEL INPUT (RANGE)
        // ============================================================
        input.addEventListener('input', function(e) {
            updateSlider(this.value);
        });
        
        input.addEventListener('change', function() {
            updateSlider(this.value);
        });
        
        // ============================================================
        // CLIC EN EL WRAPPER (saltar a posición)
        // ============================================================
        wrapper.addEventListener('click', function(e) {
            // Si el clic es en el input, ya lo maneja el input
            if (e.target === input) return;
            
            const rect = this.getBoundingClientRect();
            const value = getPercent(e.clientX, rect);
            
            input.value = value;
            updateSlider(value);
        });
        
        // ============================================================
        // SOPORTE TÁCTIL (MEJORADO)
        // ============================================================
        wrapper.addEventListener('touchstart', function(e) {
            const touch = e.touches[0];
            if (!touch) return;
            
            // Si el touch es en el input, dejamos que lo maneje
            if (e.target === input) return;
            
            touchId = touch.identifier;
            const rect = this.getBoundingClientRect();
            const value = getPercent(touch.clientX, rect);
            
            input.value = value;
            updateSlider(value);
            isDragging = true;
            
            // Prevenir scroll
            e.preventDefault();
        }, { passive: false });
        
        wrapper.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            // Buscar el touch que inició el arrastre
            const touch = Array.from(e.touches).find(t => t.identifier === touchId);
            if (!touch) return;
            
            const rect = this.getBoundingClientRect();
            const value = getPercent(touch.clientX, rect);
            
            input.value = value;
            updateSlider(value);
            
            e.preventDefault();
        }, { passive: false });
        
        wrapper.addEventListener('touchend', function(e) {
            // Buscar el touch que terminó
            const touch = Array.from(e.changedTouches).find(t => t.identifier === touchId);
            if (touch) {
                isDragging = false;
                touchId = null;
            }
        }, { passive: true });
        
        wrapper.addEventListener('touchcancel', function() {
            isDragging = false;
            touchId = null;
        }, { passive: true });
        
        // ============================================================
        // HOVER EFFECT (solo escritorio)
        // ============================================================
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (!isTouchDevice) {
            wrapper.addEventListener('mouseenter', function() {
                handle.style.transform = 'translate(-50%, -50%) scale(1.15)';
                handle.style.boxShadow = '0 8px 35px rgba(0,0,0,0.5), 0 0 0 4px rgba(255,255,255,0.3)';
            });
            
            wrapper.addEventListener('mouseleave', function() {
                handle.style.transform = 'translate(-50%, -50%) scale(1)';
                handle.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 0 0 3px rgba(255,255,255,0.3)';
            });
        }
        
        // ============================================================
        // EVITAR QUE EL SWIPER INTERFIERA CON EL SLIDER
        // ============================================================
        wrapper.addEventListener('pointerdown', function(e) {
            // Si el usuario empieza a arrastrar en el slider, prevenir que Swiper lo capture
            if (e.target === input || e.target.closest('.ba-slider-handle')) {
                e.stopPropagation();
            }
        });
        
        // ===== INICIALIZAR =====
        initialize();
    });
}

// ============================================================
// INICIALIZACIÓN CON SWIPER (sincronización)
// ============================================================
export function initBeforeAfterWithSwiper() {
    // Esperar a que Swiper esté inicializado
    const swiperEl = document.querySelector('.beforeafter-swiper');
    if (!swiperEl) {
        console.warn('⚠️ No se encontró .beforeafter-swiper');
        return;
    }
    
    // Inicializar los sliders
    initBeforeAfterSliders();
    
    // Cuando Swiper cambia de slide, re-inicializar los sliders
    // (por si los sliders no se renderizaron correctamente)
    const swiperInstance = swiperEl.swiper;
    if (swiperInstance) {
        swiperInstance.on('slideChange', function() {
            // Pequeño delay para que el DOM se actualice
            setTimeout(() => {
                initBeforeAfterSliders();
            }, 100);
        });
    }
}

// ============================================================
// INICIALIZACIÓN CON INTERSECTION OBSERVER (rendimiento)
// ============================================================
export function initBeforeAfterLazy() {
    const section = document.querySelector('#beforeafter');
    
    if (!section) {
        console.warn('⚠️ No se encontró la sección #beforeafter');
        return;
    }
    
    let isInitialized = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isInitialized) {
                isInitialized = true;
                
                // Esperar a que Swiper esté listo
                setTimeout(() => {
                    initBeforeAfterWithSwiper();
                }, 300);
                
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    observer.observe(section);
    
    // Si la sección ya está visible, inicializar inmediatamente
    if (section.getBoundingClientRect().top < window.innerHeight) {
        setTimeout(() => {
            if (!isInitialized) {
                isInitialized = true;
                setTimeout(() => {
                    initBeforeAfterWithSwiper();
                }, 300);
                observer.disconnect();
            }
        }, 500);
    }
}

// ============================================================
// REINICIO EN RESIZE
// ============================================================
let resizeTimeout;

export function initBeforeAfterResize() {
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalcular posiciones
            document.querySelectorAll('#beforeafter .ba-slider-wrapper').forEach(wrapper => {
                const input = wrapper.querySelector('.ba-slider-input');
                const beforeWrapper = wrapper.querySelector('.ba-image-before-wrapper');
                const line = wrapper.querySelector('.ba-slider-line');
                const handle = wrapper.querySelector('.ba-slider-handle');
                
                if (input && beforeWrapper && line && handle) {
                    const value = parseFloat(input.value) || 50;
                    const percent = value + '%';
                    beforeWrapper.style.width = percent;
                    line.style.left = percent;
                    handle.style.left = percent;
                }
            });
        }, 250);
    }, { passive: true });
}

// ============================================================
// EXPORTAR TODO
// ============================================================
const beforeAfter = {
    init: initBeforeAfterLazy,
    initSliders: initBeforeAfterSliders,
    initWithSwiper: initBeforeAfterWithSwiper,
    initResize: initBeforeAfterResize
};

export default beforeAfter;

// ============================================================
// AUTO-INICIALIZACIÓN (si se usa como script normal)
// ============================================================
if (typeof window !== 'undefined' && !window._beforeAfterInited) {
    window._beforeAfterInited = true;
    
    const init = () => {
        initBeforeAfterLazy();
        initBeforeAfterResize();
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}
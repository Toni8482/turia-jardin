export function initTheme() {
    const toggle = document.getElementById('themeSwitch');
    
    if (!toggle) return;

    // ========================================
    // APLICAR TEMA
    // ========================================
    const applyTheme = (isLight) => {
        document.body.classList.toggle('light', isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggle.checked = !isLight; // Sincronizar el toggle
    };

    // ========================================
    // CARGAR TEMA GUARDADO
    // ========================================
    const isLight = localStorage.getItem('theme') === 'light';
    applyTheme(isLight);

    // ========================================
    // EVENTO DEL TOGGLE
    // ========================================
    toggle.addEventListener('change', () => {
        const isLight = !toggle.checked; // checked = dark mode
        applyTheme(isLight);
    });

    // ========================================
    // (OPCIONAL) SISTEMA PREFERIDO DEL USUARIO
    // ========================================
    // Si no hay tema guardado, usar preferencia del sistema
    if (!localStorage.getItem('theme')) {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(prefersLight);
    }

    // Escuchar cambios en preferencia del sistema
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });
}
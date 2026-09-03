export function initTheme() {
    const toggle = document.getElementById('themeSwitch');
    if (!toggle) return;

    const mediaQuery = window.matchMedia(
        '(prefers-color-scheme: light)'
    );

    const applyTheme = (isLight, save = true) => {
        document.documentElement.classList.toggle('light', isLight);

        if (save) {
            localStorage.setItem(
                'theme',
                isLight ? 'light' : 'dark'
            );
        }

        toggle.checked = !isLight;
    };

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        applyTheme(true, false);
    } else if (savedTheme === 'dark') {
        applyTheme(false, false);
    } else {
        applyTheme(mediaQuery.matches, false);
    }

    toggle.addEventListener('change', () => {
        applyTheme(!toggle.checked);
    });

    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches, false);
        }
    });
}
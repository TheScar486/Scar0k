// C:\Users\Usuario\Desktop\Proyecto 2\Osell\apps\account\static\js\home\theme-switcher.js

document.addEventListener('DOMContentLoaded', () => {
    const themeLink = document.getElementById('theme-link');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const themeIcon = themeToggleButton.querySelector('i');

    const darkThemeRelativePath = '/static/css/home_oscuro.css';
    const lightThemeRelativePath = '/static/css/home_claro.css';

    const saveThemePreference = (theme) => {
        localStorage.setItem('websiteTheme', theme);
    };

    const loadThemePreference = () => {
        return localStorage.getItem('websiteTheme');
    };

    const applyTheme = (theme, animateIcon = true) => { // Added animateIcon parameter
        if (animateIcon) {
            themeIcon.classList.add('fade-out');
        }

        setTimeout(() => {
            if (theme === 'dark') {
                themeLink.href = darkThemeRelativePath;
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else { // theme === 'light'
                themeLink.href = lightThemeRelativePath;
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }

            if (animateIcon) {
                themeIcon.classList.remove('fade-out');
                themeIcon.classList.add('fade-in');
                setTimeout(() => {
                    themeIcon.classList.remove('fade-in');
                }, 300);
            }
            
            saveThemePreference(theme);

            // --- ¡IMPORTANTE! Disparar un evento para que hero-canvas.js sepa que el tema cambió ---
            // Esto es más fiable que el MutationObserver en algunos casos
            const event = new CustomEvent('themeChanged');
            document.dispatchEvent(event);

        }, animateIcon ? 300 : 0); // Delay only if animating, else immediate
    };

    // Al cargar la página, establece el estado inicial del icono correctamente
    const savedTheme = loadThemePreference();
    if (savedTheme) {
        // Aplica el tema guardado sin animación al cargar la página
        applyTheme(savedTheme, false); // Pass false for animateIcon on initial load
    } else {
        // Si no hay preferencia, usa el tema por defecto que está cargado en el HTML
        const initialTheme = themeLink.href.includes(darkThemeRelativePath) ? 'dark' : 'light';
        applyTheme(initialTheme, false); // Pass false for animateIcon on initial load
    }

    // Asegura que el icono inicial no tiene clases de animación
    themeIcon.classList.remove('fade-out', 'fade-in');

    // Event listener para el botón
    themeToggleButton.addEventListener('click', () => {
        if (themeLink.href.includes(darkThemeRelativePath)) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    });
});
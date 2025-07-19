// C:\Users\Usuario\Desktop\Proyecto 2\Osell\apps\account\static\js\home\theme-switcher.js

document.addEventListener('DOMContentLoaded', () => {
    const themeLink = document.getElementById('theme-link');
    const themeToggleButton = document.getElementById('theme-toggle-button');

    const darkThemeRelativePath = '/static/css/home_oscuro.css';
    const lightThemeRelativePath = '/static/css/home_claro.css';

    const saveThemePreference = (theme) => {
        localStorage.setItem('websiteTheme', theme);
    };

    const loadThemePreference = () => {
        return localStorage.getItem('websiteTheme');
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            themeLink.href = darkThemeRelativePath;
            document.body.classList.add('dark-mode');
        } else {
            themeLink.href = lightThemeRelativePath;
            document.body.classList.remove('dark-mode');
        }

        saveThemePreference(theme);

        // Notifica al resto del sistema que el tema cambió
        const event = new CustomEvent('themeChanged');
        document.dispatchEvent(event);
    };

    // Cargar preferencia guardada o usar la actual del href
    const savedTheme = loadThemePreference();
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const initialTheme = themeLink.href.includes(darkThemeRelativePath) ? 'dark' : 'light';
        applyTheme(initialTheme);
    }

    // Listener para alternar entre temas
    themeToggleButton.addEventListener('click', () => {
        const isCurrentlyDark = themeLink.href.includes(darkThemeRelativePath);
        applyTheme(isCurrentlyDark ? 'light' : 'dark');
    });
});

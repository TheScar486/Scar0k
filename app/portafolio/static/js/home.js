document.addEventListener('DOMContentLoaded', () => {
    // Pequeño script para simular la animación al cargar la página.
    // En un proyecto real, se usaría Intersection Observer para detectar cuando los elementos entran en la vista
    // y añadir dinámicamente la clase 'in-view'.

    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Función para añadir la clase 'in-view' cuando el elemento está en el viewport
    const checkVisibility = () => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Comprueba si el elemento está visible al menos parcialmente
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('in-view');
            } else {
                // Opcional: Si quieres que la animación se reinicie al salir de la vista
                // el.classList.remove('in-view');
            }
        });
    };

    // Ejecuta la función al cargar la página y al hacer scroll
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility); // Por si cambia el tamaño de la ventana
    checkVisibility(); // Ejecuta una vez al cargar para los elementos que ya son visibles
});

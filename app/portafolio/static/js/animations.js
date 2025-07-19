document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card.scroll-zoom-card');

    const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        // Cambiamos el threshold para que sea un solo valor pequeño o un array
        // Si es 0, detecta en cuanto un pixel del elemento es visible/invisible.
        // Si es un array, se activa en cada porcentaje.
        threshold: 0.05 // <-- AJUSTE CLAVE AQUÍ: Detecta la entrada/salida muy rápidamente (cuando el 5% es visible)
        // Opcional, para un control más fino: threshold: [0, 0.25, 0.5, 0.75, 1] y CSS más complejo.
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento entra al viewport (o sigue dentro)
                entry.target.classList.add('is-visible');
            } else {
                // Si el elemento sale del viewport (o empieza a salir)
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        observer.observe(card);
    });

    // OPTIMIZACIÓN INICIAL: Asegurarse de que los elementos visibles al cargar ya tengan la clase
    // Esto evita un "parpadeo" inicial si el JS se carga después del renderizado.
    // Esto se ejecutará una vez al cargar la página
    const initialCheckObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Una vez que se ha comprobado la visibilidad inicial, ya no necesitamos este observador para este elemento
                initialCheckObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Un umbral bajo para la comprobación inicial

    featureCards.forEach(card => {
        initialCheckObserver.observe(card);
    });
});
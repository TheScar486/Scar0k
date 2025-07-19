document.addEventListener('DOMContentLoaded', () => {
    const zoomCards = document.querySelectorAll('.scroll-zoom-card');

    const animateZoomCard = () => {
        zoomCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calcular el punto medio de la tarjeta en relación con el viewport
            const cardCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;

            // Determinar qué tan lejos está el centro de la tarjeta del centro del viewport
            // Un valor de 0 significa que la tarjeta está en el centro.
            // Valores positivos/negativos indican si está por encima/debajo del centro.
            let distance = cardCenter - viewportCenter;

            // Normalizar la distancia a un valor entre -1 y 1 (o similar)
            // Esto nos ayuda a controlar la intensidad de la animación
            // Ajusta el divisor (ej: 300) para cambiar la sensibilidad del zoom/movimiento
            const normalizedDistance = distance / (viewportHeight / 2); 

            let scale = 1;
            let translateY = 0;

            // Aplicar escala y traslación solo cuando la tarjeta está visible o cerca
            if (cardCenter > -rect.height && cardCenter < viewportHeight + rect.height) {
                // Cuanto más cerca del centro, más grande y menos desplazamiento
                // Ajusta los multiplicadores (ej: 0.1 para scale, 20 para translateY)
                // Para el zoom: si la distancia es grande (lejos del centro), la escala es menor.
                // Cuanto más cerca del centro (distancia cerca de 0), la escala se acerca a 1.
                scale = 1 - Math.abs(normalizedDistance * 0.15); // Factor de zoom
                scale = Math.max(0.9, Math.min(1.05, scale)); // Limita la escala entre 0.9 y 1.05

                // Para el efecto de paralaje: movimiento vertical sutil
                translateY = normalizedDistance * -15; // Mueve un poco la tarjeta
            }

            // Aplicar las transformaciones
            card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            card.style.opacity = Math.max(0.3, Math.min(1, 1 - Math.abs(normalizedDistance * 0.5))); // Opacidad suave
        });
    };

    // Escuchar el evento de scroll para actualizar la animación
    window.addEventListener('scroll', animateZoomCard);
    // Ejecutar una vez al cargar para establecer el estado inicial
    animateZoomCard(); 

    // Opcional: Para una animación inicial al cargar la página
    // Puedes mantener una simple animación de entrada si quieres que aparezcan al principio
    const initialObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    zoomCards.forEach(card => {
        card.style.transform = 'translateY(50px) scale(0.9)'; // Estado inicial fuera de vista
        card.style.opacity = '0';
        initialObserver.observe(card);
    });
});
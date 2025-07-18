// C:\Users\Usuario\Desktop\Proyecto 2\Osell\apps\account\static\js\home\hero-canvas.js

const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 100;
const maxDistance = 120;

let mouse = {
    x: null,
    y: null,
    radius: 150
};

// Variables para almacenar los colores de las partículas.
// No las inicializamos aquí, se obtendrán del CSS dinámicamente.
let particleDotColor;
let particleLineBaseColor;

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    createParticles();
    // No es necesario llamar updateParticleColors aquí.
    // Se llamará en el 'load' inicial y en el evento 'themeChanged'.
}

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

canvas.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
});

function createParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
                ctx.beginPath();
                // Aseguramos que particleLineBaseColor no sea null antes de usar substring
                // Fallback a un color seguro si es null/undefined
                const lineColor = particleLineBaseColor ? `${particleLineBaseColor.substring(0, particleLineBaseColor.lastIndexOf(','))}, ${1 - dist / maxDistance})` : 'rgba(255, 255, 255, 0)';
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    for (let i = 0; i < particles.length; i++) {
        ctx.beginPath();
        // Aseguramos que particleDotColor no sea null/undefined, con un fallback a blanco si es necesario.
        ctx.fillStyle = particleDotColor || '#ffffff';
        ctx.arc(particles[i].x, particles[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        p.vx *= 0.998;
        p.vy *= 0.998;

        const minSpeed = 0.1;
        if (Math.abs(p.vx) < minSpeed && Math.abs(p.vy) < minSpeed) {
            p.vx = (Math.random() - 0.5) * 0.8;
            p.vy = (Math.random() - 0.5) * 0.8;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                const angle = Math.atan2(dy, dx);

                p.vx += Math.cos(angle) * force * 0.2;
                p.vy += Math.sin(angle) * force * 0.2;
            }
        }
    }
}

function getCssVariable(variable) {
    // getComputedStyle devuelve los valores finales calculados después de aplicar todas las CSS
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

function updateParticleColors() {
    // Agregamos un pequeño setTimeout para darle al navegador tiempo para aplicar el nuevo CSS
    // antes de intentar leer las variables. 50-100ms suele ser suficiente.
    setTimeout(() => {
        // *** CAMBIO AQUÍ: LEEMOS LOS NOMBRES DE VARIABLES QUE SÍ EXISTEN EN TUS ROOT CSS ***
        particleDotColor = getCssVariable('--particle-color-dark');
        particleLineBaseColor = getCssVariable('--particle-line-color-dark');
        
        // ¡Importante! Forzar un re-dibujo para que los nuevos colores se apliquen inmediatamente
        drawParticles();
    }, 50); // Un pequeño delay de 50 milisegundos
}

function animate() {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animate);
}

// --- Inicialización y Manejo de Eventos ---

// 1. Al cargar completamente la ventana (incluyendo todos los recursos como CSS)
window.addEventListener('load', () => {
    resizeCanvas(); // Configura el tamaño del canvas y crea las partículas
    updateParticleColors(); // Obtiene y aplica los colores iniciales del tema actual
    animate(); // Inicia el loop de animación
});

// 2. Escuchar el evento personalizado 'themeChanged' desde theme-switcher.js
document.addEventListener('themeChanged', () => {
    updateParticleColors(); // Esto ahora invocará la función con el delay interno
});


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNavGroup = document.getElementById('mainNavGroup');
    const authButtons = document.getElementById('authButtons');
    const header = document.querySelector('header');

    if (menuToggle && mainNavGroup && authButtons && header) {
        menuToggle.addEventListener('click', function() {
            // Alternar la clase 'active' en los grupos de navegación
            mainNavGroup.classList.toggle('active');
            authButtons.classList.toggle('active');
            // Alternar una clase en el header para cambiar su diseño (apilar elementos)
            header.classList.toggle('menu-open');
        });
    }
});
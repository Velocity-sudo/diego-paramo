// ==========================================
// CONFIGURACIÓN - MODIFICAR ESTAS VARIABLES
// ==========================================

// Fecha y hora del webinar (MODIFICAR ESTA FECHA)
const webinarDate = new Date("Feb 15, 2026 19:00:00 GMT-0500").getTime();

// Total de plazas disponibles
const totalSpots = 50;

// Plazas ya registradas (ACTUALIZAR MANUALMENTE O INTEGRAR CON BACKEND)
let spotsRegistered = 0;

// ==========================================
// COUNTDOWN TIMER FUNCIONAL
// ==========================================

function updateCountdown() {
    const now = new Date().getTime();
    const distance = webinarDate - now;

    // Si el tiempo expiró
    if (distance < 0) {
        document.getElementById('countdown-container').style.display = 'none';

        // Ocultar todos los CTAs
        const ctaButtons = document.querySelectorAll('.cta-button, .sticky-cta');
        ctaButtons.forEach(btn => btn.style.display = 'none');

        // Mostrar mensaje de registro cerrado
        const hero = document.querySelector('.hero .container');
        if (hero) {
            const closedMessage = document.createElement('div');
            closedMessage.style.cssText = 'background: rgba(255,0,0,0.1); border: 1px solid red; padding: 20px; border-radius: 12px; color: white; font-size: 18px; font-weight: 700; text-align: center;';
            closedMessage.innerHTML = '⚠️ REGISTRO CERRADO<br><br>El webinar ya comenzó. Suscríbete a nuestra lista para la próxima fecha.';
            hero.appendChild(closedMessage);
        }

        return;
    }

    // Calcular días, horas, minutos, segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar elementos del DOM
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Ejecutar countdown cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar inmediatamente al cargar

// ==========================================
// PLAZAS RESTANTES
// ==========================================

function updateSpotsRemaining() {
    const spotsLeft = totalSpots - spotsRegistered;

    // Actualizar todos los elementos que muestran plazas restantes
    const spotsElements = document.querySelectorAll('#spots-left, #spots-left-scarcity, #spots-left-footer, #spots-left-sticky');
    spotsElements.forEach(el => {
        if (el) el.textContent = spotsLeft;
    });

    // Actualizar registrados en scarcity section
    const registeredEl = document.getElementById('spots-registered');
    if (registeredEl) registeredEl.textContent = spotsRegistered;

    // Si no quedan plazas, ocultar CTAs
    if (spotsLeft <= 0) {
        const ctaButtons = document.querySelectorAll('.cta-button, .sticky-cta');
        ctaButtons.forEach(btn => btn.style.display = 'none');

        // Mostrar mensaje de sold out
        const hero = document.querySelector('.hero .container');
        if (hero) {
            const soldOutMessage = document.createElement('div');
            soldOutMessage.style.cssText = 'background: rgba(255,0,0,0.1); border: 1px solid #00D4FF; padding: 20px; border-radius: 12px; color: #00D4FF; font-size: 18px; font-weight: 700; text-align: center;';
            soldOutMessage.innerHTML = '🔒 SOLD OUT<br><br>Las 50 plazas se agotaron. Suscríbete para la próxima fecha.';
            hero.appendChild(soldOutMessage);
        }
    }
}

// Ejecutar al cargar la página
updateSpotsRemaining();

// ==========================================
// STICKY CTA BAR - SHOW/HIDE ON SCROLL
// ==========================================

let lastScrollTop = 0;
const stickyCTA = document.getElementById('sticky-cta');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Mostrar sticky CTA después de scrollear 500px
    if (scrollTop > 500) {
        stickyCTA.classList.add('show');
    } else {
        stickyCTA.classList.remove('show');
    }

    lastScrollTop = scrollTop;
});

// ==========================================
// FAQ ACCORDION
// ==========================================

function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const allFAQs = document.querySelectorAll('.faq-item');

    // Cerrar otros FAQs abiertos
    allFAQs.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });

    // Toggle el FAQ clickeado
    faqItem.classList.toggle('active');

    // Track evento en Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'faq_click', {
            'event_category': 'engagement',
            'event_label': button.textContent.trim()
        });
    }

    // Track evento en Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', 'FAQClick', {
            question: button.textContent.trim()
        });
    }
}

// ==========================================
// VIDEO TRACKING
// ==========================================

// Nota: Para tracking preciso de video, necesitas acceso al API de YouTube/Vimeo
// Este es un ejemplo básico usando intersectionObserver para detectar cuando el video es visible

const videoContainer = document.querySelector('.video-container');
let videoViewed = false;

if (videoContainer) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !videoViewed) {
                videoViewed = true;

                // Track video view
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'video_view', {
                        'event_category': 'video',
                        'event_label': 'Video VSL visible'
                    });
                }

                if (typeof fbq !== 'undefined') {
                    fbq('trackCustom', 'VideoView');
                }
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(videoContainer);
}

// ==========================================
// CTA CLICK TRACKING
// ==========================================

function trackCTAClick(ctaLocation) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'event_category': 'conversion',
            'event_label': ctaLocation
        });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'CTA Click - ' + ctaLocation
        });
    }

    // AQUÍ PUEDES AGREGAR LÓGICA ADICIONAL:
    // - Abrir modal de registro
    // - Redirigir a Calendly
    // - Abrir formulario inline
    // - etc.

    console.log('CTA clicked:', ctaLocation);

    // Por ahora, prevenir la acción por defecto (link #)
    // Descomenta la siguiente línea cuando tengas la URL de destino configurada
    // return true;
}

// ==========================================
// SCROLL DEPTH TRACKING
// ==========================================

const scrollDepths = [25, 50, 75, 100];
const scrolledDepths = [];

window.addEventListener('scroll', function () {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const scrollPercent = (scrolled / documentHeight) * 100;

    scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !scrolledDepths.includes(depth)) {
            scrolledDepths.push(depth);

            // Track scroll depth
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': depth + '%'
                });
            }

            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', 'ScrollDepth', {
                    depth: depth + '%'
                });
            }
        }
    });
});

// ==========================================
// COUNTDOWN TIMER VISIBLE TRACKING
// ==========================================

const countdownContainer = document.getElementById('countdown-container');
let countdownViewed = false;

if (countdownContainer) {
    const countdownObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countdownViewed) {
                countdownViewed = true;

                // Track countdown timer view
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'countdown_view', {
                        'event_category': 'engagement',
                        'event_label': 'Countdown Timer visible'
                    });
                }

                if (typeof fbq !== 'undefined') {
                    fbq('trackCustom', 'CountdownView');
                }
            }
        });
    }, { threshold: 0.5 });

    countdownObserver.observe(countdownContainer);
}

// ==========================================
// UTM PARAMETERS CAPTURE (OPCIONAL)
// ==========================================

function captureUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
        source: urlParams.get('utm_source'),
        medium: urlParams.get('utm_medium'),
        campaign: urlParams.get('utm_campaign'),
        content: urlParams.get('utm_content')
    };

    // Guardar en localStorage para usar después en formulario de registro
    if (utmData.source || utmData.medium || utmData.campaign) {
        localStorage.setItem('utm_data', JSON.stringify(utmData));

        // Track UTM arrival
        if (typeof gtag !== 'undefined') {
            gtag('event', 'utm_arrival', {
                'event_category': 'traffic',
                'event_label': utmData.source + ' - ' + utmData.campaign
            });
        }
    }
}

// Ejecutar al cargar
captureUTMParameters();

// ==========================================
// PAGE LOAD TRACKING
// ==========================================

window.addEventListener('load', function () {
    // Track page fully loaded
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_loaded', {
            'event_category': 'performance',
            'event_label': 'Page fully loaded'
        });
    }

    console.log('Landing page cargada correctamente');
    console.log('Webinar date:', new Date(webinarDate));
    console.log('Plazas restantes:', totalSpots - spotsRegistered);
});

// ==========================================
// SMOOTH SCROLL (OPCIONAL)
// ==========================================

// Si agregas links de navegación interna, descomenta este código
/*
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
*/

// ==========================================
// CONSOLE INFO (DESARROLLO)
// ==========================================

console.log('===================================');
console.log('Landing Page - Diego Páramo');
console.log('Webinar: Crea Tu Asistente de IA');
console.log('===================================');
console.log('Countdown hasta:', new Date(webinarDate).toLocaleString('es-ES'));
console.log('Plazas totales:', totalSpots);
console.log('Plazas registradas:', spotsRegistered);
console.log('Plazas restantes:', totalSpots - spotsRegistered);
console.log('===================================');

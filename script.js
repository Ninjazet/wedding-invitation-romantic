// Wedding Invitation B - Bella & Carlos
// Romantic Wedding Theme

// Envelope opening animation
document.addEventListener('DOMContentLoaded', function() {
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const waxSeal = document.getElementById('waxSeal');
    const mainContent = document.getElementById('mainContent');
    
    // Handle envelope opening
    waxSeal.addEventListener('click', function() {
        // Hide envelope with fade effect
        envelopeOverlay.style.opacity = '0';
        setTimeout(() => {
            envelopeOverlay.style.display = 'none';
            document.body.classList.remove('preload');
            mainContent.style.opacity = '1';
            mainContent.classList.add('reveal-content');
            
            // Start animations
            initAnimations();
            createRoseRain();
            createFloatingHearts();
            showGuestAlert();
        }, 2000);
    });
    
    // Auto-open after 4 seconds if not clicked
    setTimeout(() => {
        if (envelopeOverlay.style.display !== 'none') {
            waxSeal.click();
        }
    }, 4000);
});

// Wedding countdown timer
const countdownDate = new Date('2026-09-22T17:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Wedding day arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Show special message
        const countdownFooter = document.querySelector('.countdown-footer');
        if (countdownFooter) {
            countdownFooter.textContent = '¡Hoy nos casamos! 💕';
            countdownFooter.style.color = 'var(--rosa-intenso)';
            countdownFooter.style.fontWeight = 'bold';
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// RSVP Modal functionality
function openRSVP() {
    const modal = document.getElementById('rsvpModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRSVP() {
    const modal = document.getElementById('rsvpModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('rsvpModal');
    if (event.target === modal) {
        closeRSVP();
    }
});

// RSVP Form handling
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value.trim();
    const attendance = document.getElementById('attendance').value;
    const guestCount = document.getElementById('guestCount').value;
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !attendance) {
        alert('Por favor completa todos los campos obligatorios 💕');
        return;
    }
    
    // Show response message
    const responseDiv = document.getElementById('responseMessage');
    responseDiv.style.display = 'block';
    
    if (attendance === 'si') {
        responseDiv.innerHTML = `
            <i class="fas fa-heart" style="margin-right: 10px; animation: heartBeat 1s infinite;"></i>
            ¡${name}, nuestros corazones están llenos de alegría! 
            Esperamos celebrar nuestro amor contigo el 22 de septiembre 💕
        `;
        responseDiv.style.background = 'linear-gradient(135deg, var(--rosa-intenso), var(--lavanda))';
        
        // Update guest alert
        updateGuestAlert(`¡${name}, esperamos celebrar nuestro amor contigo! 💕`);
        
        // Create heart explosion
        createHeartExplosion();
    } else {
        responseDiv.innerHTML = `
            <i class="fas fa-heart-crack" style="margin-right: 10px;"></i>
            ${name}, aunque nos entristece que no puedas acompañarnos, 
            agradecemos mucho que nos hayas informado 💔
        `;
        responseDiv.style.background = 'var(--gris-rosa)';
    }
    
    // Hide form and show only message
    document.querySelector('#rsvpForm').style.display = 'none';
    
    // Auto close after 4 seconds
    setTimeout(() => {
        closeRSVP();
        document.querySelector('#rsvpForm').style.display = 'block';
        responseDiv.style.display = 'none';
        document.getElementById('rsvpForm').reset();
    }, 5000);
});

// Show/hide guest count field based on attendance
document.getElementById('attendance').addEventListener('change', function() {
    const guestCountGroup = document.getElementById('guestCountGroup');
    if (this.value === 'si') {
        guestCountGroup.style.display = 'block';
    } else {
        guestCountGroup.style.display = 'none';
    }
});

// Music functionality
let musicPlaying = false;
const backgroundMusic = document.getElementById('backgroundMusic');

function toggleMusic() {
    const musicButton = document.getElementById('musicButton');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    
    if (!musicPlaying) {
        backgroundMusic.play().then(() => {
            musicPlaying = true;
            musicIcon.className = 'fas fa-pause';
            musicText.textContent = 'Pausar';
            musicButton.style.background = 'linear-gradient(135deg, var(--dorado-rosa), var(--rosa-suave))';
            musicButton.style.color = 'var(--rosa-intenso)';
        }).catch(error => {
            console.log('Error playing romantic music:', error);
        });
    } else {
        backgroundMusic.pause();
        musicPlaying = false;
        musicIcon.className = 'fas fa-music';
        musicText.textContent = 'Música';
        musicButton.style.background = 'linear-gradient(135deg, var(--rosa-intenso), var(--lavanda))';
        musicButton.style.color = 'white';
    }
}

// Create falling rose animation
function createRoseRain() {
    const giftSection = document.querySelector('.gift-section');
    const roseRain = giftSection.querySelector('.rose-rain');
    
    function createRose() {
        const rose = document.createElement('div');
        rose.className = 'rose';
        
        // Random horizontal position
        rose.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (10-18 seconds)
        const duration = Math.random() * 8 + 10;
        rose.style.animationDuration = duration + 's';
        
        // Random delay
        rose.style.animationDelay = Math.random() * 3 + 's';
        
        roseRain.appendChild(rose);
        
        // Remove rose after animation
        setTimeout(() => {
            if (rose.parentNode) {
                rose.parentNode.removeChild(rose);
            }
        }, (duration + 3) * 1000);
    }
    
    // Create roses periodically
    setInterval(createRose, 2000);
    
    // Create initial roses
    for (let i = 0; i < 6; i++) {
        setTimeout(createRose, i * 500);
    }
}

// Create floating hearts background
function createFloatingHearts() {
    const heartsBackground = document.getElementById('heartsBackground');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = Math.random() > 0.5 ? '💕' : '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.zIndex = '1';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'floatUp ' + (Math.random() * 10 + 15) + 's ease-out forwards';
        heart.style.opacity = '0.6';
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 200;
        heart.style.setProperty('--drift', drift + 'px');
        
        heartsBackground.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 25000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 3000);
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 800);
    }
}

// Create heart explosion effect for RSVP confirmation
function createHeartExplosion() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            heart.style.zIndex = '10000';
            heart.style.pointerEvents = 'none';
            
            // Random direction
            const angle = (i / 20) * Math.PI * 2;
            const velocity = Math.random() * 200 + 100;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;
            
            heart.style.animation = `explodeHeart 2s ease-out forwards`;
            heart.style.setProperty('--x', x + 'px');
            heart.style.setProperty('--y', y + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 100);
    }
}

// Guest alert functionality
function showGuestAlert() {
    setTimeout(() => {
        const alert = document.getElementById('guestAlert');
        alert.classList.add('visible');
        
        // Hide after 6 seconds
        setTimeout(() => {
            alert.classList.remove('visible');
        }, 6000);
    }, 3000);
}

function updateGuestAlert(message) {
    const alertText = document.getElementById('alertText');
    const alert = document.getElementById('guestAlert');
    
    alertText.textContent = message;
    alert.classList.add('visible');
    
    setTimeout(() => {
        alert.classList.remove('visible');
    }, 5000);
}

// Smooth scrolling for navigation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize animations
function initAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    document.querySelectorAll('.animate').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1.2s ease-out';
        observer.observe(el);
    });
    
    // Animate timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(' + (index % 2 === 0 ? '-50px' : '50px') + ')';
        item.style.transition = 'all 1s ease-out';
        item.style.transitionDelay = (index * 0.2) + 's';
        observer.observe(item);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.3;
    
    if (parallax) {
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
    
    // Floating hearts parallax
    const hearts = document.querySelectorAll('.hearts-background > *');
    hearts.forEach((heart, index) => {
        const speed = (index % 3 + 1) * 0.1;
        heart.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Wedding day special effects
function checkWeddingDay() {
    const today = new Date();
    const weddingDay = new Date('2026-09-22');
    
    if (today.toDateString() === weddingDay.toDateString()) {
        // Add special wedding day effects
        document.body.classList.add('wedding-day');
        
        // Create romantic particle shower
        createRomanticParticles();
        
        // Change background music to wedding song
        if (backgroundMusic) {
            backgroundMusic.src = 'romantic-wedding-song.mp3';
        }
        
        // Show special wedding day message
        const specialMessage = document.createElement('div');
        specialMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(rgba(233, 30, 99, 0.9), rgba(225, 190, 231, 0.9));
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 3s ease-out;
                color: white;
            ">
                <div style="text-align: center;">
                    <h1 style="font-size: 5rem; margin-bottom: 2rem; font-family: 'Great Vibes', cursive;">¡Es Nuestro Gran Día!</h1>
                    <p style="font-size: 2rem; font-family: 'Dancing Script', cursive;">Bella & Carlos se casan hoy 💕</p>
                    <div style="font-size: 4rem; margin: 2rem 0; animation: heartBeat 1s infinite;">💖💍💖</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(specialMessage);
        
        setTimeout(() => {
            specialMessage.remove();
        }, 8000);
    }
}

function createRomanticParticles() {
    const particles = ['💕', '💖', '💗', '💝', '🌹', '💐', '💍', '👰', '🤵', '💒'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100vh';
        particle.style.fontSize = (Math.random() * 30 + 20) + 'px';
        particle.style.zIndex = '1000';
        particle.style.pointerEvents = 'none';
        particle.style.animation = 'floatUp 4s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }, 300);
}

// Interactive heart cursor effect
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.98) { // Random chance to create heart
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '1rem';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'fadeUpSmall 2s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
});

// Add CSS animations for hearts and particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translateY(-100vh) translateX(var(--drift, 0)) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes explodeHeart {
        from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        to {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes fadeUpSmall {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .wedding-day {
        animation: romanticGlow 3s ease-in-out infinite alternate;
    }
    
    @keyframes romanticGlow {
        from {
            filter: hue-rotate(0deg) saturate(1);
        }
        to {
            filter: hue-rotate(10deg) saturate(1.1);
        }
    }
`;
document.head.appendChild(style);

// Check if it's the wedding day
checkWeddingDay();

// Add romantic click effects
document.addEventListener('click', function(e) {
    const clickEffect = document.createElement('div');
    clickEffect.innerHTML = '💖';
    clickEffect.style.position = 'fixed';
    clickEffect.style.left = e.clientX + 'px';
    clickEffect.style.top = e.clientY + 'px';
    clickEffect.style.fontSize = '1.5rem';
    clickEffect.style.zIndex = '1000';
    clickEffect.style.pointerEvents = 'none';
    clickEffect.style.animation = 'explodeHeart 1s ease-out forwards';
    clickEffect.style.setProperty('--x', (Math.random() - 0.5) * 100 + 'px');
    clickEffect.style.setProperty('--y', (Math.random() - 0.5) * 100 + 'px');
    
    document.body.appendChild(clickEffect);
    
    setTimeout(() => {
        clickEffect.remove();
    }, 1000);
});

// Console message for developers
console.log(`
    💕 Bella & Carlos Wedding Invitation 💕
    =======================================
    Built with love, romance, and JavaScript
    Wedding Date: September 22, 2026
    Theme: Romantic Pink & Lavender
    =======================================
    May this code be as beautiful as their love story! 💖
`);
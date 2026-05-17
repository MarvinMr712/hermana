// ========== BURBUJAS FLOTANTES DE FONDO ==========
function createBubbles() {
    const container = document.getElementById('bubbles-container');
    if (!container) return;
    const bubbleCount = 18;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bg-bubble');
        const size = Math.floor(Math.random() * 180) + 60;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        const duration = Math.random() * 20 + 15;
        bubble.style.animation = `floatBubbles ${duration}s infinite alternate ease-in-out`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubble.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(bubble);
    }
}

function addKeyframes() {
    if (!document.querySelector('#dynamic-keyframes')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'dynamic-keyframes';
        styleSheet.textContent = `
            @keyframes floatBubbles {
                0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                100% { transform: translateY(-45px) translateX(25px) rotate(5deg); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// ========== CONTADOR DE ABRAZOS VIRTUAL ==========
let hugCount = 0;

function loadHugCount() {
    const stored = localStorage.getItem('sisterHugCounter');
    if (stored !== null && !isNaN(parseInt(stored))) {
        hugCount = parseInt(stored);
    } else {
        hugCount = 0;
    }
    updateHugMessage();
}

function updateHugMessage() {
    const messageDiv = document.getElementById('hugCounterMessage');
    if (messageDiv) {
        if (hugCount === 0) {
            messageDiv.innerHTML = '✨ Haz click para enviarle un NEGROIDE virtual ✨';
        } else if (hugCount === 1) {
            messageDiv.innerHTML = '¡Le enviaste 1 NEGROIDE virtual a Mia! Ella lo es';
        } else {
            messageDiv.innerHTML = `¡Has enviado ${hugCount} NEGROIDES virtuales a Mia! Cada uno lleno de negrura`;
        }
    }
}

function addHug() {
    hugCount++;
    localStorage.setItem('sisterHugCounter', hugCount);
    updateHugMessage();
    
    // efecto de corazón flotante
    const btn = document.getElementById('hugButton');
    if (btn) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart';
        heart.style.position = 'fixed';
        heart.style.color = '#000000';
        heart.style.fontSize = '1.8rem';
        heart.style.left = `${btn.getBoundingClientRect().left + btn.offsetWidth/2}px`;
        heart.style.top = `${btn.getBoundingClientRect().top}px`;
        heart.style.zIndex = '999';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 1s ease-out';
        heart.style.opacity = '1';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.transform = 'translateY(-90px) scale(1.5)';
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// ========== EFECTO DE APARICIÓN CON SCROLL ==========
function applyScrollReveal() {
    const elementsToReveal = document.querySelectorAll('.feeling-card, .gallery-item, .letter-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s ease';
        observer.observe(el);
    });
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    addKeyframes();
    createBubbles();
    loadHugCount();
    
    const hugBtn = document.getElementById('hugButton');
    if (hugBtn) {
        hugBtn.addEventListener('click', addHug);
    }
    
    applyScrollReveal();
});
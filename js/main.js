/**
 * Lead Magnet Hub - Global JavaScript & Canvas Particle Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticlesCanvas();
    setupCopyPromptButtons();
    setupScrollReveal();
    setupHeaderScroll();
    setupCustomCursor();
    setupCardTilt();
    setupMagneticButtons();
    setupCountUp();
    setupStepProgress();
    setupHeroScramble();
});

/* ==========================================================================
   Canvas Particle Engine (Efecto Copiado Explosivo WOW)
   ========================================================================== */

let canvas, ctx;
let particles = [];
let animationId = null;

function initParticlesCanvas() {
    // Check if canvas already exists
    canvas = document.getElementById('particles-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        document.body.appendChild(canvas);
    }

    ctx = canvas.getContext('2d');

    // Resize canvas to fill window
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        
        // Random velocity in explosion bubble
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3; // Powerful speed burst
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (Math.random() * 3 + 1); // Slight upward bias
        
        // Particle properties
        this.size = Math.random() * 6 + 3;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.012; // Beautiful, natural fade out
        this.gravity = 0.15; // Gravity pull for realism
        this.friction = 0.96; // Air resistance
        
        // Shape style
        this.shape = Math.random() > 0.4 ? 'circle' : 'spark';
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.alpha -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Premium Glow effect per particle
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        
        if (this.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Draw a diamond spark
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.size);
            ctx.lineTo(this.x + this.size, this.y);
            ctx.lineTo(this.x, this.y + this.size);
            ctx.lineTo(this.x - this.size, this.y);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.restore();
    }
}

function spawnCopyExplosion(x, y) {
    // Harmonious luxury brand palette (teal green, burgundy, gold highlight, white)
    const colors = [
        '#006b5b', // primary teal green CTA
        '#ffcd00', // accent gold
        '#3d2c2e', // emotional burgundy
        '#101820', // charcoal black authority
        '#ffffff'  // sparkly white touch
    ];

    // Spawn 65 particles for a rich, beautiful burst
    for (let i = 0; i < 65; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
    }

    // Start loop if not active
    if (!animationId) {
        animateParticles();
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        
        // Remove dead particles
        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }

    if (particles.length > 0) {
        animationId = requestAnimationFrame(animateParticles);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationId = null;
    }
}

/* ==========================================================================
   Copy Prompt Logic with UI Feedback & Sound (optional)
   ========================================================================== */

function setupCopyPromptButtons() {
    const copyButtons = document.querySelectorAll('.btn-copy-prompt');

    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Find target content
            const promptBox = button.closest('.prompt-container');
            if (!promptBox) return;

            const promptTextElement = promptBox.querySelector('.prompt-body');
            if (!promptTextElement) return;

            const textToCopy = promptTextElement.textContent.trim();

            // Write to Clipboard
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    handleCopySuccess(button, e);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    });
}

function handleCopySuccess(button, event) {
    // 1. Get exact position of the click or button center for explosion source
    const rect = button.getBoundingClientRect();
    const clickX = event.clientX || (rect.left + rect.width / 2);
    const clickY = event.clientY || (rect.top + rect.height / 2);

    // 2. Trigger the particle canvas burst
    spawnCopyExplosion(clickX, clickY);

    // 3. Toggle button state with elegant transitions
    button.classList.add('copied');
    
    const originalHTML = button.innerHTML;
    
    // Smooth transition in UI text
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="btn-text">¡Copiado con Éxito!</span>
    `;

    // 4. Create floating elegant badge near click to reinforce the "WOW" effect
    createFloatingToast(clickX, clickY);

    // 5. Revert after 2 seconds
    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalHTML;
        // Re-setup listener since we replaced the HTML (and buttons might have dynamic events)
        // (Actually setting the content dynamically is better to avoid replacing raw HTML listeners,
        // but since setupCopyPromptButtons is run once, let's keep button structure.
        // Wait, a better way is to update children classes/text instead of replacing innerHTML.
        // Let's do that for the dynamic changes)
    }, 2200);
}

function createFloatingToast(x, y) {
    const toast = document.createElement('div');
    toast.className = 'floating-copy-toast';
    toast.textContent = '📋 ¡Portapapeles Actualizado!';
    
    // Style directly using the brand's luxurious Warm Beige, Teal & Charcoal scheme:
    Object.assign(toast.style, {
        position: 'fixed',
        left: `${x}px`,
        top: `${y - 30}px`,
        transform: 'translate(-50%, -50%) scale(0.8)',
        opacity: '0',
        background: 'linear-gradient(135deg, #006b5b 0%, #3d2c2e 100%)',
        color: '#ffffff',
        padding: '0.6rem 1.2rem',
        borderRadius: '6px',
        fontWeight: '700',
        fontSize: '0.85rem',
        fontFamily: 'Outfit, sans-serif',
        pointerEvents: 'none',
        zIndex: '100000',
        boxShadow: '0 10px 25px rgba(0, 107, 91, 0.3), 0 0 15px rgba(61, 44, 46, 0.1)',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    document.body.appendChild(toast);

    // Micro animation entry
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, -80%) scale(1)';
    });

    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -120%) scale(0.8)';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 1500);
}

/* ==========================================================================
   Ambient Hover Cursor Glow Effect
   ========================================================================== */

/* ==========================================================================
   Scroll Reveal — IntersectionObserver (robusto)
   ========================================================================== */

function setupScrollReveal() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px'
    });

    elements.forEach(el => observer.observe(el));

    // Fallback: reveal everything after 2s if observer never fires
    setTimeout(() => {
        elements.forEach(el => el.classList.add('is-visible'));
    }, 2500);
}

/* ==========================================================================
   Custom Cursor — Premium glow ring
   ========================================================================== */

function setupCustomCursor() {
    const ring = document.getElementById('cursor-ring');
    const dot = document.getElementById('cursor-dot');
    if (!ring || !dot) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    (function animateRing() {
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    })();

    // Expand ring on interactive elements
    const interactives = document.querySelectorAll('a, button, .option-box, .step-card, .truth-q, .programa-item');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '54px';
            ring.style.height = '54px';
            ring.style.borderColor = 'rgba(0, 107, 91, 0.8)';
            ring.style.background = 'rgba(0, 107, 91, 0.04)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '36px';
            ring.style.height = '36px';
            ring.style.borderColor = 'rgba(0, 107, 91, 0.5)';
            ring.style.background = 'transparent';
        });
    });
}

/* ==========================================================================
   3D Card Tilt — Step cards on mouse move
   ========================================================================== */

function setupCardTilt() {
    const cards = document.querySelectorAll('.step-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * 3;
            const rotY = ((cx - x) / cx) * 3;

            card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-left-color 0.4s ease, box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

/* ==========================================================================
   Magnetic Buttons — CTAs that attract to mouse
   ========================================================================== */

function setupMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-cta, .btn-oferta');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s, box-shadow 0.5s';
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.1s ease';
        });
    });
}

/* ==========================================================================
   Count-Up — Stats animate from 0 to target
   ========================================================================== */

function setupCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const prefix = el.dataset.prefix || '';
            const duration = 1400;
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out expo
                const eased = 1 - Math.pow(2, -10 * progress);
                const current = Math.round(eased * target);
                el.textContent = prefix + current;
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = prefix + target;
            }

            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Step Progress Indicator — Sidebar dots as user scrolls
   ========================================================================== */

function setupStepProgress() {
    const progressNav = document.getElementById('step-progress');
    if (!progressNav) return;

    const stepsSection = document.getElementById('sistema');
    const dots = progressNav.querySelectorAll('.progress-dot');
    const stepCards = document.querySelectorAll('[id^="step-"]');

    if (!stepsSection || !stepCards.length) return;

    // Show/hide progress nav based on steps section visibility
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            progressNav.classList.toggle('visible', entry.isIntersecting);
        });
    }, { threshold: 0.05 });

    sectionObserver.observe(stepsSection);

    // Highlight active step dot
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            const index = Array.from(stepCards).findIndex(c => c.id === id);
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        });
    }, { threshold: 0.4 });

    stepCards.forEach(card => stepObserver.observe(card));

    // Click dots to scroll
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = document.getElementById(dot.dataset.step);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

/* ==========================================================================
   Hero Scramble — H1 text scrambles on load then resolves
   ========================================================================== */

function setupHeroScramble() {
    const subtitle = document.querySelector('.hero .subtitle');
    if (!subtitle) return;

    const finalText = subtitle.textContent.trim();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const totalFrames = 18;
    let frame = 0;

    // Delay so hero reveal animation plays first
    setTimeout(() => {
        const interval = setInterval(() => {
            frame++;
            const revealedCount = Math.floor((frame / totalFrames) * finalText.length);
            subtitle.textContent = finalText
                .split('')
                .map((char, i) => {
                    if (char === ' ') return ' ';
                    if (i < revealedCount) return finalText[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (frame >= totalFrames) {
                clearInterval(interval);
                subtitle.textContent = finalText;
            }
        }, 55);
    }, 900);
}

/* ==========================================================================
   Header Scroll Shadow
   ========================================================================== */

function setupHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
}

// setupCursorAmbientGlow replaced by setupCustomCursor above

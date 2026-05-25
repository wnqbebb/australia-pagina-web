/* ═══════════════════════════════════════════════════════
   MODO CREADOR — GSAP Animations + Parallax + Glitch
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // ── 1. HERO ENTRANCE (staggered word split) ──────────────
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1) {
        const wrapNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const parts = node.textContent.split(/(\s+)/);
                const frag = document.createDocumentFragment();
                parts.forEach(part => {
                    if (/\S/.test(part)) {
                        const outer = document.createElement('span');
                        outer.className = 'word-wrap';
                        const inner = document.createElement('span');
                        inner.className = 'word';
                        inner.textContent = part;
                        outer.appendChild(inner);
                        frag.appendChild(outer);
                    } else {
                        frag.appendChild(document.createTextNode(part));
                    }
                });
                node.replaceWith(frag);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const outer = document.createElement('span');
                outer.className = 'word-wrap';
                const inner = document.createElement('span');
                inner.className = 'word';
                node.parentNode.insertBefore(outer, node);
                outer.appendChild(inner);
                inner.appendChild(node);
            }
        };

        Array.from(heroH1.childNodes).forEach(wrapNode);

        const words = heroH1.querySelectorAll('.word');
        gsap.fromTo(words,
            { y: '105%', opacity: 0 },
            { y: '0%', opacity: 1, stagger: 0.06, duration: 0.9, ease: 'expo.out', delay: 0.4 }
        );
    }

    gsap.fromTo('.hero .section-tag',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.1 }
    );

    gsap.fromTo(['.hero .subtitle', '.hero-bottom'],
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'expo.out', delay: 0.75 }
    );

    // ── 2. BRAND DIVIDER SVG DRAW ─────────────────────────────
    document.querySelectorAll('.divider-line').forEach((line, i) => {
        try {
            const len = line.getTotalLength ? line.getTotalLength() : 500;
            gsap.set(line, { strokeDasharray: len, strokeDashoffset: i === 0 ? len : -len });
            gsap.to(line, {
                strokeDashoffset: 0,
                duration: 1.4,
                ease: 'expo.inOut',
                scrollTrigger: { trigger: '.brand-divider', start: 'top 88%' }
            });
        } catch(e) {}
    });

    gsap.fromTo('.divider-dot',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.5)', scrollTrigger: { trigger: '.brand-divider', start: 'top 88%' } }
    );

    gsap.fromTo('.divider-label',
        { opacity: 0, letterSpacing: '0.2em' },
        { opacity: 1, letterSpacing: '0.08em', duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.brand-divider', start: 'top 88%' } }
    );

    // ── 3. STEPS TIMELINE DRAW ───────────────────────────────
    const tlPath = document.querySelector('.steps-timeline-path');
    if (tlPath) {
        try {
            const len = tlPath.getTotalLength();
            gsap.set(tlPath, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(tlPath, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: { trigger: '.steps-container', start: 'top 72%', end: 'bottom 35%', scrub: 0.6 }
            });
        } catch(e) {}
    }

    // ── 4. STEP CARDS STAGGER ────────────────────────────────
    gsap.fromTo('.step-card',
        { y: 50, opacity: 0 },
        {
            y: 0, opacity: 1,
            stagger: { amount: 0.5, ease: 'power2.inOut' },
            duration: 1.0, ease: 'expo.out',
            scrollTrigger: { trigger: '.steps-container', start: 'top 78%' }
        }
    );

    // ── 5. TRUTH QUESTIONS SLIDE ─────────────────────────────
    gsap.fromTo('.truth-q',
        { x: -28, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.09, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: '.truth-questions', start: 'top 82%' } }
    );

    // ── 6. PROGRAMA ITEMS SCALE IN ───────────────────────────
    gsap.fromTo('.programa-item',
        { scale: 0.90, opacity: 0, y: 12 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.05, duration: 0.65, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.programa-grid', start: 'top 82%' } }
    );

    // ── 7. OFERTA PULSING RINGS ──────────────────────────────
    gsap.to('.oferta-ring', {
        scale: 1.9, opacity: 0, duration: 2.8, ease: 'power2.out',
        repeat: -1, stagger: { each: 0.9, repeat: -1 }, transformOrigin: 'center center'
    });

    // ── 8. SECTION HEADERS ───────────────────────────────────
    gsap.utils.toArray('.section-header').forEach(el => {
        gsap.fromTo(el,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 87%' } }
        );
    });

    // ── 9. PAIN SECTION ──────────────────────────────────────
    gsap.fromTo('.pain-text',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: '.pain-section', start: 'top 80%' } }
    );
    gsap.fromTo('.pain-quote',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.pain-quote', start: 'top 85%' } }
    );
    gsap.fromTo('.pain-revelation',
        { y: 20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'expo.out', scrollTrigger: { trigger: '.pain-revelation', start: 'top 85%' } }
    );

    // ── 10. OFERTA CARD WOW ENTRANCE ─────────────────────────
    const ofertaCard = document.querySelector('.oferta-card');
    if (ofertaCard) {
        gsap.fromTo(ofertaCard,
            { y: 40, opacity: 0, scale: 0.94 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 1.2, ease: 'back.out(1.4)',
                scrollTrigger: {
                    trigger: '.oferta-section', start: 'top 75%',
                    onEnter: () => ofertaCard.classList.add('wow-active')
                }
            }
        );
    }

    // ── 11. FOOTER ───────────────────────────────────────────
    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo) {
        gsap.fromTo(footerLogo,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: footerLogo, start: 'top 92%' } }
        );
    }

    // ── 12. TEXT ROTATE — hero dynamic word spinner ──────────
    const rotatorEl = document.getElementById('hero-rotator');
    if (rotatorEl) {
        const words = [
            'crear tu avatar digital',
            'clonar tu voz con IA',
            'producir sin cámara',
            'cobrar como agencia',
            'publicar todos los días',
            'vender UGC Premium'
        ];
        let idx = 0;

        const rotate = () => {
            rotatorEl.classList.add('tr-exit');
            setTimeout(() => {
                idx = (idx + 1) % words.length;
                rotatorEl.textContent = words[idx];
                rotatorEl.classList.remove('tr-exit');
                rotatorEl.classList.add('tr-enter');
                setTimeout(() => rotatorEl.classList.remove('tr-enter'), 400);
            }, 280);
        };

        setInterval(rotate, 2800);
    }

    // ── TESTIMONIALS ANIMATION ────────────────────────────────
    gsap.fromTo('.testimonial-card',
        { y: 40, opacity: 0, scale: 0.97 },
        {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.13,
            duration: 1.0,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%' }
        }
    );

    // ── IDENTITY GRID ENTRANCE ────────────────────────────────
    gsap.fromTo('.identity-card',
        { y: 24, opacity: 0, scale: 0.96 },
        {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.identity-grid', start: 'top 85%' }
        }
    );

    // ── PRICE COUNTER ANIMATION ───────────────────────────────
    const priceEl = document.querySelector('.price-new');
    if (priceEl) {
        gsap.fromTo(priceEl,
            { scale: 0.72, opacity: 0 },
            {
                scale: 1, opacity: 1,
                duration: 1.1,
                ease: 'back.out(1.9)',
                scrollTrigger: { trigger: '.oferta-pricing', start: 'top 86%' }
            }
        );
    }

    // ── MARQUEE HOVER PAUSE ──────────────────────────────────
    const strip = document.querySelector('.marquee-strip');
    if (strip) {
        strip.addEventListener('mouseenter', () =>
            document.querySelectorAll('.marquee-track').forEach(t => t.style.animationPlayState = 'paused')
        );
        strip.addEventListener('mouseleave', () =>
            document.querySelectorAll('.marquee-track').forEach(t => t.style.animationPlayState = 'running')
        );
    }

    // ── 13. STORY SCROLL — ROTATION ENTRANCE ─────────────────
    // Adapted from FlowArt/FlowSection: each [data-flow-section] after the first
    // rotates its [data-flow-inner] from a slight angle to 0 as it enters.
    const flowSections = gsap.utils.toArray('[data-flow-section]');
    flowSections.forEach((section, i) => {
        if (i === 0) return; // hero is excluded
        const inner = section.querySelector('[data-flow-inner]');
        if (!inner) return;

        // Check for reduced motion preference
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        gsap.fromTo(inner,
            { rotation: 6, transformOrigin: 'bottom left', opacity: 0.6 },
            {
                rotation: 0,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'top 30%',
                    scrub: true
                }
            }
        );
    });

    // ── 14. HERO PARALLAX FLOATING ELEMENTS ──────────────────
    const floatLayer = document.querySelector('.hero-float-layer');
    if (floatLayer) {
        const floatEls = Array.from(floatLayer.querySelectorAll('[data-depth]'));
        const hero = document.getElementById('hero');
        const positions = floatEls.map(() => ({ x: 0, y: 0 }));
        let mouse = { x: 0, y: 0 };
        let rafId = null;

        const onMouseMove = (e) => {
            if (!hero) return;
            const rect = hero.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left - rect.width  / 2) / rect.width;
            mouse.y = (e.clientY - rect.top  - rect.height / 2) / rect.height;
        };

        const animateFloats = () => {
            floatEls.forEach((el, i) => {
                const depth = parseFloat(el.dataset.depth) || 1;
                const targetX = mouse.x * depth * 28;
                const targetY = mouse.y * depth * 28;
                positions[i].x += (targetX - positions[i].x) * 0.055;
                positions[i].y += (targetY - positions[i].y) * 0.055;
                el.style.setProperty('--px', `${positions[i].x}px`);
                el.style.transform = `translate3d(${positions[i].x}px, ${positions[i].y}px, 0)`;
            });
            rafId = requestAnimationFrame(animateFloats);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        animateFloats();

        // Stop RAF when hero scrolls out of view
        ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            onLeave: () => cancelAnimationFrame(rafId),
            onEnterBack: () => { rafId = requestAnimationFrame(animateFloats); }
        });
    }

    // ── 15. MARQUEE GLITCH TRIGGER ────────────────────────────
    if (strip) {
        const triggerGlitch = () => {
            if (strip.classList.contains('glitching')) return;
            strip.classList.add('glitching');
            setTimeout(() => strip.classList.remove('glitching'), 220);
        };

        // Random intervals between 4-9 seconds
        const scheduleGlitch = () => {
            const delay = 4000 + Math.random() * 5000;
            setTimeout(() => { triggerGlitch(); scheduleGlitch(); }, delay);
        };
        scheduleGlitch();
    }

    // ── 16. OFERTA PARTICLE SYSTEM ───────────────────────────
    const particleContainer = document.getElementById('oferta-particles');
    if (particleContainer) {
        const colors = ['rgba(255,255,255,0.4)', 'rgba(255,205,0,0.5)', 'rgba(0,255,180,0.3)'];
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'oferta-particle';
            const size = 3 + Math.random() * 5;
            Object.assign(p.style, {
                width: size + 'px',
                height: size + 'px',
                left: (5 + Math.random() * 90) + '%',
                bottom: (5 + Math.random() * 40) + '%',
                background: colors[Math.floor(Math.random() * colors.length)],
                '--dur': (2.5 + Math.random() * 3) + 's',
                '--delay': (Math.random() * 4) + 's'
            });
            particleContainer.appendChild(p);
        }
    }

});

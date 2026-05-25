document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. SCROLL PROGRESS BAR
    // ============================================================
    const progressBar = document.getElementById('scroll-progress');
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = `${progress}%`;
    };

    // ============================================================
    // 2. STICKY HEADER
    // ============================================================
    const header = document.getElementById('site-header');

    const handleScroll = () => {
        updateProgress();

        if (header) {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ============================================================
    // 4. MAGNETIC BUTTON EFFECT
    // ============================================================
    const magneticBtns = document.querySelectorAll('.btn-cta, .btn-oferta');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width  / 2;
            const cy = rect.top  + rect.height / 2;
            const dx = (e.clientX - cx) * 0.28;
            const dy = (e.clientY - cy) * 0.28;
            btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });



    // ============================================================
    // 6. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ============================================================
    const revealEls = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window && revealEls.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('revealed'));
    }

    // ============================================================
    // 7. FAQ ACCORDION
    // ============================================================
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn    = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!btn || !answer) return;

        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const a = other.querySelector('.faq-answer');
                    if (a) a.style.maxHeight = '0';
                }
            });

            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });

    // ============================================================
    // 8. COPY PROMPT TO CLIPBOARD — enhanced micro-interaction
    // ============================================================
    document.querySelectorAll('.btn-copy-prompt').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const container = btn.closest('.prompt-container');
            const body = container?.querySelector('.prompt-body');
            if (!body) return;

            // Ripple from click position
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'copy-ripple';
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top  = (e.clientY - rect.top  - 10) + 'px';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);

            navigator.clipboard.writeText(body.innerText.trim()).then(() => {
                const origText = btn.querySelector('.btn-text')?.innerText || 'Copiar';

                // Highlight container
                if (container) {
                    container.classList.add('copied');
                    setTimeout(() => container.classList.remove('copied'), 2000);
                }

                btn.style.color = '#006b5b';
                btn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span class="btn-text">¡Copiado!</span>
                `;

                // Micro-bounce on the card
                const card = btn.closest('.step-card') || btn.closest('.option-box');
                if (card && typeof gsap !== 'undefined') {
                    gsap.fromTo(card, { scale: 1 }, { scale: 1.012, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' });
                }

                setTimeout(() => {
                    btn.style.color = '';
                    btn.innerHTML = `<span class="btn-text">${origText}</span>`;
                }, 2500);
            }).catch(() => {});
        });
    });

});

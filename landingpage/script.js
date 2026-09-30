document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Effect (doi-tac.html only)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Account for fixed header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Intersection Observer for Fade-up and Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation triggers once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Modal Logic
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuModal = document.getElementById('menuModal');

    if (openMenuBtn && closeMenuBtn && menuModal) {
        openMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            menuModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        });

        closeMenuBtn.addEventListener('click', () => {
            menuModal.classList.remove('active');
            document.body.style.overflow = ''; // allow background scrolling
        });

        // Close on clicking outside modal content
        menuModal.addEventListener('click', (e) => {
            if (e.target === menuModal) {
                closeMenuBtn.click();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuModal.classList.contains('active')) {
                closeMenuBtn.click();
            }
        });
    }

    /* =====================================================================
       MAIN SITE (index.html) — Casa Mika restaurant landing
       All elements guarded with null checks so this file works on both pages.
       ===================================================================== */
    const msNav = document.getElementById('msNav');
    const msStickyCta = document.getElementById('msStickyCta');
    const msReserveSection = document.getElementById('reserve');
    const msHeroSection = document.getElementById('hero');

    if (msNav || msStickyCta) {
        const onMsScroll = () => {
            const y = window.scrollY;

            // Nav background change
            if (msNav) {
                if (y > 30) msNav.classList.add('scrolled');
                else msNav.classList.remove('scrolled');
            }

            // Sticky CTA: hiện sau khi cuộn qua ~80% hero, ẩn khi đang ở Reserve section hoặc footer
            if (msStickyCta) {
                const heroH = msHeroSection ? msHeroSection.offsetHeight * 0.85 : window.innerHeight * 0.6;
                const reserveTop = msReserveSection ? msReserveSection.offsetTop - window.innerHeight * 0.5 : Infinity;
                const reserveBottom = msReserveSection ? msReserveSection.offsetTop + msReserveSection.offsetHeight : Infinity;
                const scrolledIntoReserve = y >= reserveTop && y <= reserveBottom;
                if (y > heroH && !scrolledIntoReserve) {
                    msStickyCta.classList.add('visible');
                } else {
                    msStickyCta.classList.remove('visible');
                }
            }
        };
        window.addEventListener('scroll', onMsScroll, { passive: true });
        window.addEventListener('resize', onMsScroll, { passive: true });
        onMsScroll();
    }

    // Menu QR / direct menu route: land visitors on the actual menu, below the hero.
    const msMenuPdfSection = document.getElementById('menu-pdf');
    const msPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    if (msMenuPdfSection && msPath === '/menu' && (!window.location.hash || window.location.hash === '#menu-pdf')) {
        window.setTimeout(() => {
            const headerOffset = 80;
            const elementPosition = msMenuPdfSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: 'smooth'
            });
        }, 120);
    }

    // Mobile nav toggle (hamburger drawer)
    const msNavToggle = document.getElementById('msNavToggle');
    if (msNavToggle && msNav) {
        const closeMobileNav = () => {
            msNav.classList.remove('open');
            msNavToggle.setAttribute('aria-expanded', 'false');
            msNavToggle.setAttribute('aria-label', 'Open menu');
            document.body.style.overflow = '';
        };
        msNavToggle.addEventListener('click', () => {
            const isOpen = msNav.classList.toggle('open');
            msNavToggle.setAttribute('aria-expanded', String(isOpen));
            msNavToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        msNav.querySelectorAll('.ms-nav-link, .ms-nav-links .ms-btn').forEach((link) => {
            link.addEventListener('click', closeMobileNav);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && msNav.classList.contains('open')) closeMobileNav();
        });
    }

    // Lightbox (gallery)
    const lightbox = document.getElementById('msLightbox');
    if (lightbox) {
        const items = Array.from(document.querySelectorAll('[data-lightbox]'));
        const lbImg = document.getElementById('msLightboxImg');
        const lbClose = document.getElementById('msLightboxClose');
        const lbPrev = document.getElementById('msLightboxPrev');
        const lbNext = document.getElementById('msLightboxNext');
        let lbIdx = 0;

        if (items.length && lbImg && lbClose && lbPrev && lbNext) {
            const lbOpen = (i) => {
                lbIdx = (i + items.length) % items.length;
                const href = items[lbIdx].getAttribute('href');
                const alt = items[lbIdx].querySelector('img')?.getAttribute('alt') || '';
                lbImg.src = href;
                lbImg.alt = alt;
                lightbox.classList.add('active');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            };
            const lbClose_ = () => {
                lightbox.classList.remove('active');
                lightbox.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            };
            const lbPrev_ = () => lbOpen(lbIdx - 1);
            const lbNext_ = () => lbOpen(lbIdx + 1);

            items.forEach((item, i) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    lbOpen(i);
                });
            });
            lbClose.addEventListener('click', lbClose_);
            lbPrev.addEventListener('click', (e) => { e.stopPropagation(); lbPrev_(); });
            lbNext.addEventListener('click', (e) => { e.stopPropagation(); lbNext_(); });
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) lbClose_();
            });
            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('active')) return;
                if (e.key === 'Escape') lbClose_();
                else if (e.key === 'ArrowLeft') lbPrev_();
                else if (e.key === 'ArrowRight') lbNext_();
            });

            // Touch swipe (iPhone-friendly)
            let touchStartX = 0;
            let touchStartY = 0;
            let touchTracking = false;
            lightbox.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) return;
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                touchTracking = true;
            }, { passive: true });
            lightbox.addEventListener('touchend', (e) => {
                if (!touchTracking) return;
                touchTracking = false;
                const dx = e.changedTouches[0].clientX - touchStartX;
                const dy = e.changedTouches[0].clientY - touchStartY;
                // Horizontal swipe → prev/next; vertical swipe down → close
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
                    if (dx > 0) lbPrev_(); else lbNext_();
                } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
                    lbClose_();
                }
            });
        }
    }

    /* =====================================================================
       CASA MIKA — INLINE PDF MENU SWITCHER (For all /menu/ pages)
       ===================================================================== */
    const inlineMenuBtns = document.querySelectorAll('.ms-inline-menu-btn');
    const inlinePdfFrame = document.querySelector('.ms-inline-pdf-frame');

    if (inlineMenuBtns.length && inlinePdfFrame) {
        inlineMenuBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                inlineMenuBtns.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');

                const targetPdf = btn.getAttribute('data-pdf');
                if (targetPdf) {
                    inlinePdfFrame.src = targetPdf + '#view=FitH';
                }
            });
        });
    }

    /* =====================================================================
       CASA MIKA — 9:16 VIDEO REELS HIGHLIGHT (Sound Toggle & Playback)
       ===================================================================== */
    const reelCards = document.querySelectorAll('.ms-reel-card');
    reelCards.forEach(card => {
        const video = card.querySelector('.ms-reel-video');
        const soundBtn = card.querySelector('.ms-reel-sound-btn');

        if (video) {
            // Auto play muted when page is ready or clicked
            video.muted = true;
            video.play().catch(() => {});

            if (soundBtn) {
                soundBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    video.muted = !video.muted;
                    soundBtn.innerHTML = video.muted
                        ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
                        : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
                });
            }

            // Click video to toggle play/pause
            card.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
    });

    /* =====================================================================
       CASA MIKA — MENU SHOWCASE CATEGORY FILTER
       ===================================================================== */
    const showcaseTabs = document.querySelectorAll('.ms-showcase-tab');
    const dishCards = document.querySelectorAll('.ms-dish-card');

    if (showcaseTabs.length && dishCards.length) {
        showcaseTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                showcaseTabs.forEach(t => t.classList.remove('is-active'));
                tab.classList.add('is-active');

                const filter = tab.getAttribute('data-filter') || 'all';
                dishCards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'flex';
                        card.classList.add('fade-up', 'visible');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

const initCasaMika = () => {
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
       CASA MIKA — INTERACTIVE MENU VIEWER & FULLSCREEN LIGHTBOX
       For all /menu/ pages on mobile and desktop
       ===================================================================== */
    const initInteractiveMenuViewer = () => {
        const bookTabs = document.querySelectorAll('.ms-menu-book-tab');
        const stageImg = document.getElementById('msStageImg');
        const stagePage = document.getElementById('msStagePage');
        const prevBtn = document.getElementById('msViewerPrev');
        const nextBtn = document.getElementById('msViewerNext');
        const currentNumEl = document.getElementById('msCurrentPageNum');
        const totalNumEl = document.getElementById('msTotalPagesNum');
        const thumbsBar = document.getElementById('msMenuThumbsBar');
        const scrollView = document.getElementById('msMenuScrollView');
        const swipeView = document.getElementById('msMenuSwipeView');
        const modeBtns = document.querySelectorAll('.ms-mode-btn');
        const fullscreenBtn = document.getElementById('msFullscreenBtn');
        const downloadPdfLink = document.getElementById('msDownloadPdfLink');

        // Lightbox elements
        const lightbox = document.getElementById('msMenuLightbox');
        const lightboxImg = document.getElementById('msLightboxImg');
        const lightboxClose = document.getElementById('msLightboxClose');
        const lightboxBackdrop = document.getElementById('msLightboxBackdrop');
        const lightboxPrev = document.getElementById('msLightboxPrev');
        const lightboxNext = document.getElementById('msLightboxNext');
        const lightboxCounter = document.getElementById('msLightboxCounter');

        if (!bookTabs.length || !stageImg) return;

        // Load Manifest
        let manifest = null;
        const manifestEl = document.getElementById('msMenuManifest');
        if (manifestEl) {
            try {
                manifest = JSON.parse(manifestEl.textContent);
            } catch (e) {
                console.warn('Could not parse menu manifest, using fallback');
            }
        }

        // Fallback manifest if not found
        if (!manifest) {
            manifest = {
                au: { key: 'au', totalPages: 8, pdf: '/menu/Menu%20%C4%91%E1%BB%93%20%C4%83n%20%C3%82u.pdf' },
                viet: { key: 'viet', totalPages: 15, pdf: '/menu/Menu%20%C4%91%E1%BB%93%20%C4%83n%20Vi%E1%BB%87t%20Nam.pdf' },
                ruou: { key: 'ruou', totalPages: 11, pdf: '/menu/Menu%20danh%20s%C3%A1ch%20c%C3%A1c%20lo%E1%BA%A1i%20r%C6%B0%E1%BB%A3u.pdf' }
            };
        }

        const pdfUrlMap = {
            au: '/menu/Menu%20%C4%91%E1%BB%93%20%C4%83n%20%C3%82u.pdf',
            viet: '/menu/Menu%20%C4%91%E1%BB%93%20%C4%83n%20Vi%E1%BB%87t%20Nam.pdf',
            ruou: '/menu/Menu%20danh%20s%C3%A1ch%20c%C3%A1c%20lo%E1%BA%A1i%20r%C6%B0%E1%BB%A3u.pdf'
        };

        let currentBook = 'au';
        let currentPage = 1;

        const getPageSrc = (bookKey, pageNum) => {
            return `/image/menu-pages/${bookKey}/page-${pageNum}.webp`;
        };

        const updateControls = () => {
            const total = manifest[currentBook].totalPages;
            if (currentNumEl) currentNumEl.textContent = String(currentPage);
            if (totalNumEl) totalNumEl.textContent = String(total);
            if (prevBtn) prevBtn.disabled = (currentPage <= 1);
            if (nextBtn) nextBtn.disabled = (currentPage >= total);
            if (lightboxCounter) lightboxCounter.textContent = `${currentPage} / ${total}`;
            if (lightboxPrev) lightboxPrev.disabled = (currentPage <= 1);
            if (lightboxNext) lightboxNext.disabled = (currentPage >= total);

            // Update active thumbnail
            if (thumbsBar) {
                const thumbs = thumbsBar.querySelectorAll('.ms-thumb-item');
                thumbs.forEach(t => {
                    const p = parseInt(t.getAttribute('data-page'), 10);
                    if (p === currentPage) {
                        t.classList.add('is-active');
                        t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    } else {
                        t.classList.remove('is-active');
                    }
                });
            }
        };

        const goToPage = (pageNum) => {
            const total = manifest[currentBook].totalPages;
            if (pageNum < 1) pageNum = 1;
            if (pageNum > total) pageNum = total;
            currentPage = pageNum;

            const src = getPageSrc(currentBook, currentPage);
            if (stageImg) stageImg.src = src;
            if (lightboxImg && lightbox.classList.contains('is-open')) {
                lightboxImg.src = src;
            }

            updateControls();

            // Preload adjacent pages for instant rendering
            if (currentPage < total) {
                const preNext = new Image();
                preNext.src = getPageSrc(currentBook, currentPage + 1);
            }
            if (currentPage > 1) {
                const prePrev = new Image();
                prePrev.src = getPageSrc(currentBook, currentPage - 1);
            }
        };

        const renderBook = (bookKey) => {
            currentBook = bookKey;
            currentPage = 1;
            const bookData = manifest[bookKey];
            const total = bookData.totalPages;

            // Update PDF download link
            if (downloadPdfLink) {
                downloadPdfLink.href = pdfUrlMap[bookKey] || '#';
            }

            // Render Thumbnails
            if (thumbsBar) {
                thumbsBar.innerHTML = '';
                for (let i = 1; i <= total; i++) {
                    const thumb = document.createElement('button');
                    thumb.type = 'button';
                    thumb.className = `ms-thumb-item ${i === 1 ? 'is-active' : ''}`;
                    thumb.setAttribute('data-page', String(i));
                    thumb.setAttribute('aria-label', `Trang ${i}`);
                    thumb.innerHTML = `
                        <img src="${getPageSrc(bookKey, i)}" alt="Trang ${i}" loading="lazy">
                        <span class="thumb-num">${i}</span>
                    `;
                    thumb.addEventListener('click', () => goToPage(i));
                    thumbsBar.appendChild(thumb);
                }
            }

            // Render Continuous Scroll View
            if (scrollView) {
                scrollView.innerHTML = '';
                for (let i = 1; i <= total; i++) {
                    const item = document.createElement('div');
                    item.className = 'ms-scroll-page-item';
                    item.setAttribute('data-page', String(i));
                    item.innerHTML = `
                        <span class="ms-scroll-page-badge">Trang ${i} / ${total}</span>
                        <img src="${getPageSrc(bookKey, i)}" alt="Trang ${i}" loading="${i <= 3 ? 'eager' : 'lazy'}">
                    `;
                    item.addEventListener('click', () => {
                        goToPage(i);
                        openLightbox();
                    });
                    scrollView.appendChild(item);
                }
            }

            goToPage(1);
        };

        // Book Tab click
        bookTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                bookTabs.forEach(t => {
                    t.classList.remove('is-active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('is-active');
                tab.setAttribute('aria-selected', 'true');
                const bookKey = tab.getAttribute('data-book');
                if (bookKey) renderBook(bookKey);
            });
        });

        // Prev / Next button clicks
        if (prevBtn) prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

        // Mode Switching: Swipe vs Continuous Scroll
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                const mode = btn.getAttribute('data-mode');
                if (mode === 'scroll') {
                    if (swipeView) swipeView.style.display = 'none';
                    if (thumbsBar) thumbsBar.style.display = 'none';
                    if (scrollView) scrollView.style.display = 'flex';
                } else {
                    if (swipeView) swipeView.style.display = 'flex';
                    if (thumbsBar) thumbsBar.style.display = 'flex';
                    if (scrollView) scrollView.style.display = 'none';
                }
            });
        });

        // Mobile Touch Gestures on Stage Page (Swipe left / right)
        if (stagePage) {
            let startX = 0;
            let startY = 0;
            let isTracking = false;

            stagePage.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) return;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isTracking = true;
            }, { passive: true });

            stagePage.addEventListener('touchend', (e) => {
                if (!isTracking) return;
                isTracking = false;
                const diffX = e.changedTouches[0].clientX - startX;
                const diffY = e.changedTouches[0].clientY - startY;

                // If swipe is primarily horizontal and passes threshold
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
                    if (diffX < 0) {
                        // Swipe left -> next page
                        goToPage(currentPage + 1);
                    } else {
                        // Swipe right -> prev page
                        goToPage(currentPage - 1);
                    }
                }
            }, { passive: true });

            // Click to open fullscreen lightbox
            stagePage.addEventListener('click', () => {
                openLightbox();
            });
        }

        // Fullscreen Lightbox logic
        const openLightbox = () => {
            if (!lightbox || !lightboxImg) return;
            lightboxImg.src = getPageSrc(currentBook, currentPage);
            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            updateControls();
        };

        const closeLightbox = () => {
            if (!lightbox) return;
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (fullscreenBtn) fullscreenBtn.addEventListener('click', openLightbox);
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            goToPage(currentPage - 1);
        });
        if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            goToPage(currentPage + 1);
        });

        // Touch swipe inside lightbox
        if (lightbox) {
            let lbStartX = 0;
            let lbStartY = 0;
            let lbTracking = false;

            lightbox.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) return;
                lbStartX = e.touches[0].clientX;
                lbStartY = e.touches[0].clientY;
                lbTracking = true;
            }, { passive: true });

            lightbox.addEventListener('touchend', (e) => {
                if (!lbTracking) return;
                lbTracking = false;
                const diffX = e.changedTouches[0].clientX - lbStartX;
                const diffY = e.changedTouches[0].clientY - lbStartY;

                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX < 0) goToPage(currentPage + 1);
                    else goToPage(currentPage - 1);
                } else if (diffY > 80 && Math.abs(diffY) > Math.abs(diffX)) {
                    closeLightbox();
                }
            }, { passive: true });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox && lightbox.classList.contains('is-open')) {
                if (e.key === 'Escape') closeLightbox();
                else if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
                else if (e.key === 'ArrowRight') goToPage(currentPage + 1);
            } else if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
                else if (e.key === 'ArrowRight') goToPage(currentPage + 1);
            }
        });

        // Initial render with 'au'
        renderBook('au');
    };
    initInteractiveMenuViewer();

    /* =====================================================================
       CASA MIKA — 9:16 VIDEO REELS HIGHLIGHT (Mobile Faststart Playback)
       ===================================================================== */
    const reelCards = document.querySelectorAll('.ms-reel-card');
    reelCards.forEach(card => {
        const video = card.querySelector('.ms-reel-video');
        const soundBtn = card.querySelector('.ms-reel-sound-btn');
        const loadingEl = card.querySelector('.ms-reel-loading');
        const playBtn = card.querySelector('.ms-reel-play-btn');

        if (!video) return;

        // Mobile autoplay requires muted and defaultMuted
        video.muted = true;
        video.defaultMuted = true;

        const hideLoading = () => {
            if (loadingEl) loadingEl.classList.add('hidden');
        };

        video.addEventListener('playing', () => {
            hideLoading();
            if (playBtn) playBtn.classList.remove('visible');
        });

        video.addEventListener('canplay', hideLoading);
        video.addEventListener('loadeddata', hideLoading);
        video.addEventListener('waiting', () => {
            if (loadingEl) loadingEl.classList.remove('hidden');
        });

        const tryPlay = () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    hideLoading();
                    if (playBtn) playBtn.classList.remove('visible');
                }).catch(() => {
                    hideLoading();
                    // Autoplay restricted on mobile (e.g. low power mode) -> show play button
                    if (playBtn) playBtn.classList.add('visible');
                });
            }
        };

        // IntersectionObserver: Play video when visible in viewport, pause when scrolled away
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tryPlay();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.35 });

        videoObserver.observe(card);

        // Tap play button overlay
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                video.play().then(() => {
                    if (playBtn) playBtn.classList.remove('visible');
                }).catch(() => {});
            });
        }

        // Tap card to toggle play/pause
        card.addEventListener('click', () => {
            if (video.paused) {
                video.play().then(() => {
                    if (playBtn) playBtn.classList.remove('visible');
                }).catch(() => {});
            } else {
                video.pause();
                if (playBtn) playBtn.classList.add('visible');
            }
        });

        // Sound toggle
        if (soundBtn) {
            soundBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                video.muted = !video.muted;
                soundBtn.innerHTML = video.muted
                    ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
                    : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
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
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCasaMika);
} else {
    initCasaMika();
}

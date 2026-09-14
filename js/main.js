/* ===================================================================
   SCRIPTS PRINCIPAIS DO PORTFÓLIO
   =================================================================== */
(function () {
    'use strict';

    /* ---------- Ano atual no rodapé ---------- */
    var currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Header dinâmico ao rolar ---------- */
    var header = document.getElementById('header');
    var sentinel = document.getElementById('top-sentinel');

    if (header && sentinel && 'IntersectionObserver' in window) {
        var headerObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                header.classList.toggle('is-scrolled', !entry.isIntersecting);
            });
        }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 });
        headerObserver.observe(sentinel);
    }

    /* ---------- Menu mobile ---------- */
    var menuToggle = document.getElementById('menuToggle');
    var nav = document.getElementById('nav');

    function closeMenu() {
        if (!nav || !menuToggle) return;
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    }

    function toggleMenu() {
        if (!nav || !menuToggle) return;
        var isOpen = nav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', toggleMenu);
        nav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });
    }

    /* ---------- Link de navegação ativo conforme a seção visível ---------- */
    var sections = document.querySelectorAll('main section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink(id) {
        navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
    }

    if (sections.length && 'IntersectionObserver' in window) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    /* ---------- Revelação de elementos ao rolar ---------- */
    var revealEls = document.querySelectorAll('[data-reveal]');

    if (revealEls.length) {
        if (reducedMotion || !('IntersectionObserver' in window)) {
            revealEls.forEach(function (el) {
                el.classList.add('is-visible');
            });
        } else {
            var revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

            revealEls.forEach(function (el) {
                revealObserver.observe(el);
            });
        }
    }

    /* ---------- Botão voltar ao topo ---------- */
    var backToTop = document.getElementById('backToTop');
    var heroSection = document.getElementById('home');

    if (backToTop && heroSection && 'IntersectionObserver' in window) {
        var backToTopObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                backToTop.classList.toggle('is-visible', !entry.isIntersecting);
            });
        }, { threshold: 0 });
        backToTopObserver.observe(heroSection);

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        });
    }
})();

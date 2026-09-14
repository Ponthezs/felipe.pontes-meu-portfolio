/* ===================================================================
   INTRO CINEMATOGRÁFICA — controla a transição de entrada do site
   =================================================================== */
(function () {
    'use strict';

    var intro = document.getElementById('intro');
    var site = document.getElementById('site');
    var introBtn = document.getElementById('introBtn');

    // Sem os elementos essenciais, não há o que fazer aqui.
    if (!intro || !site) return;

    document.body.classList.add('intro-active');

    /* Mantém o degradê do nome visualmente contínuo entre as letras:
       cada letra precisa do seu próprio background-clip (ver intro.css),
       então calculamos aqui a largura total e a posição de cada letra. */
    var nameEl = intro.querySelector('.intro__name');
    function syncNameGradient() {
        if (!nameEl) return;
        var letters = nameEl.querySelectorAll('.intro__letter');
        if (!letters.length) return;
        var nameRect = nameEl.getBoundingClientRect();
        if (!nameRect.width) return;
        nameEl.style.setProperty('--name-w', nameRect.width + 'px');
        letters.forEach(function (letter) {
            var r = letter.getBoundingClientRect();
            letter.style.setProperty('--lx', (r.left - nameRect.left) + 'px');
        });
    }

    syncNameGradient();
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(syncNameGradient).catch(function () {});
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(syncNameGradient, 150);
    });

    var hasEntered = false;

    function enterSite() {
        if (hasEntered) return;
        hasEntered = true;

        intro.classList.add('intro--exit');
        site.classList.add('site--reveal');
        document.body.classList.remove('intro-active');

        var finished = false;
        function finish() {
            if (finished) return;
            finished = true;
            intro.style.display = 'none';
            intro.removeEventListener('transitionend', onTransitionEnd);
        }

        function onTransitionEnd(e) {
            if (e.target === intro) finish();
        }

        intro.addEventListener('transitionend', onTransitionEnd);
        // Rede de segurança: garante a remoção mesmo se o evento não disparar.
        window.setTimeout(finish, 1300);
    }

    if (introBtn) {
        introBtn.addEventListener('click', enterSite);
    }

    // Permite avançar com teclado (Enter/Espaço/Escape) ou clicando no fundo.
    intro.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            enterSite();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') enterSite();
    });
})();

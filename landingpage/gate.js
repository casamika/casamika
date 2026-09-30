/**
 * Casa Mika — soft-opening gate
 * Redirects all pages to /soft-opening/ until MIKA_SOFT_OPENING.
 * Bypass: ?preview=1 (persists for the browser session)
 */
(function () {
    try {
        var OPEN = '2026-08-08T08:00:00+07:00';
        var openAt = new Date(OPEN).getTime();
        if (isNaN(openAt)) return;

        var params = new URLSearchParams(location.search);
        if (params.get('preview') === '1') {
            try { sessionStorage.setItem('mika-preview', '1'); } catch (e) { }
        }
        var preview = false;
        try { preview = sessionStorage.getItem('mika-preview') === '1'; } catch (e) { }
        if (preview) return;

        var path = location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
        var onCountdown = path === '/soft-opening';
        var publicDuringSoftOpening = path === '/menu' || /\/(vi|en|de|ko)\/menu$/.test(path);

        if (Date.now() < openAt) {
            if (!onCountdown && !publicDuringSoftOpening) location.replace('/soft-opening/');
        } else if (onCountdown) {
            location.replace('/');
        }
    } catch (e) { }
})();

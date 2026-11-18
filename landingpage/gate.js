/**
 * Casa Mika — site gate (nạp ở <head> mọi trang)
 * 1. MAINTENANCE: true → phủ màn hình "Website đang bảo trì" lên mọi trang (giữ nguyên URL + nội dung gốc
 *    trong HTML để không mất SEO / Google Ads không báo lỗi đích đến). Tắt: đổi thành false rồi deploy.
 * 2. Soft-opening: redirect mọi trang sang /soft-opening/ trước giờ OPEN.
 * Bypass cả 2: ?preview=1 (giữ trong session trình duyệt — dùng cho team kiểm tra site thật)
 */
(function () {
    try {
        var MAINTENANCE = false;
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

        if (MAINTENANCE) {
            showMaintenance();
            return;
        }

        var path = location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
        var onCountdown = path === '/soft-opening';
        var publicDuringSoftOpening = path === '/menu' || /\/(vi|en|de|ko|zh|th|ru)\/menu$/.test(path);

        if (Date.now() < openAt) {
            if (!onCountdown && !publicDuringSoftOpening) location.replace('/soft-opening/');
        } else if (onCountdown) {
            location.replace('/');
        }
    } catch (e) { }

    function showMaintenance() {
        var TEXT = {
            vi: ['Website đang bảo trì', 'Chúng tôi đang làm mới<br><em>trải nghiệm online.</em>', 'Nhà hàng Casa Mika vẫn <strong>mở cửa phục vụ bình thường</strong>. Đặt bàn hoặc liên hệ trực tiếp qua các kênh bên dưới — chúng tôi luôn sẵn sàng đón bạn.', 'Thứ 2 – Thứ 6 · 07:30 – 00:00<br>Thứ 7 &amp; CN · 07:30 – 00:30', 'Đặt Bàn', 'Gọi 0708 888 007', 'Nhắn Zalo', 'Chỉ Đường'],
            en: ['Website under maintenance', 'We\'re refreshing<br><em>our online experience.</em>', 'Casa Mika is <strong>open as usual</strong>. Book a table or reach us directly below — we look forward to welcoming you.', 'Mon – Fri · 07:30 – 00:00<br>Sat &amp; Sun · 07:30 – 00:30', 'Reserve a Table', 'Call +84 708 888 007', 'Message on Zalo', 'Get Directions'],
            ko: ['웹사이트 점검 중', '더 나은 온라인 경험을<br><em>준비하고 있습니다.</em>', 'Casa Mika는 <strong>정상 영업 중</strong>입니다. 아래에서 예약하거나 직접 문의해 주세요.', '월 – 금 · 07:30 – 00:00<br>토 · 일 · 07:30 – 00:30', '예약하기', '전화 +84 708 888 007', 'Zalo로 문의', '길찾기'],
            de: ['Website in Wartung', 'Wir erneuern<br><em>unseren Online-Auftritt.</em>', 'Casa Mika ist <strong>wie gewohnt geöffnet</strong>. Reservieren Sie einen Tisch oder kontaktieren Sie uns direkt.', 'Mo – Fr · 07:30 – 00:00<br>Sa &amp; So · 07:30 – 00:30', 'Tisch reservieren', 'Anrufen +84 708 888 007', 'Auf Zalo schreiben', 'Route planen'],
            zh: ['网站维护中', '我们正在升级<br><em>线上体验。</em>', 'Casa Mika 餐厅<strong>照常营业</strong>。欢迎通过下方方式预订或直接联系我们。', '周一至周五 · 07:30 – 00:00<br>周六、周日 · 07:30 – 00:30', '预订餐位', '致电 +84 708 888 007', 'Zalo 咨询', '导航路线'],
            th: ['เว็บไซต์อยู่ระหว่างปรับปรุง', 'เรากำลังปรับปรุง<br><em>ประสบการณ์ออนไลน์</em>', 'Casa Mika <strong>เปิดให้บริการตามปกติ</strong> จองโต๊ะหรือติดต่อเราได้โดยตรงด้านล่าง', 'จ. – ศ. · 07:30 – 00:00<br>ส. – อา. · 07:30 – 00:30', 'จองโต๊ะ', 'โทร +84 708 888 007', 'ทักผ่าน Zalo', 'นำทาง'],
            ru: ['Сайт на обслуживании', 'Мы обновляем<br><em>наш сайт.</em>', 'Casa Mika <strong>работает в обычном режиме</strong>. Забронируйте стол или свяжитесь с нами напрямую.', 'Пн – Пт · 07:30 – 00:00<br>Сб и Вс · 07:30 – 00:30', 'Забронировать стол', 'Позвонить +84 708 888 007', 'Написать в Zalo', 'Маршрут']
        };
        var HL = { vi: 'vi', en: 'en', ko: 'ko', de: 'de', zh: 'zh-CN', th: 'th', ru: 'ru' };
        // Nhãn bộ chọn ngôn ngữ (tên bản ngữ) + nhãn aria
        var LANGS = [['vi', 'Tiếng Việt'], ['en', 'English'], ['ko', '한국어'], ['de', 'Deutsch'], ['zh', '中文'], ['th', 'ไทย'], ['ru', 'Русский']];
        var PICK = { vi: 'Chọn ngôn ngữ', en: 'Choose language', ko: '언어 선택', de: 'Sprache wählen', zh: '选择语言', th: 'เลือกภาษา', ru: 'Выбрать язык' };
        var lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
        if (!TEXT[lang]) lang = 'en';

        // Ẩn nội dung gốc ngay từ <head> (tránh nháy trang) — nội dung vẫn nằm trong HTML cho Google
        var root = document.documentElement;
        root.className += ' cm-maint';
        var css = document.createElement('style');
        css.textContent =
            'html.cm-maint,html.cm-maint body{overflow:hidden!important;background:#1A1410}' +
            'html.cm-maint body>*:not(.cm-maint-screen){display:none!important}' +
            '.cm-maint-screen{position:fixed;inset:0;z-index:2147483647;overflow-y:auto;display:flex;align-items:center;justify-content:center;' +
            'padding:max(24px,env(safe-area-inset-top)) 16px max(24px,env(safe-area-inset-bottom));' +
            'background:radial-gradient(ellipse at top,rgba(184,145,42,.16),transparent 60%),#1A1410;color:#FAF7F2;' +
            'font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;-webkit-tap-highlight-color:transparent}' +
            '.cm-maint-box{width:100%;max-width:620px}' +
            '.cm-maint-langs{display:flex;flex-wrap:wrap;justify-content:center;gap:.4rem;margin:0 auto 28px;padding:0;list-style:none}' +
            '.cm-maint-lang{font:inherit;font-size:.78rem;line-height:1;min-height:36px;padding:.55rem .85rem;border-radius:999px;cursor:pointer;' +
            'background:transparent;color:rgba(250,247,242,.7);border:1px solid rgba(250,247,242,.18);transition:background .2s,color .2s,border-color .2s}' +
            '.cm-maint-lang:hover,.cm-maint-lang:focus-visible{color:#FAF7F2;border-color:rgba(184,145,42,.7)}' +
            '.cm-maint-lang[aria-pressed="true"]{background:#B8912A;border-color:#B8912A;color:#1A1410;font-weight:600}' +
            '.cm-maint-logo{height:64px;width:auto;margin:0 auto 24px;display:block}' +
            '.cm-maint-eyebrow{display:inline-block;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:#D4A94A;' +
            'border:1px solid rgba(184,145,42,.4);padding:.45rem .9rem;border-radius:999px}' +
            '.cm-maint-eyebrow:before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#D4A94A;margin-right:.55rem;vertical-align:1px;animation:cmPulse 1.6s ease-in-out infinite}' +
            '.cm-maint-title{font-family:"Playfair Display",Georgia,serif;font-weight:400;font-size:clamp(1.8rem,6vw,2.8rem);line-height:1.2;margin:1.4rem 0 1rem}' +
            '.cm-maint-title em{color:#D4A94A}' +
            '.cm-maint-msg{font-size:1rem;line-height:1.7;color:rgba(250,247,242,.8);margin:0 auto 1.6rem;max-width:520px}' +
            '.cm-maint-msg strong{color:#FAF7F2;font-weight:600}' +
            '.cm-maint-hours{font-size:.88rem;line-height:1.7;color:rgba(250,247,242,.65);margin-bottom:2rem}' +
            '.cm-maint-actions{display:grid;grid-template-columns:1fr;gap:.75rem;max-width:520px;margin:0 auto}' +
            '@media(min-width:480px){.cm-maint-actions{grid-template-columns:1fr 1fr}}' +
            '.cm-maint-btn{display:flex;align-items:center;justify-content:center;min-height:48px;padding:.8rem 1.2rem;border:1px solid rgba(184,145,42,.55);' +
            'color:#FAF7F2;text-decoration:none;font-size:.9rem;letter-spacing:.04em;transition:background .2s,color .2s}' +
            '.cm-maint-btn:hover,.cm-maint-btn:focus-visible{background:rgba(184,145,42,.15)}' +
            '.cm-maint-btn.is-primary{background:#B8912A;border-color:#B8912A;color:#1A1410;font-weight:600}' +
            '.cm-maint-btn.is-primary:hover,.cm-maint-btn.is-primary:focus-visible{background:#D4A94A}' +
            '.cm-maint-addr{margin-top:2rem;font-style:normal;font-size:.82rem;color:rgba(250,247,242,.55)}' +
            '.cm-maint-addr a{color:#D4A94A;text-decoration:none}' +
            '@keyframes cmPulse{50%{opacity:.3}}' +
            '@media(prefers-reduced-motion:reduce){.cm-maint-eyebrow:before{animation:none}}';
        document.head.appendChild(css);

        function paint(el) {
            var t = TEXT[lang];
            var reserve = 'https://www.google.com/maps/reserve/v/dine/c/tx1PNeAwXj8?hl=' + HL[lang];
            var picker = '';
            for (var i = 0; i < LANGS.length; i++) {
                picker += '<li><button type="button" class="cm-maint-lang" lang="' + LANGS[i][0] + '" data-lang="' + LANGS[i][0] + '" aria-pressed="' +
                    (LANGS[i][0] === lang) + '">' + LANGS[i][1] + '</button></li>';
            }
            el.setAttribute('lang', HL[lang]);
            el.innerHTML =
                '<div class="cm-maint-box">' +
                '<ul class="cm-maint-langs" role="group" aria-label="' + PICK[lang] + '">' + picker + '</ul>' +
                '<img class="cm-maint-logo" src="/image/logo/logo-new.png" alt="Casa Mika">' +
                '<span class="cm-maint-eyebrow">' + t[0] + '</span>' +
                '<h1 class="cm-maint-title" id="cmMaintTitle">' + t[1] + '</h1>' +
                '<p class="cm-maint-msg">' + t[2] + '</p>' +
                '<p class="cm-maint-hours">' + t[3] + '</p>' +
                '<div class="cm-maint-actions">' +
                '<a class="cm-maint-btn is-primary" href="' + reserve + '" target="_blank" rel="noopener">' + t[4] + '</a>' +
                '<a class="cm-maint-btn" href="tel:+84708888007">' + t[5] + '</a>' +
                '<a class="cm-maint-btn" href="https://zalo.me/0708888007" target="_blank" rel="noopener">' + t[6] + '</a>' +
                '<a class="cm-maint-btn" href="https://www.google.com/maps/dir/?api=1&destination=16.0571741,108.2454052" target="_blank" rel="noopener">' + t[7] + '</a>' +
                '</div>' +
                '<address class="cm-maint-addr">Casa Mika · 37 Trần Bạch Đằng, Ngũ Hành Sơn, Đà Nẵng 50000<br>' +
                '<a href="tel:+84708888007">+84 708 888 007</a> · <a href="mailto:info@casamika.com">info@casamika.com</a> · ' +
                '<a href="https://www.facebook.com/official.casamika" target="_blank" rel="noopener">Facebook</a></address>' +
                '</div>';
        }

        function render() {
            if (document.querySelector('.cm-maint-screen')) return;
            var el = document.createElement('div');
            el.className = 'cm-maint-screen';
            el.setAttribute('role', 'dialog');
            el.setAttribute('aria-modal', 'true');
            el.setAttribute('aria-labelledby', 'cmMaintTitle');
            paint(el);
            // Đổi ngôn ngữ tại chỗ + lưu 'mika-lang' (trang chủ / redirect dùng chung key này)
            el.addEventListener('click', function (ev) {
                var btn = ev.target.closest ? ev.target.closest('.cm-maint-lang') : null;
                if (!btn || btn.getAttribute('data-lang') === lang) return;
                lang = btn.getAttribute('data-lang');
                try { localStorage.setItem('mika-lang', lang); } catch (e) { }
                paint(el);
                var next = el.querySelector('.cm-maint-lang[data-lang="' + lang + '"]');
                if (next) next.focus();
                try { window.dataLayer.push({ event: 'cm_maintenance_lang', page_lang: lang }); } catch (e) { }
            });
            document.body.appendChild(el);
            try {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'cm_maintenance_view', page_lang: lang });
            } catch (e) { }
        }

        if (document.body) render();
        else document.addEventListener('DOMContentLoaded', render);
    }
})();

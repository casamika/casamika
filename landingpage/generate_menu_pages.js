const fs = require('fs');
const path = require('path');

const GOOGLE_RESERVE_URL = 'https://www.google.com/maps/reserve/v/dine/c/tx1PNeAwXj8?source=pa&opi=79508299&hl=vi&gei=xsq8ap2nGfek2roPv8oj&ahbb=1&sourceurl=https://www.google.com/maps/preview/place?authuser%3D0%26hl%3Dvi%26pb%3D!1m14!1s0x31421737deda4ad1:0xf6fb5ca72c7d33f!3m12!1m3!1d26061.27722053428!2d108.24709075!3d16.0497664!2m3!1f0!2f0!3f0!3m2!1i2560!2i1305!4f13.1!12m4!2m3!1i360!2i120!4i8!13m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!14m5!1swsq8aszpL_7d2roPy8Od-As:49!2s1i:0,t:150714,p:wsq8aszpL_7d2roPy8Od-As:49!7e81!12e3!17swsq8aszpL_7d2roPy8Od-As:53!15m108!1m28!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m17!3b1!4b1!5b1!6b1!9b1!13b1!14b1!17b1!20b1!21b1!22b1!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b1!21m28!1m6!1m2!1i0!2i0!2m2!1i530!2i1305!1m6!1m2!1i2510!2i0!2m2!1i2560!2i1305!1m6!1m2!1i0!2i0!2m2!1i2560!2i20!1m6!1m2!1i0!2i1285!2m2!1i2560!2i1305!22m1!1e81!29m0!30m6!3b1!6m1!2b1!7m1!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i797!39zQ2FzYSBNaWthIOKAkyBDb2ZmZWUgJiBSZXN0YXVyYW50IOKAkyBXb3Jrc3BhY2UsIMSQxrDhu51uZyBUcuG6p24gQuG6oWNoIMSQ4bqxbmcsIEFuIEjhuqNpLCBOZ8WpIEjDoG5oIFPGoW4sIMSQw6AgTuG6tW5n%26q%3DCasa%2BMika%2B%25E2%2580%2593%2BCoffee%2B%2526%2BRestaurant%2B%25E2%2580%2593%2BWorkspace,%2B%25C4%2590%25C6%25B0%25E1%25BB%259Dng%2BTr%25E1%25BA%25A7n%2BB%25E1%25BA%25A1ch%2B%25C4%2590%25E1%25BA%25B1ng,%2BAn%2BH%25E1%25BA%25A3i,%2BNg%25C5%25A9%2BH%25C3%25A0nh%2BS%25C6%25A1n,%2B%25C4%2590%25C3%25A0%2BN%25E1%25BA%25B5ng';

function getGoogleReserveUrl(lang) {
  const hl = lang === 'vi' ? 'vi' : lang === 'de' ? 'de' : lang === 'ko' ? 'ko' : 'en';
  return GOOGLE_RESERVE_URL.replace(/hl=vi/g, `hl=${hl}`).replace(/hl%3Dvi/g, `hl%3D${hl}`);
}

const menuData = JSON.parse(fs.readFileSync(path.join(__dirname, 'image', 'menu-items', 'menu-data.json'), 'utf8'));

function generateShowcaseHTML(lang) {
  let allItems = [];
  
  menuData.food.forEach(item => {
    allItems.push({
      ...item,
      category: 'food',
      badgeVi: 'Ẩm thực', badgeEn: 'Culinary', badgeDe: 'Küche', badgeKo: '요리',
      imgSrc: `/image/menu-items/food/${item.dest}`
    });
  });
  
  menuData.drink.forEach(item => {
    allItems.push({
      ...item,
      category: 'drink',
      badgeVi: 'Đồ uống', badgeEn: 'Drink', badgeDe: 'Getränke', badgeKo: '음료',
      imgSrc: `/image/menu-items/drink/${item.dest}`
    });
  });

  menuData.mocktail.forEach(item => {
    allItems.push({
      ...item,
      category: 'mocktail',
      badgeVi: 'Mocktail', badgeEn: 'Mocktail', badgeDe: 'Mocktail', badgeKo: '목테일',
      imgSrc: `/image/menu-items/mocktail/${item.dest}`
    });
  });

  const titles = {
    vi: {
      eyebrow: '— Tuyển Chọn Món Đặc Sắc',
      title: 'Hương vị Casa Mika,<br><em>chọn lọc cho bạn.</em>',
      sub: 'Từ nguồn nguyên liệu tươi ngon buổi sáng đến những ly pha chế công phu lúc hoàng hôn.',
      tabAll: 'Món Nổi Bật', tabFood: 'Món Ăn', tabDrink: 'Cà Phê & Đồ Uống', tabMocktail: 'Mocktail & Cocktail'
    },
    en: {
      eyebrow: '— Handpicked Selection',
      title: 'Casa Mika Flavours,<br><em>curated for your table.</em>',
      sub: 'From fresh morning market catch to artisanal libations at dusk.',
      tabAll: 'Featured', tabFood: 'Culinary', tabDrink: 'Coffee & Drinks', tabMocktail: 'Mocktails & Cocktails'
    },
    de: {
      eyebrow: '— Ausgewählte Köstlichkeiten',
      title: 'Casa Mika Aromen,<br><em>für Ihren Tisch kreiert.</em>',
      sub: 'Von frischen Marktzutaten am Morgen bis zu kunstvollen Drinks bei Sonnenuntergang.',
      tabAll: 'Highlights', tabFood: 'Speisen', tabDrink: 'Kaffee & Getränke', tabMocktail: 'Mocktails & Cocktails'
    },
    ko: {
      eyebrow: '— 추천 메뉴 컬렉션',
      title: '까사 미카의 풍미,<br><em>식탁을 위한 엄선.</em>',
      sub: '아침 시장의 신선한 해산물부터 황혼의 예술적인 칵테일까지.',
      tabAll: '대표 메뉴', tabFood: '요리', tabDrink: '커피 & 음료', tabMocktail: '목테일 & 칵테일'
    }
  }[lang];

  // KHÔNG HIỂN THỊ GIÁ TIỀN
  let cardsHtml = allItems.map(item => {
    const name = lang === 'vi' ? item.nameVi : lang === 'de' ? item.nameDe : lang === 'ko' ? item.nameKo : item.nameEn;
    const badge = lang === 'vi' ? item.badgeVi : lang === 'de' ? item.badgeDe : lang === 'ko' ? item.badgeKo : item.badgeEn;
    return `
            <article class="ms-dish-card fade-up" data-category="${item.category}">
                <div class="ms-dish-img-wrap">
                    <img src="${item.imgSrc}" alt="${name}" class="ms-dish-img" loading="lazy">
                </div>
                <div class="ms-dish-body">
                    <div class="ms-dish-header">
                        <h3 class="ms-dish-name">${name}</h3>
                    </div>
                    <span class="ms-dish-cat">${badge}</span>
                </div>
            </article>`;
  }).join('\n');

  return `
    <!-- ===== Tuyển Chọn Menu ===== -->
    <section class="ms-showcase" id="showcase">
        <div class="container center-text">
            <span class="ms-eyebrow fade-up">${titles.eyebrow}</span>
            <h2 class="ms-title fade-up">${titles.title}</h2>
            <p class="ms-section-sub fade-up delay-1">${titles.sub}</p>
            <div class="ms-showcase-tabs fade-up delay-1">
                <button type="button" class="ms-showcase-tab is-active" data-filter="all">${titles.tabAll}</button>
                <button type="button" class="ms-showcase-tab" data-filter="food">${titles.tabFood}</button>
                <button type="button" class="ms-showcase-tab" data-filter="drink">${titles.tabDrink}</button>
                <button type="button" class="ms-showcase-tab" data-filter="mocktail">${titles.tabMocktail}</button>
            </div>
            <div class="ms-showcase-grid">
                ${cardsHtml}
            </div>
        </div>
    </section>`;
}

function buildMenuPage(lang) {
  const reserveUrl = getGoogleReserveUrl(lang);
  const meta = {
    vi: {
      lang: 'vi',
      title: 'Thực Đơn — Casa Mika',
      desc: 'Thực đơn đầy đủ Casa Mika — ẩm thực Á-Âu, cà phê, cocktail đặc trưng, rượu vang tinh chọn.',
      heroEyebrow: '— Thực Đơn',
      heroTitle: 'Thực đơn đầy đủ,<br><em>cho bàn vườn.</em>',
      heroSub: 'Bếp Á-Âu, bar và rượu — được sáng tạo cho giờ giấc và vị khách trước mặt. Khám phá tuyển chọn bên dưới hoặc xem trực tiếp các cuốn menu.',
      pdfEyebrow: '— Toàn Bộ Cuốn Thực Đơn',
      pdfTitle: 'Xem menu trực tiếp<br><em>ngay tại đây.</em>',
      pdfSub: 'Nhấp chọn để chuyển đổi giữa Menu Âu, Menu Việt và Danh Sách Rượu ngay trên màn hình.',
      btnAu: 'Menu Âu',
      btnViet: 'Menu Việt',
      btnRuou: 'Menu Rượu',
      navAbout: 'Về Chúng Tôi',
      navMenu: 'Thực Đơn',
      navNews: 'Tin Tức',
      navCareer: 'Tuyển Dụng',
      navReserve: 'Đặt Bàn',
      reserveTitle: 'Giữ một chỗ<br><em>bên chiếc bàn vườn.</em>',
      reserveSub: 'Mở cửa hàng ngày từ 07:30 sáng đến 00:00 đêm. Zalo là cách nhanh nhất để gặp lễ tân.',
      reserveBtn: 'Đặt Bàn',
      reserveZalo: 'Nhắn tin Zalo',
      reserveFacebook: 'Ghé Thăm Facebook',
      footerBrand: 'Một bàn vườn tại khu Mỹ Khê.',
      footerVisitTitle: 'Đến với chúng tôi',
      footerContactTitle: 'Liên hệ',
      footerFollowTitle: 'Theo dõi'
    },
    en: {
      lang: 'en',
      title: 'Menu — Casa Mika',
      desc: 'The full Casa Mika menu — Asian-Western culinary, artisan coffee, signature cocktails, curated wine cellar.',
      heroEyebrow: '— Menu',
      heroTitle: 'The full menu,<br><em>for the garden table.</em>',
      heroSub: 'Asian-Western kitchen, bar and wine list composed for the hour and the guest before us.',
      pdfEyebrow: '— Complete Menu Books',
      pdfTitle: 'Browse menu books<br><em>inline right here.</em>',
      pdfSub: 'Click below to switch between Western Menu, Vietnamese Menu, and Wine List directly on this page.',
      btnAu: 'Western Menu',
      btnViet: 'Vietnamese Menu',
      btnRuou: 'Wine List',
      navAbout: 'About',
      navMenu: 'Menu',
      navNews: 'News',
      navCareer: 'Career',
      navReserve: 'Reserve',
      reserveTitle: 'Keep a place<br><em>by the garden table.</em>',
      reserveSub: 'Open every day from half-seven in the morning until midnight. Zalo is the fastest way to reach the host stand.',
      reserveBtn: 'Reserve a Table',
      reserveZalo: 'Message on Zalo',
      reserveFacebook: 'Visit Facebook',
      footerBrand: 'A garden table by My Khe Beach.',
      footerVisitTitle: 'Visit',
      footerContactTitle: 'Contact',
      footerFollowTitle: 'Follow'
    },
    de: {
      lang: 'de',
      title: 'Speisekarte — Casa Mika',
      desc: 'Die vollständige Casa Mika Speisekarte — Asiatisch-westliche Küche, Kaffeespezialitäten, Cocktails und Weine.',
      heroEyebrow: '— Speisekarte',
      heroTitle: 'Die Speisekarte,<br><em>für die Gartentafel.</em>',
      heroSub: 'Küche, Bar und Weinkarte, komponiert für den Garten und die Stunde.',
      pdfEyebrow: '— Vollständige Menükarten',
      pdfTitle: 'Speisekarten interaktiv<br><em>direkt hier durchblättern.</em>',
      pdfSub: 'Klicken Sie unten, um direkt zwischen westlicher Küche, vietnamesischer Karte und Weinen zu wechseln.',
      btnAu: 'Westliches Menü',
      btnViet: 'Vietnamesisches Menü',
      btnRuou: 'Weinkarte',
      navAbout: 'Über uns',
      navMenu: 'Speisekarte',
      navNews: 'Aktuelles',
      navCareer: 'Karriere',
      navReserve: 'Reservieren',
      reserveTitle: 'Einen Platz sichern<br><em>an der Gartentafel.</em>',
      reserveSub: 'Täglich geöffnet von 07:30 bis Mitternacht. Zalo ist der schnellste Weg zu unserer Rezeption.',
      reserveBtn: 'Tisch reservieren',
      reserveZalo: 'Auf Zalo schreiben',
      reserveFacebook: 'Facebook besuchen',
      footerBrand: 'Ein Gartentisch am My Khe Strand.',
      footerVisitTitle: 'Besuch',
      footerContactTitle: 'Kontakt',
      footerFollowTitle: 'Folgen'
    },
    ko: {
      lang: 'ko',
      title: '메뉴 — Casa Mika',
      desc: '까사 미카 전체 메뉴 — 아시안-웨스턴 다이닝, 커피, 시그니처 칵테일, 엄선된 와인 리스트.',
      heroEyebrow: '— 메뉴',
      heroTitle: '정원 식탁을 위한<br><em>전체 메뉴.</em>',
      heroSub: '정원과 시간, 그리고 손님을 위해 정성스레 준비된 주방, 바, 와인 리스트.',
      pdfEyebrow: '— 전체 메뉴북',
      pdfTitle: '페이지 내에서 직접<br><em>메뉴북을 확인하세요.</em>',
      pdfSub: '새 창을 열지 않고 화면에서 바로 양식 메뉴, 베트남 메뉴, 와인 리스트를 전환하여 감상하실 수 있습니다.',
      btnAu: '웨스턴 메뉴',
      btnViet: '베트남 메뉴',
      btnRuou: '와인 리스트',
      navAbout: '소개',
      navMenu: '메뉴',
      navNews: '소식',
      navCareer: '채용',
      navReserve: '예약하기',
      reserveTitle: '정원 식탁에<br><em>자리를 준비해 두겠습니다.</em>',
      reserveSub: '매일 아침 07:30부터 자정까지 운영됩니다. Zalo를 통해 가장 빠르게 예약 가능합니다.',
      reserveBtn: '예약하기',
      reserveZalo: 'Zalo 문의',
      reserveFacebook: '페이스북 방문',
      footerBrand: '미케 비치 옆 정원 식탁.',
      footerVisitTitle: '방문 안내',
      footerContactTitle: '연락처',
      footerFollowTitle: 'SNS'
    }
  }[lang];

  const showcaseSection = generateShowcaseHTML(lang);

  const html = `<!DOCTYPE html>
<html lang="${meta.lang}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#1A1410">
    <script src="/gate.js"></script>
    <script>try { localStorage.setItem('mika-lang', '${meta.lang}'); } catch (e) { }</script>
    <meta name="description" content="${meta.desc}">
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.desc}">
    <meta property="og:image" content="/image/image3d.jpg">
    <meta property="og:type" content="website">
    <title>${meta.title}</title>

    <link rel="canonical" href="https://casamika.com/${meta.lang}/menu/">
    <link rel="alternate" hreflang="en" href="https://casamika.com/en/menu/">
    <link rel="alternate" hreflang="vi" href="https://casamika.com/vi/menu/">
    <link rel="alternate" hreflang="de" href="https://casamika.com/de/menu/">
    <link rel="alternate" hreflang="ko" href="https://casamika.com/ko/menu/">
    <link rel="alternate" hreflang="x-default" href="https://casamika.com/en/menu/">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
    <link rel="preload" as="image" href="/image/image3d.jpg">
    <link rel="stylesheet" href="/style.css">
</head>

<body class="site-main">

    <!-- ===== Nav ===== -->
    <nav class="ms-nav" id="msNav">
        <div class="container ms-nav-inner">
            <a href="/${meta.lang}/" class="ms-logo" aria-label="Casa Mika">
                <img src="/image/logo/logo-new.png" alt="Casa Mika" onerror="this.outerHTML='<span class=&quot;ms-logo-text&quot;>CASA MIKA</span>';">
            </a>
            <div class="ms-nav-links" id="msNavLinks">
                <a href="/${meta.lang}/#story" class="ms-nav-link">${meta.navAbout}</a>
                <a href="/${meta.lang}/menu/" class="ms-nav-link is-active" aria-current="page">${meta.navMenu}</a>
                <a href="/${meta.lang}/news/" class="ms-nav-link">${meta.navNews}</a>
                <a href="/${meta.lang}/career/" class="ms-nav-link">${meta.navCareer}</a>
                <a href="${reserveUrl}" target="_blank" rel="noopener" class="ms-btn ms-btn-outline ms-btn-sm">${meta.navReserve}</a>
            </div>
            <span class="ms-lang-switch" role="group" aria-label="Language">
                <a href="/vi/menu/" class="ms-lang ${meta.lang === 'vi' ? 'is-active' : ''}" data-lang="vi">VI</a>
                <span class="ms-lang-sep" aria-hidden="true">|</span>
                <a href="/en/menu/" class="ms-lang ${meta.lang === 'en' ? 'is-active' : ''}" data-lang="en">EN</a>
                <span class="ms-lang-sep" aria-hidden="true">|</span>
                <a href="/de/menu/" class="ms-lang ${meta.lang === 'de' ? 'is-active' : ''}" data-lang="de">DE</a>
                <span class="ms-lang-sep" aria-hidden="true">|</span>
                <a href="/ko/menu/" class="ms-lang ${meta.lang === 'ko' ? 'is-active' : ''}" data-lang="ko">KO</a>
            </span>
            <button class="ms-nav-toggle" id="msNavToggle" aria-label="Menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- ===== Hero ===== -->
    <header class="ms-hero ms-menu-hero" id="hero">
        <div class="ms-hero-bg">
            <img src="/image/image3d.jpg" alt="" class="ms-hero-image" aria-hidden="true">
            <div class="ms-hero-overlay"></div>
        </div>
        <div class="container ms-hero-content">
            <span class="ms-hero-eyebrow fade-up">${meta.heroEyebrow}</span>
            <h1 class="ms-hero-title fade-up delay-2">${meta.heroTitle}</h1>
            <p class="ms-hero-stub-note fade-up delay-3">${meta.heroSub}</p>
        </div>
    </header>

    ${showcaseSection}

    <!-- ===== INLINE PDF MENU VIEWER ===== -->
    <section class="ms-section ms-menu-pdf" id="menu-pdf">
        <div class="container center-text">
            <span class="ms-eyebrow fade-up">${meta.pdfEyebrow}</span>
            <h2 class="ms-title fade-up">${meta.pdfTitle}</h2>
            <p class="ms-section-sub fade-up delay-1">${meta.pdfSub}</p>
            
            <!-- Nút bấm chuyển trực tiếp trong trang -->
            <div class="ms-inline-menu-actions fade-up delay-2">
                <button type="button" class="ms-inline-menu-btn is-active" data-pdf="/menu/Menu%20%C4%91%E1%BB%93%20%C4%83n%20%C3%82u.pdf">${meta.btnAu}</button>
                <button type="button" class="ms-inline-menu-btn" data-pdf="/menu/Menu%20%C4%91%E1%BB%93%20%C4%83n%20Vi%E1%BB%87t%20Nam.pdf">${meta.btnViet}</button>
                <button type="button" class="ms-inline-menu-btn" data-pdf="/menu/Menu%20danh%20s%C3%A1ch%20c%C3%A1c%20lo%E1%BA%A1i%20r%C6%B0%E1%BB%A3u.pdf">${meta.btnRuou}</button>
            </div>

            <!-- Khung nhúng PDF trực tiếp -->
            <div class="ms-inline-pdf-box fade-in">
                <iframe class="ms-inline-pdf-frame" src="/menu/Menu%20%C4%91%E1%BB%93%20%C4%83n%20%C3%82u.pdf#view=FitH" title="Casa Mika Menu" loading="lazy"></iframe>
            </div>
        </div>
    </section>

    <!-- ===== Final CTA ===== -->
    <section class="ms-section ms-final-cta" id="visit">
        <div class="container">
            <span class="ms-eyebrow fade-up">— Reserve</span>
            <h2 class="ms-title fade-up">${meta.reserveTitle}</h2>
            <p class="ms-section-sub fade-up delay-1">${meta.reserveSub}</p>
            <div class="ms-final-cta-actions fade-up delay-2">
                <a href="${reserveUrl}" target="_blank" rel="noopener" class="ms-btn ms-btn-primary ms-btn-lg">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: -2px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    ${meta.reserveBtn}
                </a>
                <a href="https://zalo.me/0708888007" target="_blank" rel="noopener" class="ms-btn ms-btn-outline ms-btn-lg">${meta.reserveZalo}</a>
                <a href="https://web.facebook.com/official.casamika" target="_blank" rel="noopener" class="ms-btn ms-btn-outline ms-btn-lg ms-btn-fb">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
                    ${meta.reserveFacebook}
                </a>
            </div>
        </div>
    </section>

    <!-- ===== Footer ===== -->
    <footer class="ms-footer">
        <div class="container ms-footer-inner">
            <div class="ms-footer-brand">
                <img src="/image/logo/logo-new.png" alt="Casa Mika" onerror="this.outerHTML='<span class=&quot;ms-footer-logo-text&quot;>CASA MIKA</span>';">
                <p>${meta.footerBrand}</p>
            </div>
            <div class="ms-footer-col">
                <h4>${meta.footerVisitTitle}</h4>
                <p>37 Trần Bạch Đằng<br>Ngũ Hành Sơn, Da Nang<br>Vietnam</p>
                <p>Mon – Fri · 07:30 – 00:00<br>Sat &amp; Sun · 07:30 – 00:30</p>
            </div>
            <div class="ms-footer-col">
                <h4>${meta.footerContactTitle}</h4>
                <p><a href="tel:+84708888007">+84 708 888 007</a></p>
                <p><a href="https://zalo.me/0708888007" target="_blank" rel="noopener">Zalo · +84 708 888 007</a></p>
                <p><a href="mailto:info@casamika.com">info@casamika.com</a></p>
            </div>
            <div class="ms-footer-col">
                <h4>${meta.footerFollowTitle}</h4>
                <div class="ms-footer-social">
                    <a href="https://www.facebook.com/official.casamika" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/casamika.official/" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="ms-footer-bottom">
            <div class="container ms-footer-bottom-inner">
                <p>&copy; 2026 Casa Mika. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script type="module" src="/script.js"></script>
</body>

</html>`;

  fs.writeFileSync(path.join(__dirname, lang, 'menu', 'index.html'), html, 'utf8');
  console.log(`Generated ${lang}/menu/index.html without price display!`);
}

['vi', 'en', 'de', 'ko'].forEach(buildMenuPage);

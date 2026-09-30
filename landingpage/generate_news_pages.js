const fs = require('fs');
const path = require('path');

const GOOGLE_RESERVE_URL = 'https://www.google.com/maps/reserve/v/dine/c/tx1PNeAwXj8?source=pa&opi=79508299&hl=vi&gei=xsq8ap2nGfek2roPv8oj&ahbb=1&sourceurl=https://www.google.com/maps/preview/place?authuser%3D0%26hl%3Dvi%26pb%3D!1m14!1s0x31421737deda4ad1:0xf6fb5ca72c7d33f!3m12!1m3!1d26061.27722053428!2d108.24709075!3d16.0497664!2m3!1f0!2f0!3f0!3m2!1i2560!2i1305!4f13.1!12m4!2m3!1i360!2i120!4i8!13m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!14m5!1swsq8aszpL_7d2roPy8Od-As:49!2s1i:0,t:150714,p:wsq8aszpL_7d2roPy8Od-As:49!7e81!12e3!17swsq8aszpL_7d2roPy8Od-As:53!15m108!1m28!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m17!3b1!4b1!5b1!6b1!9b1!13b1!14b1!17b1!20b1!21b1!22b1!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b1!21m28!1m6!1m2!1i0!2i0!2m2!1i530!2i1305!1m6!1m2!1i2510!2i0!2m2!1i2560!2i1305!1m6!1m2!1i0!2i0!2m2!1i2560!2i20!1m6!1m2!1i0!2i1285!2m2!1i2560!2i1305!22m1!1e81!29m0!30m6!3b1!6m1!2b1!7m1!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i797!39zQ2FzYSBNaWthIOKAkyBDb2ZmZWUgJiBSZXN0YXVyYW50IOKAkyBXb3Jrc3BhY2UsIMSQxrDhu51uZyBUcuG6p24gQuG6oWNoIMSQ4bqxbmcsIEFuIEjhuqNpLCBOZ8WpIEjDoG5oIFPGoW4sIMSQw6AgTuG6tW5n%26q%3DCasa%2BMika%2B%25E2%2580%2593%2BCoffee%2B%2526%2BRestaurant%2B%25E2%2580%2593%2BWorkspace,%2B%25C4%2590%25C6%25B0%25E1%25BB%259Dng%2BTr%25E1%25BA%25A7n%2BB%25E1%25BA%25A1ch%2B%25C4%2590%25E1%25BA%25B1ng,%2BAn%2BH%25E1%25BA%25A3i,%2BNg%25C5%25A9%2BH%25C3%25A0nh%2BS%25C6%25A1n,%2B%25C4%2590%25C3%25A0%2BN%25E1%25BA%25B5ng';

function getGoogleReserveUrl(lang) {
  const hl = lang === 'vi' ? 'vi' : lang === 'de' ? 'de' : lang === 'ko' ? 'ko' : 'en';
  return GOOGLE_RESERVE_URL.replace(/hl=vi/g, `hl=${hl}`).replace(/hl%3Dvi/g, `hl%3D${hl}`);
}

const newsData = {
  vi: {
    lang: 'vi',
    title: 'Tin Tức & Sự Kiện — Casa Mika',
    desc: 'Tin tức, sự kiện và những câu chuyện mới nhất từ khu vườn Casa Mika bên bờ biển Mỹ Khê, Đà Nẵng.',
    navAbout: 'Về Chúng Tôi',
    navMenu: 'Thực Đơn',
    navNews: 'Tin Tức',
    navCareer: 'Tuyển Dụng',
    navReserve: 'Đặt Bàn',
    eyebrow: '— Tin Tức & Sự Kiện',
    heroTitle: 'Những câu chuyện mới,<br><em>bên chiếc bàn vườn.</em>',
    heroSub: 'Cập nhật về các đêm nhạc piano, thực đơn theo mùa và những khoảnh khắc đáng nhớ tại Casa Mika.',
    followInsta: 'Theo Dõi Instagram',
    backHome: 'Về Trang Chủ',
    articles: [
      {
        tag: 'Âm Nhạc & Không Gian',
        title: 'Mỗi tối, một phím đàn bên quầy bar rượu vang',
        desc: 'Từ 19:00 mỗi đêm, tiếng đàn piano acoustic ngân vang bên cạnh quầy bar cẩm thạch trắng và tủ rượu vang kịch trần, mang đến không gian thưởng thức ẩm thực lắng đọng.',
        date: 'Tháng 10, 2026',
        img: '/image/venue/bar-piano.jpg'
      },
      {
        tag: 'Ẩm Thực',
        title: 'Ra mắt thực đơn hải sản nướng mỡ hành & vang trắng',
        desc: 'Hàu sữa tươi nướng mỡ hành thơm lừng kết hợp cùng các dòng vang trắng tuyển chọn từ vùng Bordeaux và Marlborough.',
        date: 'Mùa Thu, 2026',
        img: '/image/menu-items/food/hau-nuong-mo-hanh.jpg'
      },
      {
        tag: 'Sự Kiện Riêng',
        title: 'Đặt tiệc riêng và đám cưới thân mật tại khu vườn 1.400m²',
        desc: 'Không gian nhà kính và sân vườn mở sẵn sàng cho các buổi tiệc kỷ niệm, sinh nhật và tiệc tối doanh nghiệp với dịch vụ tinh tế.',
        date: 'Năm 2026',
        img: '/image/venue/wine-wall.jpg'
      }
    ]
  },
  en: {
    lang: 'en',
    title: 'News & Events — Casa Mika',
    desc: 'Latest news, culinary events, and stories from Casa Mika garden table by My Khe Beach, Da Nang.',
    navAbout: 'About',
    navMenu: 'Menu',
    navNews: 'News',
    navCareer: 'Career',
    navReserve: 'Reserve',
    eyebrow: '— News & Stories',
    heroTitle: 'Fresh stories,<br><em>around the garden table.</em>',
    heroSub: 'Updates on nightly piano sessions, seasonal menus, and intimate private gatherings at Casa Mika.',
    followInsta: 'Follow on Instagram',
    backHome: 'Back to Home',
    articles: [
      {
        tag: 'Music & Atmosphere',
        title: 'Nightly piano melodies beside the wine wall',
        desc: 'Every evening from 19:00, acoustic piano notes drift past the white marble bar and soaring wine display, complementing intimate dinner conversations.',
        date: 'October, 2026',
        img: '/image/venue/bar-piano.jpg'
      },
      {
        tag: 'Culinary Selection',
        title: 'Introducing charcoal grilled oysters with scallion oil',
        desc: 'Freshly shucked oysters grilled with fragrant scallion oil, paired harmoniously with curated white wines from our cellar.',
        date: 'Autumn, 2026',
        img: '/image/menu-items/food/hau-nuong-mo-hanh.jpg'
      },
      {
        tag: 'Private Gatherings',
        title: 'Intimate celebrations across our 1,400m² garden estate',
        desc: 'The glasshouse and verdant courtyard open for weddings, milestone anniversaries, and bespoke private dinners.',
        date: 'Year 2026',
        img: '/image/venue/wine-wall.jpg'
      }
    ]
  },
  de: {
    lang: 'de',
    title: 'Aktuelles — Casa Mika',
    desc: 'Neuigkeiten, Veranstaltungen und Notizen aus dem Casa Mika Garten am My Khe Strand, Da Nang.',
    navAbout: 'Über uns',
    navMenu: 'Speisekarte',
    navNews: 'Aktuelles',
    navCareer: 'Karriere',
    navReserve: 'Reservieren',
    eyebrow: '— Aktuelles & Impressionen',
    heroTitle: 'Neue Geschichten,<br><em>an der Gartentafel.</em>',
    heroSub: 'Erfahren Sie mehr über abendliche Piano-Konzerte, saisonale Menüs und besondere Momente bei Casa Mika.',
    followInsta: 'Auf Instagram folgen',
    backHome: 'Zur Startseite',
    articles: [
      {
        tag: 'Musik & Ambiente',
        title: 'Abendliche Pianoklänge neben der Weinwand',
        desc: 'Täglich ab 19:00 Uhr untermalen sanfte Klavierklänge an der Marmorbar die abendliche Atmosphäre für anregende Gespräche.',
        date: 'Oktober 2026',
        img: '/image/venue/bar-piano.jpg'
      },
      {
        tag: 'Kulinarik',
        title: 'Gegrillte Austern mit Frühlingszwiebelöl & feine Weißweine',
        desc: 'Frische Austern, schonend auf Holzkohle gegrillt, harmonisch abgestimmt auf Spitzenweine unserer Glasvitrine.',
        date: 'Herbst 2026',
        img: '/image/menu-items/food/hau-nuong-mo-hanh.jpg'
      },
      {
        tag: 'Private Feiern',
        title: 'Exklusive Feierlichkeiten im 1.400m² Gartenparadies',
        desc: 'Unser Glashaus und die Gartenterrasse bieten den perfekten Rahmen für Hochzeiten, Geburtstage und Firmenevents.',
        date: 'Jahr 2026',
        img: '/image/venue/wine-wall.jpg'
      }
    ]
  },
  ko: {
    lang: 'ko',
    title: '소식 & 이벤트 — Casa Mika',
    desc: '다낭 미케 비치 옆 까사 미카 정원에서 전하는 새로운 소식과 이벤트.',
    navAbout: '소개',
    navMenu: '메뉴',
    navNews: '소식',
    navCareer: '채용',
    navReserve: '예약하기',
    eyebrow: '— 소식 & 프레스',
    heroTitle: '정원 식탁에서 전하는<br><em>새로운 이야기.</em>',
    heroSub: '매일 밤 펼쳐지는 라이브 피아노, 제철 식재료로 빚어낸 미식, 프라이빗 이벤트 소식을 전합니다.',
    followInsta: '인스타그램 팔로우',
    backHome: '홈으로 돌아가기',
    articles: [
      {
        tag: '음악 & 공간',
        title: '와인 월 곁에서 울려 퍼지는 매일 밤의 피아노 선율',
        desc: '매일 저녁 7시부터 화이트 마블 바와 웅장한 와인 장식장 곁에서 라이브 피아노와 어쿠스틱 연주가 시작됩니다.',
        date: '2026년 10월',
        img: '/image/venue/bar-piano.jpg'
      },
      {
        tag: '미식 셀렉션',
        title: '파기름 구이 굴 요리와 화이트 와인 페어링',
        desc: '숯불 향 가득한 신선한 굴 구이와 까사 미카 셀러의 엄선된 화이트 와인이 완벽한 마리아주를 선사합니다.',
        date: '2026년 가을',
        img: '/image/menu-items/food/hau-nuong-mo-hanh.jpg'
      },
      {
        tag: '프라이빗 이벤트',
        title: '1,400m² 정원과 온실에서 펼쳐지는 특별한 연회',
        desc: '소규모 웨딩, 기념일 만찬, 기업 행사를 위한 맞춤형 다이닝과 품격 있는 서비스를 경험해 보세요.',
        date: '2026년 연중',
        img: '/image/venue/wine-wall.jpg'
      }
    ]
  }
};

function generateNewsPage(lang) {
  const d = newsData[lang];
  const outDir = path.join(__dirname, lang, 'news');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const articlesHtml = d.articles.map(a => `
        <article class="ms-dish-card fade-up" style="border-radius:14px;">
            <div class="ms-dish-img-wrap" style="aspect-ratio: 16/10;">
                <img src="${a.img}" alt="${a.title}" class="ms-dish-img" loading="lazy">
            </div>
            <div class="ms-dish-body" style="padding: 1.5rem;">
                <div style="margin-bottom: 0.5rem; display:flex; justify-content:space-between; align-items:center;">
                    <span class="ms-dish-cat">${a.tag}</span>
                    <span style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-text);">${a.date}</span>
                </div>
                <h3 class="ms-dish-name" style="font-size:1.25rem; margin-bottom:0.75rem;">${a.title}</h3>
                <p style="font-size:0.9rem; color:rgba(245,237,214,0.72); line-height:1.6; margin:0;">${a.desc}</p>
            </div>
        </article>
  `).join('\n');

  const localeMap = { vi: 'vi_VN', en: 'en_US', de: 'de_DE', ko: 'ko_KR' };
  const html = `<!DOCTYPE html>
<html lang="${d.lang}">
<head>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PD796LGB');</script>
    <!-- End Google Tag Manager -->

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#1A1410">
    <script src="/gate.js"></script>
    <script>try { localStorage.setItem('mika-lang', '${d.lang}'); } catch (e) { }</script>
    <meta name="description" content="${d.desc}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

    <!-- Open Graph / Facebook / Zalo -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Casa Mika">
    <meta property="og:locale" content="${localeMap[d.lang] || 'en_US'}">
    <meta property="og:url" content="https://casamika.com/${d.lang}/news/">
    <meta property="og:title" content="${d.title}">
    <meta property="og:description" content="${d.desc}">
    <meta property="og:image" content="https://casamika.com/image/image3d.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Casa Mika News & Events">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${d.title}">
    <meta name="twitter:description" content="${d.desc}">
    <meta name="twitter:image" content="https://casamika.com/image/image3d.jpg">

    <title>${d.title}</title>

    <link rel="icon" type="image/png" href="/image/logo/logo-new.png">
    <link rel="apple-touch-icon" href="/image/logo/logo-new.png">
    <link rel="canonical" href="https://casamika.com/${d.lang}/news/">
    <link rel="alternate" hreflang="en" href="https://casamika.com/en/news/">
    <link rel="alternate" hreflang="vi" href="https://casamika.com/vi/news/">
    <link rel="alternate" hreflang="de" href="https://casamika.com/de/news/">
    <link rel="alternate" hreflang="ko" href="https://casamika.com/ko/news/">
    <link rel="alternate" hreflang="x-default" href="https://casamika.com/en/news/">

    <!-- Schema.org JSON-LD: BreadcrumbList -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Casa Mika",
          "item": "https://casamika.com/${d.lang}/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "${d.navNews}",
          "item": "https://casamika.com/${d.lang}/news/"
        }
      ]
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/style.css">
</head>
<body class="site-main">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PD796LGB"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <nav class="ms-nav" id="msNav">
        <div class="container ms-nav-inner">
            <a href="/${d.lang}/" class="ms-logo" aria-label="Casa Mika">
                <img src="/image/logo/logo-new.png" alt="Casa Mika" onerror="this.outerHTML='<span class=&quot;ms-logo-text&quot;>CASA MIKA</span>';">
            </a>
            <div class="ms-nav-links" id="msNavLinks">
                <a href="/${d.lang}/#story" class="ms-nav-link">${d.navAbout}</a>
                <a href="/${d.lang}/menu/" class="ms-nav-link">${d.navMenu}</a>
                <a href="/${d.lang}/news/" class="ms-nav-link is-active" aria-current="page">${d.navNews}</a>
                <a href="/${d.lang}/career/" class="ms-nav-link">${d.navCareer}</a>
                <a href="${getGoogleReserveUrl(d.lang)}" target="_blank" rel="noopener" class="ms-btn ms-btn-outline ms-btn-sm">${d.navReserve}</a>
            </div>
            <span class="ms-lang-switch" role="group" aria-label="Language">
                <a href="/vi/news/" class="ms-lang ${d.lang === 'vi' ? 'is-active' : ''}" data-lang="vi">VI</a>
                <span class="ms-lang-sep" aria-hidden="true">|</span>
                <a href="/en/news/" class="ms-lang ${d.lang === 'en' ? 'is-active' : ''}" data-lang="en">EN</a>
                <span class="ms-lang-sep" aria-hidden="true">|</span>
                <a href="/de/news/" class="ms-lang ${d.lang === 'de' ? 'is-active' : ''}" data-lang="de">DE</a>
                <span class="ms-lang-sep" aria-hidden="true">|</span>
                <a href="/ko/news/" class="ms-lang ${d.lang === 'ko' ? 'is-active' : ''}" data-lang="ko">KO</a>
            </span>
            <button class="ms-nav-toggle" id="msNavToggle" aria-label="Menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <header class="ms-hero ms-hero-stub" id="hero">
        <div class="ms-hero-bg">
            <img src="/image/image3d.jpg" alt="" class="ms-hero-image" aria-hidden="true">
            <div class="ms-hero-overlay"></div>
        </div>
        <div class="container ms-hero-content">
            <span class="ms-hero-eyebrow fade-up">${d.eyebrow}</span>
            <h1 class="ms-hero-title fade-up delay-2">${d.heroTitle}</h1>
            <p class="ms-hero-stub-note fade-up delay-3">${d.heroSub}</p>
            <div class="ms-hero-actions fade-up delay-3">
                <a href="https://www.instagram.com/casamika.official/" target="_blank" rel="noopener" class="ms-btn ms-btn-primary ms-btn-lg">${d.followInsta}</a>
                <a href="/${d.lang}/" class="ms-btn ms-btn-outline ms-btn-lg">${d.backHome}</a>
            </div>
        </div>
    </header>

    <section class="ms-section" style="padding: 5rem 0;">
        <div class="container">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
                ${articlesHtml}
            </div>
        </div>
    </section>

    <footer class="ms-footer">
        <div class="container ms-footer-inner">
            <div class="ms-footer-brand">
                <img src="/image/logo/logo-new.png" alt="Casa Mika" onerror="this.outerHTML='<span class=&quot;ms-footer-logo-text&quot;>CASA MIKA</span>';">
                <p>A garden table by My Khe Beach.</p>
            </div>
            <div class="ms-footer-col">
                <h4>Visit</h4>
                <p>37 Trần Bạch Đằng<br>Ngũ Hành Sơn, Da Nang<br>Vietnam</p>
                <p>Mon – Fri · 07:30 – 00:00<br>Sat &amp; Sun · 07:30 – 00:30</p>
            </div>
            <div class="ms-footer-col">
                <h4>Contact</h4>
                <p><a href="tel:+84708888007">+84 708 888 007</a></p>
                <p><a href="https://zalo.me/0708888007" target="_blank" rel="noopener">Zalo · +84 708 888 007</a></p>
                <p><a href="mailto:info@casamika.com">info@casamika.com</a></p>
            </div>
            <div class="ms-footer-col">
                <h4>Follow</h4>
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

  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log(`Generated ${lang}/news/index.html`);
}

['vi', 'en', 'de', 'ko'].forEach(generateNewsPage);

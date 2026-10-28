const fs = require('fs');
const path = require('path');
const { LANGS, LANG_CODES, BADGES, getGoogleReserveUrl, localizedName, hreflangLinks, langSwitcher } = require('./lang-config');


const menuData = JSON.parse(fs.readFileSync(path.join(__dirname, 'image', 'menu-items', 'menu-data.json'), 'utf8'));
const menuManifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'image', 'menu-pages', 'menu-manifest.json'), 'utf8'));

const featuredFoodNames = ['Bò Lúc Lắc', 'Tôm Hùm Sốt Trứng Muối', 'Đĩa Nướng Tổng Hợp', 'Gỏi Bơ'];
const otherFoodNames = ['Bánh Mì Nướng Bơ', 'Bạch Tuộc Lớn Nướng Sa Tế', 'Bò Sốt Tiêu Xanh', 'Bánh Xèo Giòn Nhân Bò', 'Cá Điêu Hồng Chiên Mắm Xoài', 'Phở Bò Thượng Hạng', 'Mẹt Casa Mika', 'Casera Salad'];

const featuredDrinkNames = ['Cà Phê Muối Đà Nẵng', 'Pink Mika Latte', 'Trà Sen Tinh Khiết', 'Cà Phê Bơ Dừa'];
const otherDrinkNames = ['Cà Phê Dừa Tuyết', 'Bạc Xỉu Sữa Mềm', 'Cà Phê Sữa Sài Gòn', 'Cappuccino Thượng Hạng', 'Caramel Macchiato Latte', 'Trà Dâu Ổi Hồng', 'Sinh Tố Bơ Đắk Lắk', 'Nước Ép Cam Tươi'];

const featuredMocktailNames = ['Sunset Over My Khe', 'Dragon Bridge Spirit', 'Casa Mika Signature Tonic', 'Midnight Garden'];
const otherMocktailNames = ['Glow Hot Tropical', 'Green Soul Botanical', 'Passion Matcha Fusion', 'Pink Pear Bliss', 'Ruby Exotic Cooler'];

function getCuratedShowcaseItems() {
  const mapItem = (item, cat, isFeatured) => ({
    ...item,
    category: cat,
    badges: BADGES[cat],
    imgSrc: `/image/menu-items/${cat}/${item.dest}`,
    isFeatured
  });

  const featuredFood = featuredFoodNames.map(n => mapItem(menuData.food.find(x => x.nameVi === n), 'food', true));
  const otherFood = otherFoodNames.map(n => mapItem(menuData.food.find(x => x.nameVi === n), 'food', false));

  const featuredDrink = featuredDrinkNames.map(n => mapItem(menuData.drink.find(x => x.nameVi === n), 'drink', true));
  const otherDrink = otherDrinkNames.map(n => mapItem(menuData.drink.find(x => x.nameVi === n), 'drink', false));

  const featuredMocktail = featuredMocktailNames.map(n => mapItem(menuData.mocktail.find(x => x.nameVi === n), 'mocktail', true));
  const otherMocktail = otherMocktailNames.map(n => mapItem(menuData.mocktail.find(x => x.nameVi === n), 'mocktail', false));

  // The 12 featured items come first: 4 Food, 4 Drink, 4 Mocktail (clean 3x4 grid)
  return [
    ...featuredFood,
    ...featuredDrink,
    ...featuredMocktail,
    ...otherFood,
    ...otherDrink,
    ...otherMocktail
  ];
}

function generateShowcaseHTML(lang) {
  const allItems = getCuratedShowcaseItems();

  const titles = {
    vi: {
      eyebrow: '— Tuyển Chọn Món Đặc Sắc',
      title: 'Hương vị Casa Mika,<br><em>chọn lọc cho bạn.</em>',
      sub: 'Khám phá các hương vị tuyển chọn đặc trưng trước khi đến với các cuốn thực đơn đầy đủ bên dưới.',
      tabAll: 'Món Nổi Bật', tabFood: 'Món Ăn', tabDrink: 'Cà Phê & Đồ Uống', tabMocktail: 'Mocktail & Cocktail',
      viewMenuBook: 'Xem Toàn Bộ Cuốn Thực Đơn (Menu Âu • Việt • Rượu)',
      viewMenuBookHint: 'Xem toàn bộ từng món ăn, đồ uống và mức giá chi tiết tại các cuốn menu bên dưới.'
    },
    en: {
      eyebrow: '— Handpicked Selection',
      title: 'Casa Mika Flavours,<br><em>curated for your table.</em>',
      sub: 'Explore handpicked signature flavours before diving into the complete menu books below.',
      tabAll: 'Featured', tabFood: 'Culinary', tabDrink: 'Coffee & Drinks', tabMocktail: 'Mocktails & Cocktails',
      viewMenuBook: 'Browse Full Menu Books (Western • Vietnamese • Wine)',
      viewMenuBookHint: 'Explore all dishes, beverages, and pricing in our interactive menu viewer below.'
    },
    de: {
      eyebrow: '— Ausgewählte Köstlichkeiten',
      title: 'Casa Mika Aromen,<br><em>für Ihren Tisch kreiert.</em>',
      sub: 'Entdecken Sie ausgewählte Spezialitäten, bevor Sie die vollständigen Menükarten unten durchblättern.',
      tabAll: 'Highlights', tabFood: 'Speisen', tabDrink: 'Kaffee & Getränke', tabMocktail: 'Mocktails & Cocktails',
      viewMenuBook: 'Vollständige Menükarten ansehen (Western • Vietnamesisch • Wein)',
      viewMenuBookHint: 'Entdecken Sie alle Speisen, Getränke und Preise im interaktiven Menü-Viewer unten.'
    },
    ko: {
      eyebrow: '— 추천 메뉴 컬렉션',
      title: '까사 미카의 풍미,<br><em>식탁을 위한 엄선.</em>',
      sub: '아래 전체 메뉴북을 감상하시기 전, 엄선된 대표 시그니처 메뉴들을 먼저 만나보세요.',
      tabAll: '대표 메뉴', tabFood: '요리', tabDrink: '커피 & 음료', tabMocktail: '목테일 & 칵테일',
      viewMenuBook: '전체 메뉴북 보기 (웨스턴 • 베트남 • 와인)',
      viewMenuBookHint: '아래 인터랙티브 뷰어에서 모든 요리, 음료 및 상세 가격을 확인하세요.'
    },
    zh: {
      eyebrow: '— 精选推荐',
      title: 'Casa Mika 风味，<br><em>为您的餐桌精心甄选。</em>',
      sub: '在翻阅下方完整菜单之前，先来品鉴我们精选的招牌风味。',
      tabAll: '精选',
      tabFood: '美食',
      tabDrink: '咖啡与饮品',
      tabMocktail: '特调饮品',
      viewMenuBook: '浏览完整菜单（西餐 • 越南菜 • 葡萄酒）',
      viewMenuBookHint: '在下方互动菜单中查看全部菜品、饮品及价格。'
    },
    th: {
      eyebrow: '— เมนูคัดสรร',
      title: 'รสชาติแห่ง Casa Mika<br><em>คัดสรรมาเพื่อโต๊ะของคุณ</em>',
      sub: 'ลิ้มลองรสชาติซิกเนเจอร์ที่เราคัดสรรมา ก่อนเปิดชมเมนูฉบับเต็มด้านล่าง',
      tabAll: 'แนะนำ',
      tabFood: 'อาหาร',
      tabDrink: 'กาแฟ & เครื่องดื่ม',
      tabMocktail: 'ม็อกเทล & ค็อกเทล',
      viewMenuBook: 'ดูเมนูฉบับเต็ม (ตะวันตก • เวียดนาม • ไวน์)',
      viewMenuBookHint: 'ชมอาหาร เครื่องดื่ม และราคาทั้งหมดได้ในเมนูแบบอินเทอร์แอคทีฟด้านล่าง'
    },
    ru: {
      eyebrow: '— Избранное',
      title: 'Вкусы Casa Mika,<br><em>подобранные для вашего стола.</em>',
      sub: 'Познакомьтесь с нашими фирменными блюдами, прежде чем открыть полные книги меню ниже.',
      tabAll: 'Избранное',
      tabFood: 'Кухня',
      tabDrink: 'Кофе и напитки',
      tabMocktail: 'Моктейли и коктейли',
      viewMenuBook: 'Полные книги меню (европейское • вьетнамское • вина)',
      viewMenuBookHint: 'Все блюда, напитки и цены — в интерактивном просмотре меню ниже.'
    }
  }[lang];

  let cardsHtml = allItems.map(item => {
    const name = localizedName(item, lang);
    const badge = item.badges[lang] || item.badges.en;
    const isHiddenInitially = !item.isFeatured;
    return `
            <article class="ms-dish-card fade-up${item.isFeatured ? ' visible' : ''}" data-category="${item.category}" data-featured="${item.isFeatured ? 'true' : 'false'}"${isHiddenInitially ? ' style="display: none;"' : ''}>
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
            <div class="ms-showcase-cta fade-up delay-1" style="margin-top: 3rem; text-align: center;">
                <a href="#menu-pdf" class="ms-btn ms-btn-primary ms-btn-lg" style="display: inline-flex; align-items: center; gap: 0.6rem;">
                    <span>${titles.viewMenuBook}</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                </a>
                <p style="margin-top: 0.85rem; font-size: 0.875rem; color: var(--color-text-muted);">${titles.viewMenuBookHint}</p>
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
      pdfSub: 'Vuốt chạm mượt mà trên điện thoại hoặc chuyển đổi giữa Menu Âu, Menu Việt và Danh Sách Rượu.',
      btnAu: 'Menu Âu',
      btnViet: 'Menu Việt',
      btnRuou: 'Menu Rượu',
      modeSwipe: 'Lướt trang',
      modeScroll: 'Cuộn liên tục',
      btnFullscreen: 'Phóng to',
      btnDownloadPdf: 'Tải PDF gốc',
      hintTapZoom: 'Chạm để phóng to toàn màn hình',
      pageCountSuffix: 'trang',
      btnPrev: 'Trang trước',
      btnNext: 'Trang sau',
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
      pdfSub: 'Smooth swipe on phone or switch between Western Menu, Vietnamese Menu, and Curated Wine Cellar.',
      btnAu: 'Western Menu',
      btnViet: 'Vietnamese Menu',
      btnRuou: 'Wine List',
      modeSwipe: 'Flip Pages',
      modeScroll: 'Continuous Scroll',
      btnFullscreen: 'Fullscreen',
      btnDownloadPdf: 'Download PDF',
      hintTapZoom: 'Tap to view fullscreen',
      pageCountSuffix: 'pages',
      btnPrev: 'Previous',
      btnNext: 'Next',
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
      pdfSub: 'Wischen Sie auf dem Smartphone durch die Seiten oder wählen Sie zwischen Western, Vietnamesisch und Wein.',
      btnAu: 'Westliches Menü',
      btnViet: 'Vietnamesisches Menü',
      btnRuou: 'Weinkarte',
      modeSwipe: 'Seiten blättern',
      modeScroll: 'Durchgehend scrollen',
      btnFullscreen: 'Vollbild',
      btnDownloadPdf: 'PDF herunterladen',
      hintTapZoom: 'Tippen für Vollbildansicht',
      pageCountSuffix: 'Seiten',
      btnPrev: 'Zurück',
      btnNext: 'Weiter',
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
      pdfTitle: '페이지 내에서 직접<br><em>메뉴북을 감상하세요.</em>',
      pdfSub: '스마트폰에서 부드럽게 넘겨보거나 양식 메뉴, 베트남 메뉴, 와인 리스트를 바로 확인하실 수 있습니다.',
      btnAu: '웨스턴 메뉴',
      btnViet: '베트남 메뉴',
      btnRuou: '와인 리스트',
      modeSwipe: '한 장씩 넘기기',
      modeScroll: '연속 스크롤',
      btnFullscreen: '전체화면',
      btnDownloadPdf: 'PDF 다운로드',
      hintTapZoom: '터치하여 전체화면 확대',
      pageCountSuffix: '페이지',
      btnPrev: '이전',
      btnNext: '다음',
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
    },
    zh: {
      lang: 'zh',
      title: '菜单 — Casa Mika 岘港',
      desc: 'Casa Mika 岘港完整菜单 — 亚欧融合料理、手工咖啡、招牌鸡尾酒与精选葡萄酒窖藏。',
      heroEyebrow: '— 菜单',
      heroTitle: '完整菜单，<br><em>为花园餐桌而备。</em>',
      heroSub: '亚欧融合的厨房、酒吧与酒单，为此时此刻、为眼前的您用心呈现。',
      pdfEyebrow: '— 完整菜单',
      pdfTitle: '无需跳转，<br><em>在此直接翻阅菜单。</em>',
      pdfSub: '手机上轻松滑动翻页，或在西餐菜单、越南菜单与精选酒单之间切换。',
      btnAu: '西餐菜单',
      btnViet: '越南菜单',
      btnRuou: '酒单',
      modeSwipe: '翻页浏览',
      modeScroll: '连续滚动',
      btnFullscreen: '全屏',
      btnDownloadPdf: '下载 PDF',
      hintTapZoom: '点击全屏查看',
      pageCountSuffix: '页',
      btnPrev: '上一页',
      btnNext: '下一页',
      navAbout: '关于我们',
      navMenu: '菜单',
      navNews: '动态',
      navCareer: '招聘',
      navReserve: '预订',
      reserveTitle: '为您在花园餐桌<br><em>留一个位置。</em>',
      reserveSub: '每日早上 07:30 营业至午夜。通过 Zalo 联系是预订最快捷的方式。',
      reserveBtn: '预订餐位',
      reserveZalo: 'Zalo 咨询',
      reserveFacebook: '访问 Facebook',
      footerBrand: '美溪海滩畔的花园餐桌。',
      footerVisitTitle: '地址',
      footerContactTitle: '联系方式',
      footerFollowTitle: '关注我们'
    },
    th: {
      lang: 'th',
      title: 'เมนู — Casa Mika ดานัง',
      desc: 'เมนูทั้งหมดของ Casa Mika ดานัง — อาหารเอเชียผสานตะวันตก กาแฟอาร์ทิซาน ค็อกเทลซิกเนเจอร์ และห้องเก็บไวน์คัดสรร',
      heroEyebrow: '— เมนู',
      heroTitle: 'เมนูฉบับเต็ม<br><em>สำหรับโต๊ะในสวน</em>',
      heroSub: 'ครัวเอเชีย-ตะวันตก บาร์ และรายการไวน์ ที่รังสรรค์ให้เข้ากับทุกช่วงเวลาและแขกทุกท่าน',
      pdfEyebrow: '— เมนูฉบับสมบูรณ์',
      pdfTitle: 'เปิดชมเมนู<br><em>ได้ทันทีที่นี่</em>',
      pdfSub: 'ปัดดูอย่างลื่นไหลบนมือถือ หรือสลับระหว่างเมนูตะวันตก เมนูเวียดนาม และรายการไวน์คัดสรร',
      btnAu: 'เมนูตะวันตก',
      btnViet: 'เมนูเวียดนาม',
      btnRuou: 'รายการไวน์',
      modeSwipe: 'พลิกหน้า',
      modeScroll: 'เลื่อนต่อเนื่อง',
      btnFullscreen: 'เต็มจอ',
      btnDownloadPdf: 'ดาวน์โหลด PDF',
      hintTapZoom: 'แตะเพื่อดูแบบเต็มจอ',
      pageCountSuffix: 'หน้า',
      btnPrev: 'ก่อนหน้า',
      btnNext: 'ถัดไป',
      navAbout: 'เกี่ยวกับเรา',
      navMenu: 'เมนู',
      navNews: 'ข่าวสาร',
      navCareer: 'ร่วมงานกับเรา',
      navReserve: 'จองโต๊ะ',
      reserveTitle: 'จองที่นั่งของคุณ<br><em>ข้างโต๊ะในสวน</em>',
      reserveSub: 'เปิดทุกวันตั้งแต่ 07:30 น. ถึงเที่ยงคืน ติดต่อผ่าน Zalo คือช่องทางที่รวดเร็วที่สุด',
      reserveBtn: 'จองโต๊ะ',
      reserveZalo: 'ทักผ่าน Zalo',
      reserveFacebook: 'เยี่ยมชม Facebook',
      footerBrand: 'โต๊ะอาหารในสวน ริมหาดหมีเคว',
      footerVisitTitle: 'ที่ตั้ง',
      footerContactTitle: 'ติดต่อ',
      footerFollowTitle: 'ติดตาม'
    },
    ru: {
      lang: 'ru',
      title: 'Меню — Casa Mika, Дананг',
      desc: 'Полное меню Casa Mika в Дананге — азиатская и европейская кухня, авторский кофе, фирменные коктейли и тщательно подобранная винная карта.',
      heroEyebrow: '— Меню',
      heroTitle: 'Полное меню<br><em>для стола в саду.</em>',
      heroSub: 'Азиатско-европейская кухня, бар и винная карта, созданные для этого часа и для каждого гостя.',
      pdfEyebrow: '— Книги меню',
      pdfTitle: 'Листайте меню<br><em>прямо здесь.</em>',
      pdfSub: 'Плавно листайте на телефоне или переключайтесь между европейским меню, вьетнамским меню и винной картой.',
      btnAu: 'Европейское меню',
      btnViet: 'Вьетнамское меню',
      btnRuou: 'Винная карта',
      modeSwipe: 'Листать',
      modeScroll: 'Прокрутка',
      btnFullscreen: 'Во весь экран',
      btnDownloadPdf: 'Скачать PDF',
      hintTapZoom: 'Нажмите для просмотра во весь экран',
      pageCountSuffix: 'стр.',
      btnPrev: 'Назад',
      btnNext: 'Далее',
      navAbout: 'О нас',
      navMenu: 'Меню',
      navNews: 'Новости',
      navCareer: 'Вакансии',
      navReserve: 'Бронь',
      reserveTitle: 'Сохраните место<br><em>за столом в саду.</em>',
      reserveSub: 'Открыто ежедневно с половины восьмого утра до полуночи. Быстрее всего связаться с нами можно через Zalo.',
      reserveBtn: 'Забронировать стол',
      reserveZalo: 'Написать в Zalo',
      reserveFacebook: 'Мы в Facebook',
      footerBrand: 'Стол в саду у пляжа Ми Кхе.',
      footerVisitTitle: 'Адрес',
      footerContactTitle: 'Контакты',
      footerFollowTitle: 'Соцсети'
    }
  }[lang];

  const showcaseSection = generateShowcaseHTML(lang);
  
  const html = `<!DOCTYPE html>
<html lang="${LANGS[lang].htmlLang}">

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
    <script>try { localStorage.setItem('mika-lang', '${meta.lang}'); } catch (e) { }</script>
    <meta name="description" content="${meta.desc}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

    <!-- Open Graph / Facebook / Zalo -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Casa Mika">
    <meta property="og:locale" content="${LANGS[lang].locale}">
    <meta property="og:url" content="https://casamika.com/${meta.lang}/menu/">
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.desc}">
    <meta property="og:image" content="https://casamika.com/image/imagenhahang.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Casa Mika Menu — Garden Dining, Fine Wine & Lounge">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${meta.title}">
    <meta name="twitter:description" content="${meta.desc}">
    <meta name="twitter:image" content="https://casamika.com/image/imagenhahang.jpg">

    <title>${meta.title}</title>

    <link rel="icon" type="image/png" href="/image/logo/logo-new.png">
    <link rel="apple-touch-icon" href="/image/logo/logo-new.png">
    <link rel="canonical" href="https://casamika.com/${meta.lang}/menu/">
    ${hreflangLinks('menu/')}

    <!-- Schema.org JSON-LD: BreadcrumbList & Menu -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Casa Mika",
          "item": "https://casamika.com/${meta.lang}/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "${meta.navMenu}",
          "item": "https://casamika.com/${meta.lang}/menu/"
        }
      ]
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
    <link rel="preload" as="image" href="/image/imagenhahang.jpg">
    <link rel="stylesheet" href="/style.css">
</head>

<body class="site-main">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PD796LGB"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

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
            ${langSwitcher(lang, 'menu/')}
            <button class="ms-nav-toggle" id="msNavToggle" aria-label="Menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- ===== Hero ===== -->
    <header class="ms-hero ms-menu-hero" id="hero">
        <div class="ms-hero-bg">
            <img src="/image/imagenhahang.jpg" alt="" class="ms-hero-image" aria-hidden="true">
            <div class="ms-hero-overlay"></div>
        </div>
        <div class="container ms-hero-content">
            <span class="ms-hero-eyebrow fade-up">${meta.heroEyebrow}</span>
            <h1 class="ms-hero-title fade-up delay-2">${meta.heroTitle}</h1>
            <p class="ms-hero-stub-note fade-up delay-3">${meta.heroSub}</p>
        </div>
    </header>

    ${showcaseSection}

    <!-- ===== INLINE INTERACTIVE MENU VIEWER ===== -->
    <section class="ms-section ms-menu-viewer-section" id="menu-pdf">
        <div class="container center-text">
            <span class="ms-eyebrow fade-up">${meta.pdfEyebrow}</span>
            <h2 class="ms-title fade-up">${meta.pdfTitle}</h2>
            <p class="ms-section-sub fade-up delay-1">${meta.pdfSub}</p>
            
            <!-- Book selector tabs -->
            <div class="ms-menu-book-tabs fade-up delay-1" role="tablist">
                <button type="button" class="ms-menu-book-tab is-active" data-book="au" role="tab" aria-selected="true">
                    <span class="tab-badge">7 ${meta.pageCountSuffix}</span>
                    <span class="tab-name">${meta.btnAu}</span>
                </button>
                <button type="button" class="ms-menu-book-tab" data-book="viet" role="tab" aria-selected="false">
                    <span class="tab-badge">15 ${meta.pageCountSuffix}</span>
                    <span class="tab-name">${meta.btnViet}</span>
                </button>
                <button type="button" class="ms-menu-book-tab" data-book="ruou" role="tab" aria-selected="false">
                    <span class="tab-badge">12 ${meta.pageCountSuffix}</span>
                    <span class="tab-name">${meta.btnRuou}</span>
                </button>
            </div>

            <!-- Toolbar: View mode toggles & Action buttons -->
            <div class="ms-menu-toolbar fade-up delay-2">
                <div class="ms-menu-mode-group">
                    <button type="button" class="ms-mode-btn is-active" data-mode="swipe" title="${meta.modeSwipe}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        <span>${meta.modeSwipe}</span>
                    </button>
                    <button type="button" class="ms-mode-btn" data-mode="scroll" title="${meta.modeScroll}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                        <span>${meta.modeScroll}</span>
                    </button>
                </div>
                
                <div class="ms-menu-action-group">
                    <button type="button" class="ms-action-btn" id="msFullscreenBtn">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                        <span>${meta.btnFullscreen}</span>
                    </button>
                    <a href="/menu/Menu%20%C3%82u%20CasaMika%2021_10.pdf" target="_blank" rel="noopener" class="ms-action-btn" id="msDownloadPdfLink">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        <span>${meta.btnDownloadPdf}</span>
                    </a>
                </div>
            </div>

            <!-- Viewer Card -->
            <div class="ms-menu-viewer-card fade-in">
                <!-- SWIPE VIEW -->
                <div class="ms-menu-swipe-view" id="msMenuSwipeView">
                    <button type="button" class="ms-viewer-nav-btn ms-viewer-prev" id="msViewerPrev" aria-label="${meta.btnPrev}">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    
                    <div class="ms-viewer-stage" id="msViewerStage">
                        <div class="ms-stage-page" id="msStagePage">
                            <img src="/image/menu-pages/au/page-1.webp" alt="Menu Casa Mika" class="ms-stage-img" id="msStageImg" draggable="false">
                            <div class="ms-stage-tap-hint">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                                <span>${meta.hintTapZoom}</span>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="ms-viewer-nav-btn ms-viewer-next" id="msViewerNext" aria-label="${meta.btnNext}">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </div>

                <!-- Page indicator pill -->
                <div class="ms-viewer-page-pill" id="msViewerPagePill">
                    <span id="msCurrentPageNum">1</span> / <span id="msTotalPagesNum">7</span>
                </div>

                <!-- CONTINUOUS SCROLL VIEW (hidden by default) -->
                <div class="ms-menu-scroll-view" id="msMenuScrollView" style="display: none;">
                    <!-- Pages dynamically rendered vertically -->
                </div>

                <!-- Thumbnails bar -->
                <div class="ms-menu-thumbs-bar" id="msMenuThumbsBar">
                    <!-- Thumbnails dynamically rendered -->
                </div>
            </div>
        </div>
    </section>

    <!-- ===== FULLSCREEN LIGHTBOX MODAL ===== -->
    <div class="ms-menu-lightbox" id="msMenuLightbox" aria-hidden="true" role="dialog">
        <div class="ms-lightbox-backdrop" id="msLightboxBackdrop"></div>
        <div class="ms-lightbox-content">
            <button type="button" class="ms-lightbox-close" id="msLightboxClose" aria-label="Đóng">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div class="ms-lightbox-nav">
                <button type="button" class="ms-lightbox-prev" id="msLightboxPrev" aria-label="${meta.btnPrev}">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div class="ms-lightbox-img-wrap" id="msLightboxImgWrap">
                    <img src="/image/menu-pages/au/page-1.webp" alt="Menu Fullscreen" class="ms-lightbox-img" id="msLightboxImg">
                </div>
                <button type="button" class="ms-lightbox-next" id="msLightboxNext" aria-label="${meta.btnNext}">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
            </div>
            <div class="ms-lightbox-footer">
                <span class="ms-lightbox-counter" id="msLightboxCounter">1 / 7</span>
            </div>
        </div>
    </div>

    <!-- Embedded Manifest for Instant Client-side Navigation -->
    <script id="msMenuManifest" type="application/json">
    ${JSON.stringify(menuManifest)}
    </script>

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

  fs.mkdirSync(path.join(__dirname, lang, 'menu'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, lang, 'menu', 'index.html'), html, 'utf8');
  console.log(`Generated ${lang}/menu/index.html with interactive menu viewer!`);
}

LANG_CODES.forEach(buildMenuPage);

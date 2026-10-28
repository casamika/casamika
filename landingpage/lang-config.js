// Shared language config for generate_homepages.js / generate_menu_pages.js / generate_news_pages.js
// Thêm ngôn ngữ mới: khai báo ở LANGS + thêm dictionary tương ứng trong từng generator + nameXx trong menu-data.json

// Thứ tự hiển thị trong dropdown: 3 ngôn ngữ chính (core) trước, các ngôn ngữ mở rộng sau vạch ngăn
const LANGS = {
  vi: { label: 'Tiếng Việt', htmlLang: 'vi', hreflang: 'vi', locale: 'vi_VN', hl: 'vi', core: true },
  en: { label: 'English', htmlLang: 'en', hreflang: 'en', locale: 'en_US', hl: 'en', core: true },
  ko: { label: '한국어', htmlLang: 'ko', hreflang: 'ko', locale: 'ko_KR', hl: 'ko', core: true },
  de: { label: 'Deutsch', htmlLang: 'de', hreflang: 'de', locale: 'de_DE', hl: 'de', core: false },
  zh: { label: '中文', htmlLang: 'zh-Hans', hreflang: 'zh-Hans', locale: 'zh_CN', hl: 'zh-CN', core: false },
  th: { label: 'ไทย', htmlLang: 'th', hreflang: 'th', locale: 'th_TH', hl: 'th', core: false },
  ru: { label: 'Русский', htmlLang: 'ru', hreflang: 'ru', locale: 'ru_RU', hl: 'ru', core: false },
};

const LANG_CODES = Object.keys(LANGS);

const BADGES = {
  food: { vi: 'Ẩm thực', en: 'Culinary', de: 'Küche', ko: '요리', zh: '美食', th: 'อาหาร', ru: 'Кухня' },
  drink: { vi: 'Đồ uống', en: 'Drink', de: 'Getränke', ko: '음료', zh: '饮品', th: 'เครื่องดื่ม', ru: 'Напиток' },
  mocktail: { vi: 'Mocktail', en: 'Mocktail', de: 'Mocktail', ko: '목테일', zh: '特调', th: 'ม็อกเทล', ru: 'Моктейль' },
};

const GOOGLE_RESERVE_URL = 'https://www.google.com/maps/reserve/v/dine/c/tx1PNeAwXj8?source=pa&opi=79508299&hl=vi&gei=xsq8ap2nGfek2roPv8oj&ahbb=1&sourceurl=https://www.google.com/maps/preview/place?authuser%3D0%26hl%3Dvi%26pb%3D!1m14!1s0x31421737deda4ad1:0xf6fb5ca72c7d33f!3m12!1m3!1d26061.27722053428!2d108.24709075!3d16.0497664!2m3!1f0!2f0!3f0!3m2!1i2560!2i1305!4f13.1!12m4!2m3!1i360!2i120!4i8!13m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!14m5!1swsq8aszpL_7d2roPy8Od-As:49!2s1i:0,t:150714,p:wsq8aszpL_7d2roPy8Od-As:49!7e81!12e3!17swsq8aszpL_7d2roPy8Od-As:53!15m108!1m28!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m17!3b1!4b1!5b1!6b1!9b1!13b1!14b1!17b1!20b1!21b1!22b1!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b1!21m28!1m6!1m2!1i0!2i0!2m2!1i530!2i1305!1m6!1m2!1i2510!2i0!2m2!1i2560!2i1305!1m6!1m2!1i0!2i0!2m2!1i2560!2i20!1m6!1m2!1i0!2i1285!2m2!1i2560!2i1305!22m1!1e81!29m0!30m6!3b1!6m1!2b1!7m1!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i797!39zQ2FzYSBNaWthIOKAkyBDb2ZmZWUgJiBSZXN0YXVyYW50IOKAkyBXb3Jrc3BhY2UsIMSQxrDhu51uZyBUcuG6p24gQuG6oWNoIMSQ4bqxbmcsIEFuIEjhuqNpLCBOZ8WpIEjDoG5oIFPGoW4sIMSQw6AgTuG6tW5n%26q%3DCasa%2BMika%2B%25E2%2580%2593%2BCoffee%2B%2526%2BRestaurant%2B%25E2%2580%2593%2BWorkspace,%2B%25C4%2590%25C6%25B0%25E1%25BB%259Dng%2BTr%25E1%25BA%25A7n%2BB%25E1%25BA%25A1ch%2B%25C4%2590%25E1%25BA%25B1ng,%2BAn%2BH%25E1%25BA%25A3i,%2BNg%25C5%25A9%2BH%25C3%25A0nh%2BS%25C6%25A1n,%2B%25C4%2590%25C3%25A0%2BN%25E1%25BA%25B5ng';

function getGoogleReserveUrl(lang) {
  const hl = (LANGS[lang] || LANGS.en).hl;
  return GOOGLE_RESERVE_URL.replace(/hl=vi/g, `hl=${hl}`).replace(/hl%3Dvi/g, `hl%3D${hl}`);
}

// item.nameVi / nameEn / nameZh ... — fallback English khi chưa có bản dịch
function localizedName(item, lang) {
  const key = 'name' + lang.charAt(0).toUpperCase() + lang.slice(1);
  return item[key] || item.nameEn;
}

// <link rel="alternate" hreflang> cho 1 trang; section = '' | 'menu/' | 'news/' | 'about/'
function hreflangLinks(section, indent = '    ') {
  const lines = LANG_CODES.map((l) => `${indent}<link rel="alternate" hreflang="${LANGS[l].hreflang}" href="https://casamika.com/${l}/${section}">`);
  lines.push(`${indent}<link rel="alternate" hreflang="x-default" href="https://casamika.com/en/${section}">`);
  return lines.join('\n').trimStart();
}

const GLOBE_SVG = '<svg class="ms-lang-globe" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/></svg>';
const CARET_SVG = '<svg class="ms-lang-caret" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 3.5l3 3 3-3"/></svg>';

// Dropdown 🌐 chọn ngôn ngữ (markup + style: .ms-lang-switch trong style.css, JS: [data-lang-dd] trong script.js)
function langSwitcher(currentLang, section, ariaLabel = 'Language', indent = '            ') {
  const i1 = indent + '    ';
  const i2 = i1 + '    ';
  const item = (l) => `${i2}<a href="/${l}/${section}" class="ms-lang ${l === currentLang ? 'is-active' : ''}" data-lang="${l}" hreflang="${LANGS[l].hreflang}" lang="${LANGS[l].htmlLang}" role="menuitem"${l === currentLang ? ' aria-current="page"' : ''}><span class="ms-lang-code">${l.toUpperCase()}</span><span class="ms-lang-name">${LANGS[l].label}</span></a>`;
  return [
    `<div class="ms-lang-switch" data-lang-dd>`,
    `${i1}<button type="button" class="ms-lang-toggle" aria-haspopup="true" aria-expanded="false" aria-label="${ariaLabel}">`,
    `${i2}${GLOBE_SVG}`,
    `${i2}<span class="ms-lang-current">${currentLang.toUpperCase()}</span>`,
    `${i2}${CARET_SVG}`,
    `${i1}</button>`,
    `${i1}<div class="ms-lang-menu" role="menu" aria-label="${ariaLabel}">`,
    ...LANG_CODES.filter((l) => LANGS[l].core).map(item),
    `${i2}<span class="ms-lang-divider" role="separator"></span>`,
    ...LANG_CODES.filter((l) => !LANGS[l].core).map(item),
    `${i1}</div>`,
    `${indent}</div>`,
  ].join('\n');
}

module.exports = { LANGS, LANG_CODES, BADGES, getGoogleReserveUrl, localizedName, hreflangLinks, langSwitcher };

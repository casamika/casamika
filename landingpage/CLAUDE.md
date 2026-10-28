# Casa Mika — Landing Pages

Site có **8 trang HTML** chạy chung style.css + script.js:

| URL             | File                | Audience              | Ngôn ngữ   | Trạng thái            |
| --------------- | ------------------- | --------------------- | ---------- | --------------------- |
| `/`             | `index.html`        | Khách lẻ EN (default) | English    | ✅ Production-ready   |
| `/vi/`          | `vi/index.html`     | Khách lẻ VN           | Tiếng Việt | ✅ Production-ready   |
| `/de/`          | `de/index.html`     | Khách lẻ DE           | Deutsch    | ✅ Production-ready   |
| `/about/`       | `about/index.html`  | Brand story           | English    | 🚧 Stub (Coming soon) |
| `/menu/`        | `menu/index.html`   | Menu page             | English    | 🚧 Stub (Coming soon) |
| `/news/`        | `news/index.html`   | Press / blog          | English    | 🚧 Stub (Coming soon) |
| `/career/`      | `career/index.html` | Tuyển dụng            | English    | 🚧 Stub (Coming soon) |
| `/doi-tac.html` | `doi-tac.html`      | Đối tác B2B           | Tiếng Việt | ✅ Production-ready   |

Stack: HTML/CSS/JS thuần, **không build step**. Deploy Vercel (push main branch → auto).

**Path convention (quan trọng):** mọi trang B2C dùng **root-absolute paths** (`/image/...`, `/style.css`, `/script.js`, `/doi-tac.html`) để code đồng nhất bất kể nested level. `doi-tac.html` vẫn dùng relative (`image/...`) — không đổi.

---

## Cấu trúc thư mục

```
landingpage/
├── index.html        # B2C EN — entry mặc định, có auto-redirect tới /vi/ hoặc /de/
├── vi/index.html     # B2C Tiếng Việt
├── de/index.html     # B2C Deutsch
├── about/index.html  # Stub — About (chờ Phase 2 content)
├── menu/index.html   # Stub — Menu (chờ Phase 3 content)
├── news/index.html   # Stub — News (chờ Phase 4 content + article subpages)
├── career/index.html # Stub — Career (chờ Phase 5 content)
├── doi-tac.html      # B2B VN partner (có back-link sang index)
├── style.css         # 1 file chung — phần MAIN SITE đánh dấu bằng banner comment
├── script.js         # 1 file chung — đều dùng null-check để chạy được trên mọi trang
├── PLAN.md           # Plan ban đầu của trang mới (đã hoàn thành)
├── CLAUDE.md         # File này
├── requirement.txt   # Python deps (pandas, openpyxl) + ghi chú vận hành
├── mika_analysis.py  # Sinh restaurant_cost_analysis_mika_casa.xlsx
├── restaurant_cost_analysis_mika_casa.xlsx
├── Casa Mika Portfolio tiếng việt.pdf   # link "Tải Hồ Sơ" trên doi-tac.html
└── image/                              # TẤT CẢ ảnh nằm trong đây
    ├── logo.png              # Logo nav + footer (mọi trang)
    ├── image3d.jpg           # Hero background + CTA bg (mọi trang)
    ├── hinh1.jpg             # Policy section (doi-tac.html)
    ├── haisan.jpg            # Signature seafood (doi-tac.html)
    ├── beeffuji.jpg          # Signature beef (doi-tac.html)
    ├── NightCocktail.jpg     # Signature cocktail (doi-tac.html)
    ├── avatar.jpg            # Asset chờ wire vào index gallery
    ├── brochure.jpg          # Asset chờ wire vào index gallery
    ├── deal.jpg              # Asset chờ wire vào index gallery
    ├── parter.jpg            # Asset chờ wire vào index gallery
    ├── 3fa202a4...jpg        # Asset chờ wire vào index "Morning"
    └── email-signature.jpg   # Chữ ký email (asset thương hiệu, chưa dùng trong web)
```

---

## Nav structure (đã restructure Phase 1)

Nav links trên 3 trang B2C (`/`, `/vi/`, `/de/`) point sang **4 trang riêng** + Reserve button (anchor `#reserve` trên homepage):

```
EN:  About    Menu    News    Career    [Reserve btn]   →   /about/  /menu/  /news/  /career/  /#reserve
VI:  Về Chúng Tôi   Thực Đơn   Tin Tức   Tuyển Dụng   [Đặt Bàn]   →   (same URLs, tạm)
DE:  Über uns   Speisekarte   News   Karriere   [Reservieren]      →   (same URLs, tạm)
```

**State quản lý:** mỗi page nav-link tự gắn `class="ms-nav-link is-active" aria-current="page"` để CSS bôi gold + underline. Style ở `style.css` (block `.ms-nav-link.is-active`).

**Sections cũ trên homepage** (`#house`, `#signature`, `#atmosphere`, `#gallery`) vẫn tồn tại nguyên — chỉ KHÔNG còn link từ nav. User vào homepage scroll vẫn thấy đầy đủ. Phase 2+ có thể move content sang dedicated pages, nhưng theo quyết định hiện tại thì giữ.

**VI/DE i18n tạm:** `/vi/index.html` và `/de/index.html` show label tiếng Việt/Đức nhưng URL vẫn point về `/about/`, `/menu/`, etc. (English). Phase 6 sẽ tạo `/vi/about/`, `/de/about/` etc. và update href.

---

## Roadmap

| Phase | Việc                                                                               | Status      |
| ----- | ---------------------------------------------------------------------------------- | ----------- |
| 0     | Plan + decisions                                                                   | ✅ Done     |
| **1** | **Nav restructure (About/Menu/News/Career) + 4 EN stub pages**                     | **✅ Done** |
| 2     | Build About page (brand story, team, atmosphere details, garden tour)              | ⏳ Next     |
| 3     | Build Menu page (signature dishes, menu sections, wine, dietary, PDF)              | ⏳          |
| 4     | Build News page index + first articles (mỗi article 1 sub-page riêng)              | ⏳          |
| 5     | Build Career page (culture, generic "Send CV" — chưa có vacancies)                 | ⏳          |
| 6     | Dịch VI + DE cho 4 trang mới, update nav href sang `/vi/about/`, `/de/about/` etc. | ⏳          |
| 7     | SEO polish: sitemap.xml, hreflang inter-page, robots.txt                           | ⏳          |

---

## i18n (7 ngôn ngữ: VI · EN · KO chính + DE · ZH · TH · RU)

### Nguồn sự thật & quy trình

- **`lang-config.js`** — danh sách ngôn ngữ (label, html lang, hreflang, og:locale, Google Reserve `hl`, core/extra), badge danh mục món, `langSwitcher()`, `hreflangLinks()`, `localizedName()`. Generator nào cũng require file này.
- Trang home / menu / news của mọi ngôn ngữ **được sinh** từ `generate_homepages.js`, `generate_menu_pages.js`, `generate_news_pages.js` (mỗi file có dictionary nội tuyến theo mã ngôn ngữ). **Không sửa tay** `{lang}/index.html`, `{lang}/menu/`, `{lang}/news/` — sửa generator rồi chạy lại.
- `npm run generate` = sinh lại toàn bộ home/menu/news + `sitemap.xml` (`generate_sitemap.js`, hreflang chéo đủ 7 ngôn ngữ).
- Tên món: `image/menu-items/menu-data.json` có `nameVi/nameEn/nameDe/nameKo/nameZh/nameTh/nameRu` (thiếu thì fallback `nameEn`).
- Trang **viết tay**: `{lang}/about/index.html` (7 bản), `career/`, `vi/career/`. Khi thêm ngôn ngữ phải cập nhật hreflang + dropdown trong các file này.
- Thêm ngôn ngữ mới: (1) thêm vào `LANGS` + `BADGES` trong `lang-config.js`, (2) thêm dictionary vào 3 generator, (3) thêm `nameXx` vào menu-data.json, (4) tạo `{lang}/about/`, (5) thêm vào `SUPPORTED` trong `index.html`, regex trong `gate.js`, input trong `vite.config.js`, map `pageWord` trong `script.js`, (6) `npm run generate`.

### Language switcher (dropdown 🌐)

- Markup sinh bởi `langSwitcher()`: `<div class="ms-lang-switch" data-lang-dd>` → nút `.ms-lang-toggle` + `.ms-lang-menu` (VI/EN/KO, vạch ngăn, DE/ZH/TH/RU).
- JS (`script.js`, block "Language dropdown"): mở/đóng, click ra ngoài, Esc, phím mũi tên; click ngôn ngữ ghi `localStorage.mika-lang`.
- Typography chữ Hán/Thái/Nga: block "MULTI-SCRIPT TYPOGRAPHY" cuối `style.css` (font hệ thống, không nghiêng giả cho zh/th).

### Auto-redirect (chỉ trên `/`)

- `index.html` gốc: `?lang=xx` (chỉ nhận mã hợp lệ) → `localStorage.mika-lang` → `navigator.languages` (lấy 2 ký tự đầu, zh-TW/zh-HK cũng vào /zh/) → mặc định `/en/`.

### Quy tắc dịch

- Brand "Casa Mika", số điện thoại, giờ mở cửa giữ nguyên. Tên cocktail tiếng Anh: RU giữ Latin, TH phiên âm, ZH dịch nghĩa (chờ chủ quán chốt).

---

## index.html (trang chính, EN)

**Tagline:** _"Where My Khe Lives Slowly"_

### Sections (theo thứ tự cuộn)

1. **Nav** (`#msNav`) — fixed, blur background khi cuộn (>30px). Mobile = hamburger drawer.
2. **Hero** (`#hero`) — fullscreen `100svh`, `image3d.jpg` background + Ken Burns zoom 22s, eyebrow address, H1 italic gold "Lives Slowly", 2 CTA: **Reserve a Table** / **Discover the Space**.
3. **The House** (`#house`) — Editorial 2-col: ảnh `image/hinh1.jpg` + text + 3 stat metas (1,400m² · 06:00–23:30 · Asian·Western).
4. **A Day at Casa Mika** (`#day`) — 4-card timeline ngang: **Morning** / **Noon** / **Evening** / **Night**, mỗi card có time + name + mood line.
5. **Signature** (`#signature`) — 3 card lớn: Asian Seafood Platter / Fuji Beef on Stone / An Thượng Night. Button **"View Full Menu — Coming Soon"** đang `disabled` (chờ menu PDF tiếng Anh).
6. **Gallery** (`#gallery`) — Masonry grid 6 ảnh (`ms-gal-tall` span 2 rows; `ms-gal-wide` span 2 cols ở desktop). Click → lightbox với keyboard (←/→/Esc) + swipe (touch).
7. **Reserve** (`#reserve`) — 2-col: text + 3 nút contact card (Call / Zalo / Maps) + Google Maps iframe embed.
8. **Footer** — Logo + Visit + Contact + Follow (FB/IG SVG icons). Bottom có dòng nhỏ link sang `doi-tac.html` cho partner.

### UI patterns đặc biệt

- **Sticky Reserve CTA** (`#msStickyCta`) — fab góc phải dưới, hiện khi cuộn qua ~85% hero, **ẩn khi đang ở Reserve section** (tránh dư thừa).
- **Mobile hamburger nav** (`#msNavToggle`) — toggle drawer fullscreen, đóng khi click link / Esc.
- **Lightbox** (`#msLightbox`) — swipe ngang prev/next, swipe xuống đóng, click ngoài đóng.

---

## doi-tac.html (trang B2B, VN)

- Có **`.back-to-main`** bar trên cùng: "← Trở về trang chính Casa Mika" → `index.html`.
- Logo trong navbar giờ link về `index.html` (trước là `#`).
- Link Zalo placeholder cũ `https://zalo.me/` đã thay thành `https://zalo.me/0708888007`.
- Footer thêm dòng hotline + Zalo.
- Còn lại nguyên bản: Hero (image3d.jpg), Giá Trị Cốt Lõi, Chính Sách, Ẩm Thực, Bảng Giá (Standard/Premium/VIP), CTA, Modal menu Unsplash.

---

## Design system (1 file `style.css`)

File chia 2 phần qua banner comment lớn:

- **Phần trên** (~lines 1–1699): tất cả CSS cho `doi-tac.html` (giữ nguyên không sửa).
- **Phần dưới** (sau banner `MAIN SITE — index.html`): CSS cho trang chính, prefix `.ms-*` + scope `.site-main`.

**Token chung (dùng cho cả 2):**

- Gold `#B8912A` · Gold light `#D4A94A` · Dark `#1A1410` · Cream `#FAF7F2`
- Heading: `'Playfair Display'`, italic em = gold
- Body: `'Inter'`
- Animation classes: `.fade-up`, `.fade-in`, `.delay-1`, `.delay-2`, `.delay-3`

### Mobile-first / iPhone optimization (CHỈ trang chính)

- **`100svh`** cho hero — fix iOS Safari address-bar height issue
- **`env(safe-area-inset-top/bottom)`** — nav, sticky CTA, footer bottom, lightbox close button (notch + home indicator)
- **`-webkit-tap-highlight-color: transparent`** — bỏ flash xám khi tap iOS
- **`min-height: 48px`** trên mọi button/contact card/lightbox button — Apple HIG touch target
- **`clamp(min, vw, max)`** cho typography — fluid scale, không cần n media queries
- **Breakpoints:** 480 / 640 / 768 / 1024 / 1280
- **Touch swipe** trong lightbox: ngang = prev/next, xuống = đóng
- **`@media (prefers-reduced-motion: reduce)`** — tắt Ken Burns + scroll pulse + hover scale
- **Backdrop-filter** có cả `-webkit-` prefix (Safari)

---

## script.js — 1 file dùng cho 2 trang

Tất cả init bằng `DOMContentLoaded`. Mỗi block đều **null-check element trước** để không vỡ khi chạy trên trang còn lại.

- **Old (doi-tac):** sticky navbar (`#navbar`), smooth scroll anchor, IntersectionObserver fade, modal menu (`#menuModal`).
- **Main site (index):**
  - `#msNav` scrolled class + `#msStickyCta` show/hide logic
  - `#msNavToggle` hamburger drawer + aria-expanded
  - `#msLightbox` click/keyboard/swipe handlers
- IntersectionObserver fade dùng chung cho cả 2 trang (cả `.fade-up`, `.fade-in` đều bắt được).

---

## Thông tin liên hệ (chốt, hard-code 2 trang)

```
Hotline:   0708 888 007       → tel:+84708888007
Zalo:      0708 888 007       → https://zalo.me/0708888007
Email:     info@casamika.com  → mailto:
Facebook:  https://www.facebook.com/official.casamika
Instagram: https://www.instagram.com/casamika.official/
Maps:      https://maps.app.goo.gl/qsTUVr82UATkvFJv5
Address:   37 Trần Bạch Đằng, Ngũ Hành Sơn, Da Nang (My Khe Beach area, Phước Mỹ ward)
Hours:     Daily, 06:00 – 23:30
```

Google Maps embed trong `index.html` dùng URL `https://maps.google.com/maps?q=37%20Tr%E1%BA%A7n%20B%E1%BA%A1ch%20%C4%90%E1%BA%B1ng%2C%20Ng%C5%A9%20H%C3%A0nh%20S%C6%A1n%2C%20Da%20Nang&output=embed` (search-by-address embed) vì share link rút gọn `maps.app.goo.gl/...` không thể nhúng iframe trực tiếp.

---

## Vận hành

```bash
# Chạy local
python3 -m http.server 8000
# → http://localhost:8000              (trang chính EN)
# → http://localhost:8000/doi-tac.html  (trang B2B VN)

# Sinh Excel phân tích chi phí
pip install -r requirement.txt
python3 mika_analysis.py

# Deploy (Vercel push-to-main)
git add .
git commit -m "..."
git push origin main
```

---

## Việc cần làm sau (TODO)

- [ ] **Menu PDF tiếng Anh** → uncomment / enable nút `#msMenuBtn` trong index.html khi có file
- [ ] **Ảnh thật** → thay 6 ảnh gallery + 4 ảnh "A Day at Casa Mika" + ảnh About bằng food photography xịn
- [ ] **Google Maps embed pin chính xác** → có thể replace bằng pb-URL từ Google Maps Share → Embed (lấy iframe gốc) cho pin Casa Mika chuẩn hơn search-by-address
- [ ] **Brand logo** — nếu có version logo nền tối cleanup hơn → thay `logo.png`

---

## Lưu ý cho session sau

- **Đường dẫn:** tất cả relative trong `landingpage/`, không có `../`. Không cần sửa khi move file.
- **2 trang dùng chung `style.css` + `script.js`** — đừng tách. Phần MAIN SITE CSS được đánh dấu rõ bằng banner comment giữa file.
- **Repo git root** ở `Casa Mika/` (thư mục cha), không phải `landingpage/`. Sibling `cost-management-casamika/` là project khác (web app FastAPI + React).
- **PLAN.md** là plan ban đầu — giờ chỉ giữ làm decision log lịch sử. Tham chiếu thực tế đọc CLAUDE.md (file này).

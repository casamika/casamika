const fs = require('fs');
const path = require('path');
const { LANGS, LANG_CODES } = require('./lang-config');

const BASE = 'https://casamika.com';
const lastmod = new Date().toISOString().slice(0, 10);

// section → [changefreq, priority cho vi/en, priority cho ngôn ngữ còn lại]
const SECTIONS = [
  ['', 'daily', '1.0', '0.9'],
  ['menu/', 'weekly', '0.9', '0.8'],
  ['about/', 'monthly', '0.8', '0.7'],
  ['news/', 'weekly', '0.8', '0.7'],
];

// Trang đơn ngữ / không có bản dịch song song
const SINGLE_PAGES = [
  ['/career/', 'monthly', '0.6'],
  ['/doi-tac.html', 'monthly', '0.7'],
  ['/soft-opening/', 'monthly', '0.5'],
];

const alternates = (section) => [
  ...LANG_CODES.map((l) => `    <xhtml:link rel="alternate" hreflang="${LANGS[l].hreflang}" href="${BASE}/${l}/${section}"/>`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/en/${section}"/>`,
].join('\n');

const urlEntry = (loc, changefreq, priority, alt = '') => `  <url>
    <loc>${loc}</loc>
${alt ? alt + '\n' : ''}    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const entries = [];
for (const [section, freq, pMain, pOther] of SECTIONS) {
  if (section === '') entries.push(urlEntry(`${BASE}/`, freq, pMain, alternates('')));
  for (const l of LANG_CODES) {
    entries.push(urlEntry(`${BASE}/${l}/${section}`, freq, l === 'vi' || l === 'en' ? pMain : pOther, alternates(section)));
  }
}
for (const [p, freq, prio] of SINGLE_PAGES) entries.push(urlEntry(`${BASE}${p}`, freq, prio));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${entries.join('\n\n')}

</urlset>
`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap.xml (${entries.length} URLs, ${LANG_CODES.length} languages)`);

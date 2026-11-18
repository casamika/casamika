import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath, pathToFileURL } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuDir = path.join(__dirname, 'menu');
const outputDir = path.join(__dirname, 'image', 'menu-pages');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Cập nhật menu: thả PDF mới vào menu/ (tên bất kỳ, miễn có chữ "Âu" / "Việt" / "Rượu"), xoá PDF cũ,
// rồi chạy `npm run menu`. Script tự đổi tên về tên cố định bên dưới để link tải PDF không bao giờ gãy.
const CANONICAL = {
  au: 'casa-mika-menu-au.pdf',
  viet: 'casa-mika-menu-viet.pdf',
  ruou: 'casa-mika-menu-ruou.pdf'
};
const KEYWORDS = { au: ['Âu', 'Au'], viet: ['Việt', 'Viet'], ruou: ['Rượu', 'Ruou'] };

function resolvePdf(key) {
  const nfc = s => s.normalize('NFC');
  const pdfs = fs.readdirSync(menuDir).filter(f => f.toLowerCase().endsWith('.pdf'));
  const dropped = pdfs.filter(f => f !== CANONICAL[key] && !Object.values(CANONICAL).includes(f)
    && KEYWORDS[key].some(k => nfc(f).includes(k)));
  if (dropped.length > 1) {
    throw new Error(`Có ${dropped.length} file PDF cho menu "${key}" trong menu/: ${dropped.join(', ')} — chỉ giữ lại 1 file.`);
  }
  if (dropped.length === 1) {
    fs.renameSync(path.join(menuDir, dropped[0]), path.join(menuDir, CANONICAL[key]));
    console.log(`Renamed: ${dropped[0]} -> ${CANONICAL[key]}`);
  }
  if (!fs.existsSync(path.join(menuDir, CANONICAL[key]))) {
    throw new Error(`Không tìm thấy PDF cho menu "${key}" trong menu/.`);
  }
  return CANONICAL[key];
}

const pdfFiles = Object.keys(CANONICAL).map(key => ({ key, filename: resolvePdf(key) }));

async function convertPdf(pdfItem) {
  const filePath = path.join(menuDir, pdfItem.filename);
  console.log(`Processing: ${pdfItem.filename}...`);
  const data = new Uint8Array(fs.readFileSync(filePath));
  
  const fontsPath = pathToFileURL(path.join(__dirname, 'node_modules', 'pdfjs-dist', 'standard_fonts')).href + '/';
  const loadingTask = pdfjsLib.getDocument({
    data,
    standardFontDataUrl: fontsPath
  });
  
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;
  console.log(`  Total pages: ${numPages}`);
  
  const pagesInfo = [];
  const hash = crypto.createHash('md5');
  const targetSubDir = path.join(outputDir, pdfItem.key);
  if (!fs.existsSync(targetSubDir)) {
    fs.mkdirSync(targetSubDir, { recursive: true });
  }
  // Xoá trang cũ để không sót page-N.webp thừa khi menu mới ít trang hơn
  for (const f of fs.readdirSync(targetSubDir)) {
    if (/^page-\d+\.webp$/.test(f)) fs.unlinkSync(path.join(targetSubDir, f));
  }

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    // Scale for crisp display on high DPI mobile (width around 1000px - 1400px)
    const unscaledViewport = page.getViewport({ scale: 1.0 });
    const targetWidth = 1200;
    const scale = targetWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });
    
    const canvas = createCanvas(Math.round(viewport.width), Math.round(viewport.height));
    const ctx = canvas.getContext('2d');
    
    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;
    
    const pngBuffer = canvas.toBuffer('image/png');
    const webpFilename = `page-${pageNum}.webp`;
    const webpPath = path.join(targetSubDir, webpFilename);
    
    // Save as optimized WebP
    await sharp(pngBuffer)
      .webp({ quality: 85, effort: 4 })
      .toFile(webpPath);
      
    hash.update(fs.readFileSync(webpPath));
    const stat = fs.statSync(webpPath);
    console.log(`  Page ${pageNum}/${numPages} saved: ${webpFilename} (${Math.round(stat.size / 1024)} KB)`);
    
    pagesInfo.push({
      page: pageNum,
      src: `/image/menu-pages/${pdfItem.key}/${webpFilename}`,
      width: Math.round(viewport.width),
      height: Math.round(viewport.height)
    });
  }
  
  return {
    key: pdfItem.key,
    title: pdfItem.filename.replace('.pdf', ''),
    pdf: `/menu/${pdfItem.filename}`,
    // Đổi mỗi khi nội dung trang đổi → script.js gắn ?v= để trình duyệt/CDN không giữ ảnh menu cũ
    version: hash.digest('hex').slice(0, 8),
    totalPages: numPages,
    pages: pagesInfo
  };
}

async function main() {
  const manifest = {};
  for (const item of pdfFiles) {
    manifest[item.key] = await convertPdf(item);
  }
  fs.writeFileSync(path.join(outputDir, 'menu-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Finished converting all PDFs! Manifest saved.');
}

main().catch(err => {
  console.error('Error converting PDF:', err);
  process.exit(1);
});

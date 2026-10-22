import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuDir = path.join(__dirname, 'menu');
const outputDir = path.join(__dirname, 'image', 'menu-pages');
const manifestPath = path.join(outputDir, 'menu-manifest.json');

const filesInMenu = fs.readdirSync(menuDir);
const ruouFilename = filesInMenu.find(f => f.endsWith('.pdf') && !f.includes('Âu') && !f.includes('Việt') && !f.includes('Au') && f !== 'index.html');

console.log('Found Ruou PDF:', ruouFilename);

async function convertRuou() {
  const filePath = path.join(menuDir, ruouFilename);
  const data = new Uint8Array(fs.readFileSync(filePath));
  const fontsPath = pathToFileURL(path.join(__dirname, 'node_modules', 'pdfjs-dist', 'standard_fonts')).href + '/';
  const pdfDoc = await (await pdfjsLib.getDocument({ data, standardFontDataUrl: fontsPath }).promise);
  const numPages = pdfDoc.numPages;
  console.log('Total pages:', numPages);
  const pagesInfo = [];
  const targetSubDir = path.join(outputDir, 'ruou');
  if (!fs.existsSync(targetSubDir)) fs.mkdirSync(targetSubDir, { recursive: true });
  for (let p = 1; p <= numPages; p++) {
    const page = await pdfDoc.getPage(p);
    const uv = page.getViewport({ scale: 1.0 });
    const scale = 1200 / uv.width;
    const vp = page.getViewport({ scale });
    const canvas = createCanvas(Math.round(vp.width), Math.round(vp.height));
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    const webpPath = path.join(targetSubDir, 'page-' + p + '.webp');
    await sharp(canvas.toBuffer('image/png')).webp({ quality: 85, effort: 4 }).toFile(webpPath);
    const sz = fs.statSync(webpPath).size;
    console.log('Page', p + '/' + numPages, 'saved (' + Math.round(sz/1024) + ' KB)');
    pagesInfo.push({ page: p, src: '/image/menu-pages/ruou/page-' + p + '.webp', width: Math.round(vp.width), height: Math.round(vp.height) });
  }
  let manifest = {};
  if (fs.existsSync(manifestPath)) manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest['ruou'] = { key: 'ruou', title: ruouFilename.replace('.pdf',''), totalPages: numPages, pages: pagesInfo };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Done! ruou =', numPages, 'pages');
}
convertRuou().catch(e => { console.error(e); process.exit(1); });

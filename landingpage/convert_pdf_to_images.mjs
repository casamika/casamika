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

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const filesInMenu = fs.readdirSync(menuDir);

const pdfFiles = [
  { key: 'au', filename: filesInMenu.find(f => f.includes('Âu')) },
  { key: 'viet', filename: filesInMenu.find(f => f.includes('Việt')) },
  { key: 'ruou', filename: filesInMenu.find(f => f.includes('rượu')) }
];

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
  const targetSubDir = path.join(outputDir, pdfItem.key);
  if (!fs.existsSync(targetSubDir)) {
    fs.mkdirSync(targetSubDir, { recursive: true });
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

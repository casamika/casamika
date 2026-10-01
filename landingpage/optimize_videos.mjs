import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import faststart from 'faststart';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoDir = path.join(__dirname, 'video');

const videos = [
  'video-highlight-1.mp4',
  'video-highlight-2.mp4'
];

async function processVideo(videoName) {
  const inputPath = path.join(videoDir, videoName);
  const tempPath = path.join(videoDir, `temp-${videoName}`);
  
  console.log(`Processing faststart for ${videoName}...`);
  
  await new Promise((resolve, reject) => {
    const readStream = faststart.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(tempPath);
    
    readStream.pipe(writeStream);
    writeStream.on('finish', () => {
      console.log(`Finished streaming ${videoName}`);
      resolve();
    });
    readStream.on('error', reject);
    writeStream.on('error', reject);
  });
  
  // Replace original file
  fs.unlinkSync(inputPath);
  fs.renameSync(tempPath, inputPath);
  console.log(`Replaced ${videoName} with faststart version!`);
}

async function main() {
  for (const v of videos) {
    await processVideo(v);
  }
  console.log('All videos optimized with faststart!');
}

main().catch(err => {
  console.error('Faststart failed:', err);
});

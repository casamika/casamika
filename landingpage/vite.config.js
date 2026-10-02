import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const files = ['script.js', 'gate.js', 'robots.txt', 'sitemap.xml']
      for (const f of files) {
        const src = resolve(__dirname, f)
        const dest = resolve(dist, f)
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest)
          console.log(`[copy-static-assets] Copied ${f} -> dist/${f}`)
        }
      }
      const menuDir = resolve(__dirname, 'menu')
      const distMenuDir = resolve(dist, 'menu')
      if (fs.existsSync(menuDir) && fs.existsSync(distMenuDir)) {
        for (const f of fs.readdirSync(menuDir)) {
          if (f.endsWith('.pdf')) {
            fs.copyFileSync(resolve(menuDir, f), resolve(distMenuDir, f))
            console.log(`[copy-static-assets] Copied menu/${f} -> dist/menu/${f}`)
          }
        }
      }
      // Ensure menu-pages, posters, and assets exist in dist
      const menuPagesSrc = resolve(__dirname, 'image/menu-pages')
      const menuPagesDest = resolve(dist, 'image/menu-pages')
      if (fs.existsSync(menuPagesSrc)) {
        if (!fs.existsSync(resolve(dist, 'image'))) fs.mkdirSync(resolve(dist, 'image'), { recursive: true })
        fs.cpSync(menuPagesSrc, menuPagesDest, { recursive: true })
        console.log(`[copy-static-assets] Copied image/menu-pages/ -> dist/image/menu-pages/`)
      }

      const videoDirSrc = resolve(__dirname, 'video')
      const videoDirDest = resolve(dist, 'video')
      if (fs.existsSync(videoDirSrc)) {
        fs.cpSync(videoDirSrc, videoDirDest, { recursive: true })
        console.log(`[copy-static-assets] Copied video/ -> dist/video/`)
      }

      // Ensure critical direct-referenced images (OG image, posters, logos) exist in dist/image/
      const imgCopies = [
        'image/reel-poster-1.webp',
        'image/reel-poster-2.webp',
        'image/imagenhahang.jpg',
        'image/imagenhahang.webp',
        'image/imagenhahang.png',
        'image/hero/imagenhahang.jpg',
        'image/hero/imagenhahang.webp',
        'image/hero/imagenhahang.png',
        'image/logo.png',
        'image/logo/logo-new.png',
      ]
      for (const rel of imgCopies) {
        const src = resolve(__dirname, rel)
        const dest = resolve(dist, rel)
        if (fs.existsSync(src)) {
          const destDir = resolve(dest, '..')
          if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })
          fs.copyFileSync(src, dest)
          console.log(`[copy-static-assets] Copied ${rel} -> dist/${rel}`)
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [copyStaticAssets()],
  // Serve the landingpage folder as root
  root: '.',

  // Dev server config
  server: {
    port: 3000,
    open: true,
    host: true,
  },

  // Build output
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        vi: resolve(__dirname, 'vi/index.html'),
        en: resolve(__dirname, 'en/index.html'),
        de: resolve(__dirname, 'de/index.html'),
        ko: resolve(__dirname, 'ko/index.html'),
        vi_menu: resolve(__dirname, 'vi/menu/index.html'),
        en_menu: resolve(__dirname, 'en/menu/index.html'),
        de_menu: resolve(__dirname, 'de/menu/index.html'),
        ko_menu: resolve(__dirname, 'ko/menu/index.html'),
        vi_about: resolve(__dirname, 'vi/about/index.html'),
        en_about: resolve(__dirname, 'en/about/index.html'),
        de_about: resolve(__dirname, 'de/about/index.html'),
        ko_about: resolve(__dirname, 'ko/about/index.html'),
        vi_news: resolve(__dirname, 'vi/news/index.html'),
        en_news: resolve(__dirname, 'en/news/index.html'),
        de_news: resolve(__dirname, 'de/news/index.html'),
        ko_news: resolve(__dirname, 'ko/news/index.html'),
        menu: resolve(__dirname, 'menu/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        news: resolve(__dirname, 'news/index.html'),
        career: resolve(__dirname, 'career/index.html'),
        vi_career: resolve(__dirname, 'vi/career/index.html'),
        soft_opening: resolve(__dirname, 'soft-opening/index.html'),
      },
    },
  },
})


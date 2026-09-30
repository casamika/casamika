import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
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
        soft_opening: resolve(__dirname, 'soft-opening/index.html'),
      },
    },
  },
})


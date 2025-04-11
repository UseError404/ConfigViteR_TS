import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(), // Для работы с SVG как с React-компонентами
    visualizer({ open: true }), // Визуализация бандла (опционально)
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      mozjpeg: { quality: 75 },
      optipng: { optimizationLevel: 5 },
      pngquant: { quality: [0.7, 0.8] },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly', // CSS Modules в camelCase
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@shared/styles/_variables.scss"; @import "@shared/styles/_mixins.scss";`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделение бандла на чанки (опционально)
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
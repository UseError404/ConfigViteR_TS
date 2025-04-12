import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
import viteImagemin from 'vite-plugin-imagemin';
import stylelint from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Опции SVGR (необязательно)
      svgrOptions: {
        icon: true,          // Оптимизировать SVG как иконки
        replaceAttrValues: {
          '#000': 'currentColor', // Заменяет цвет на currentColor (чтобы управлять через CSS)
        },
      },
    }), // Для работы с SVG как с React-компонентами
    visualizer({
      open: true,      // Автоматически открыть отчет после сборки
      filename: 'stats.html', // Имя файла с отчетом
    }), // Визуализация бандла (опционально)
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
    }),
    stylelint({
      fix: true,
      include: ['src/**/*.{css,scss,sass,less}'], // Расширьте список поддерживаемых файлов
      exclude: ['node_modules'], // Исключите node_modules
      cache: true, // Включите кеширование для производительности
      emitError: true,
      emitWarning: true,
    }),
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
      localsConvention: 'camelCase', // button--disabled → buttonDisabled
      generateScopedName: '[name]__[local]__[hash:base64:5]', // Пример: Button__button__a1b2c
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@shared/styles/variables.scss" as *;`,
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



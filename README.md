# React + TypeScript + Vite

Что добавили:
✅ SCSS/SASS (sass);
✅ PostCSS + Autoprefixer (postcss, autoprefixer);
✅ SVGR (vite-plugin-svgr) позволяет импортировать SVG как React-компоненты;
✅ Алиасы – Короткие пути (@/, @shared/ и т. д.);
✅ CSS Modules – Изоляция стилей с поддержкой camelCase;
✅ Code Splitting – Разделение бандла через manualChunks;
✅ Анализ бандла (rollup-plugin-visualizer);
✅ Нормализация стилей (normalize.css / modern-normalize);
✅ Stylelint (stylelint, stylelint-config-standard-scss);
✅ Pre-commit хуки (husky, lint-staged);
✅ Оптимизация файлов: JPEG | PNG | GIF | SVG.

SVGR ============================================
import Icon from './icon.svg?react'; // Добавляем ?react
function ModernComponent() {
    return (
        <div>
            <Icon width={24} height={24} className="red-icon" />
        </div>
    );
}
=================================================

Alias ===========================================
Настройка TypeScript (tsconfig.json)
{
"compilerOptions": {
"baseUrl": "./",
"paths": {
"@/*": ["src/*"],
"@components/*": ["src/shared/ui/*"],
"@styles/*": ["src/shared/styles/*"]
}
}
}
-------------------------------------------------

без алиасов
import Button from '../../../../shared/ui/Button';
import variables from '../../../../shared/styles/_variables.scss';

с алиасами
import Button from '@components/Button';
import variables from '@styles/_variables';
=================================================

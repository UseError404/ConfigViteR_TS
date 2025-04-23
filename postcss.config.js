export default {
    plugins: {
        autoprefixer: {
            grid: true,
        },
        cssnano: {
            preset: 'default', // Уровень оптимизации
            discardComments: { removeAll: true }, // Удалить все комментарии
            mergeRules: true, // Объединить дублирующиеся правила
        },
    },
};

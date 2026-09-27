# landing-6

- Источник: собственный локальный мокап `apps/mockups/public/legacy/landing-6/index.html`; 1 страница. В материалах не указан внешний сайт-первоисточник.
- Angular-маршрут: `/landing-6`.
- Структура: `index/index.ts`, `index/index.html`, `index/blocks/<block>.ts` и соседний `index/blocks/<block>.html`.
- Каждый визуальный блок реализован отдельным Angular-компонентом с обычным `templateUrl`; HTML не кодируется в TypeScript и не подгружается через fetch.
- Визуальные состояния и интерактивность исходника должны быть перенесены в Angular-компоненты и директивы; оригинальные ресурсы архива остаются неизменными.
- Все относительные ресурсы в шаблонах преобразованы в локальные адреса из `/legacy/landing-6/`.
- Источники стилей: `/legacy/shared/fonts.css`, `/legacy/landing-6/tailwind.generated.css`, `https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;0,6..96,900;1,6..96,400;1,6..96,700&family=Jost:wght@300;400;500;600&display=swap`.
- Подлежащие переносу сценарии исходного JavaScript: `/legacy/shared/page.js`, `/landings/landing-6/app.js`.

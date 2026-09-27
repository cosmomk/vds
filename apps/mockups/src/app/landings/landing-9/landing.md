# landing-9

- Источник: собственный локальный мокап `apps/mockups/public/legacy/landing-9/index.html`; 1 страница. В материалах не указан внешний сайт-первоисточник.
- Angular-маршрут: `/landing-9`.
- Структура: `index/index.ts`, `index/index.html`, `index/blocks/<block>.ts` и соседний `index/blocks/<block>.html`.
- Каждый визуальный блок реализован отдельным Angular-компонентом с обычным `templateUrl`; HTML не кодируется в TypeScript и не подгружается через fetch.
- Визуальные состояния и интерактивность исходника должны быть перенесены в Angular-компоненты и директивы; оригинальные ресурсы архива остаются неизменными.
- Все относительные ресурсы в шаблонах преобразованы в локальные адреса из `/legacy/landing-9/`.
- Источники стилей: `/legacy/shared/fonts.css`, `/legacy/landing-9/tailwind.generated.css`, `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap`.
- Подлежащие переносу сценарии исходного JavaScript: `/legacy/shared/page.js`, `/landings/landing-9/app.js`.

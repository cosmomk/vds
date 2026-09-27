# landing-3

- Источник: собственный локальный мокап `apps/mockups/public/legacy/landing-3/index.html`; 1 страница. В материалах не указан внешний сайт-первоисточник.
- Angular-маршрут: `/landing-3`.
- Структура: `index/index.ts`, `index/index.html`, `index/blocks/<block>.ts` и соседний `index/blocks/<block>.html`.
- Каждый визуальный блок реализован отдельным Angular-компонентом с обычным `templateUrl`; HTML не кодируется в TypeScript и не подгружается через fetch.
- Визуальные состояния и интерактивность исходника должны быть перенесены в Angular-компоненты и директивы; оригинальные ресурсы архива остаются неизменными.
- Все относительные ресурсы в шаблонах преобразованы в локальные адреса из `/legacy/landing-3/`.
- Источники стилей: `/legacy/shared/fonts.css`, `/legacy/landing-3/tailwind.generated.css`, `https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cinzel+Decorative:wght@400;700;900&family=Raleway:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap`.
- Подлежащие переносу сценарии исходного JavaScript: `/legacy/shared/page.js`, `/landings/landing-3/app.js`.

# landing-10

- Источник: собственный локальный макет по референсам `apps/mockups/public/legacy/template-01.jpg` и `apps/mockups/public/legacy/template-02.jpg`; 1 страница. В материалах не указан внешний сайт-первоисточник.
- Angular-маршрут: `/landing-10`.
- Структура: `index/index.ts`, `index/index.html`, `index/blocks/<block>.ts` и соседний `index/blocks/<block>.html`.
- Каждый визуальный блок реализован отдельным Angular-компонентом с обычным `templateUrl`; HTML не кодируется в TypeScript и не подгружается через fetch.
- Визуальные состояния и интерактивность исходника должны быть перенесены в Angular-компоненты и директивы; оригинальные ресурсы архива остаются неизменными.
- Все относительные ресурсы в шаблонах преобразованы в локальные адреса из `/legacy/landing-10/`.
- Источники стилей: `/legacy/shared/fonts.css`, `/legacy/landing-10/tailwind.generated.css`, `https://fonts.googleapis.com/css2?family=PT+Serif&family=Montserrat:wght@400;500&display=swap`.
- Подлежащие переносу сценарии исходного JavaScript: `/landings/landing-10/app.js`.

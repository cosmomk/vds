# landing-5

- Источник: собственный локальный мокап `apps/mockups/public/legacy/landing-5/index.html`; 1 страница. В материалах не указан внешний сайт-первоисточник.
- Angular-маршрут: `/landing-5`.
- Структура: `index/index.ts`, `index/index.html`, `index/blocks/<block>.ts` и соседний `index/blocks/<block>.html`.
- Каждый визуальный блок реализован отдельным Angular-компонентом с обычным `templateUrl`; HTML не кодируется в TypeScript и не подгружается через fetch.
- В `block-1` состояние мобильного меню управляется Angular signal; в `block-3` сигнал выбирает один из трёх типизированных отзывов.
- Остальные визуальные состояния и интерактивность ещё сверяются с исходным `app.js`; до переноса и браузерной проверки его копию не удалять. Оригинальные ресурсы архива остаются неизменными.
- Все относительные ресурсы в шаблонах преобразованы в локальные адреса из `/legacy/landing-5/`.
- Источники стилей: `/legacy/shared/fonts.css`, `/legacy/landing-5/tailwind.generated.css`, `https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Raleway:wght@300;400;500;600;700&display=swap`, `https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Raleway:wght@300;400;500;600;700&display=swap`.
- Подлежащие переносу сценарии исходного JavaScript: `/legacy/shared/page.js`, `/landings/landing-5/app.js`.

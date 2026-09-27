export interface MockupEntry {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly legacyPath: string;
  readonly legacyAvailable?: boolean;
  readonly angularRoute?: string;
  readonly descriptionPath?: string;
  readonly status: 'static' | 'angular';
  readonly group: 'Сайт' | 'Референсы' | 'Материалы';
}

export const MOCKUPS: readonly MockupEntry[] = [
  {
    id: 'site',
    title: 'Shtorivdom',
    description: 'Полный многостраничный прототип сайта',
    legacyPath: 'site/',
    status: 'static',
    group: 'Сайт',
  },
  {
    id: 'emails',
    title: 'Письма',
    description: 'Все письма клиентам и уведомления салона',
    legacyPath: 'emails/',
    status: 'static',
    group: 'Сайт',
  },
  {
    id: 'landing-1',
    title: 'Landing 1',
    description: 'Интерьерный минимализм · 1 страница · источник: локальный мокап',
    legacyPath: 'landing-1/',
    angularRoute: '/landing-1',
    descriptionPath: 'landings/landing-1/landing.md',
    status: 'angular',
    group: 'Референсы',
  },
  {
    id: 'landing-2',
    title: 'Landing 2',
    description: 'Тёмный премиальный лендинг · 1 страница · источник: локальный мокап',
    legacyPath: 'landing-2/',
    angularRoute: '/landing-2',
    descriptionPath: 'landings/landing-2/landing.md',
    status: 'angular',
    group: 'Референсы',
  },
  {
    id: 'landing-3',
    title: 'Landing 3',
    description: 'Светлый журнальный лендинг · 1 страница · источник: локальный мокап',
    legacyPath: 'landing-3/',
    angularRoute: '/landing-3',
    descriptionPath: 'landings/landing-3/landing.md',
    status: 'angular',
    group: 'Референсы',
  },
  {
    id: 'landing-5',
    title: 'Landing 5',
    description: 'Фотографичный лендинг · 1 страница · источник: локальный мокап',
    legacyPath: 'landing-5/',
    angularRoute: '/landing-5',
    descriptionPath: 'landings/landing-5/landing.md',
    status: 'angular',
    group: 'Референсы',
  },
  {
    id: 'landing-6',
    title: 'Landing 6',
    description: 'Каталожная композиция · 1 страница · источник: локальный мокап',
    legacyPath: 'landing-6/',
    angularRoute: '/landing-6',
    descriptionPath: 'landings/landing-6/landing.md',
    status: 'angular',
    group: 'Референсы',
  },
  {
    id: 'landing-7',
    title: 'Landing 7',
    description: 'Редакционная композиция · 1 страница · источник: локальный мокап',
    legacyPath: 'landing-7/',
    angularRoute: '/landing-7',
    descriptionPath: 'landings/landing-7/landing.md',
    status: 'angular',
    group: 'Референсы',
  },
  {
    id: 'landing-8',
    title: 'Landing 8',
    description: 'Спокойный интерьерный лендинг · 1 страница · источник: локальный мокап',
    legacyPath: 'landing-8/',
    angularRoute: '/landing-8',
    descriptionPath: 'landings/landing-8/landing.md',
    status: 'angular',
    group: 'Референсы',
  },
  {
    id: 'landing-9',
    title: 'Landing 9',
    description: 'Тёмно-синий салон штор · 1 страница · источник: локальный мокап',
    legacyPath: 'landing-9/',
    angularRoute: '/landing-9',
    descriptionPath: 'landings/landing-9/landing.md',
    status: 'angular',
    group: 'Референсы',
  },
  {
    id: 'landing-10',
    title: 'Landing 10',
    description: 'Лендинг с формой заявки · 1 страница · источник: локальные template-01/02',
    legacyPath: 'landing-10/',
    angularRoute: '/landing-10',
    descriptionPath: 'landings/landing-10/landing.md',
    status: 'angular',
    group: 'Референсы',
  },
  {
    id: 'herenta',
    title: 'Herenta',
    description: 'Копия Herenta, 1 страница. Источник: https://www.herenta.com/',
    legacyPath: 'herenta/',
    status: 'static',
    group: 'Референсы',
  },
  {
    id: 'images',
    title: 'Изображения',
    description: 'Галерея изображений всех референсов',
    legacyPath: 'images/',
    status: 'static',
    group: 'Материалы',
  },
  {
    id: 'icons',
    title: 'Иконки',
    description: 'Галерея иконок всех референсов',
    legacyPath: 'icons/',
    status: 'static',
    group: 'Материалы',
  },
];

export const mockupById = (id: string): MockupEntry | undefined =>
  MOCKUPS.find((mockup) => mockup.id === id);

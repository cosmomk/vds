import { Route } from '@angular/router';
import { SITE_FABRICS } from '@shtorivdom/site-kit';
import { sitePages } from './site-pages';
import { SITE_URL, SeoData } from './seo';

const fabricDetailRoutes: Route[] = SITE_FABRICS.map((fabric) => {
  const title = `Ткань ${fabric.name} (${fabric.kind}) для штор | Shtorivdom`;
  const description = `${fabric.summary} Подбор и наличие подтвердит дизайнер по актуальному образцу.`;

  return {
    path: `fabrics/${fabric.key}`,
    pathMatch: 'full',
    data: {
      fabricKey: fabric.key,
      seo: {
        title,
        description,
        image: `${SITE_URL}${fabric.image}`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: `${SITE_URL}/` },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог тканей',
                item: `${SITE_URL}/fabrics/`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: fabric.name,
                item: `${SITE_URL}/fabrics/${fabric.key}/`,
              },
            ],
          },
        ],
      } satisfies SeoData,
    },
    loadComponent: () =>
      import('./pages/fabric-detail/page').then((module) => module.FabricDetailPage),
  };
});

export const appRoutes: Route[] = [
  ...sitePages,
  ...fabricDetailRoutes,
  {
    path: 'site-map',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Карта сайта — Shtorivdom',
        description: 'Основные страницы и разделы каталога Shtorivdom.',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [],
      },
    },
    loadComponent: () => import('./pages/site-map/page').then((m) => m.SiteMapPage),
  },
  {
    path: '404',
    pathMatch: 'full',
    data: {
      seo: {
        title: 'Страница не найдена — Shtorivdom',
        description:
          'К сожалению, такой страницы не существует или она удалена. Перейдите на главную страницу Shtorivdom.',
        image: 'https://shtorivdom.ru/assets/img/hero.jpg',
        jsonLd: [],
        noIndex: true,
      },
    },
    loadComponent: () => import('./pages/not-found/page').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

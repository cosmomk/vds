import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./catalog/catalog').then((module) => module.MockupCatalog),
  },
  {
    path: 'landing-1',
    title: 'Landing 1',
    loadComponent: () =>
      import('./landings/landing-1/index/index').then((module) => module.Landing1Page),
  },
  {
    path: 'landing-2',
    title: 'Landing 2',
    loadComponent: () =>
      import('./landings/landing-2/index/index').then((module) => module.Landing2Page),
  },
  {
    path: 'landing-3',
    title: 'Landing 3',
    loadComponent: () =>
      import('./landings/landing-3/index/index').then((module) => module.Landing3Page),
  },
  {
    path: 'landing-5',
    title: 'Landing 5',
    loadComponent: () =>
      import('./landings/landing-5/index/index').then((module) => module.Landing5Page),
  },
  {
    path: 'landing-6',
    title: 'Landing 6',
    loadComponent: () =>
      import('./landings/landing-6/index/index').then((module) => module.Landing6Page),
  },
  {
    path: 'landing-7',
    title: 'Landing 7',
    loadComponent: () =>
      import('./landings/landing-7/index/index').then((module) => module.Landing7Page),
  },
  {
    path: 'landing-8',
    title: 'Landing 8',
    loadComponent: () =>
      import('./landings/landing-8/index/index').then((module) => module.Landing8Page),
  },
  {
    path: 'landing-9',
    title: 'Landing 9',
    loadComponent: () =>
      import('./landings/landing-9/index/index').then((module) => module.Landing9Page),
  },
  {
    path: 'landing-10',
    title: 'Landing 10',
    loadComponent: () =>
      import('./landings/landing-10/index/index').then((module) => module.Landing10Page),
  },
  {
    path: 'view/:id',
    loadComponent: () => import('./viewer/viewer').then((module) => module.MockupViewer),
  },
  {
    path: 'descriptions/:id',
    loadComponent: () =>
      import('./description/description').then((module) => module.MockupDescription),
  },
  { path: '**', redirectTo: '' },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'country/:name',
    loadComponent: () => import('./page/country-detail/country-detail.component').then(m => m.CountryDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

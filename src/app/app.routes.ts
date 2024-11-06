import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pins',
    loadComponent: () =>
      import('./features/pins/pages/pins-list/pins-list.component').then(
        (m) => m.PinsListComponent
      ),
  },
  { path: '', redirectTo: '/pins', pathMatch: 'full' },
  { path: '**', redirectTo: '/pins', pathMatch: 'full' },
];

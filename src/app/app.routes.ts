import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login').then((m) => m.Login),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/home/home').then(
        (m) => m.Home
      ),
    canActivate: [authGuard],
  },
  {
    path: 'nuevo-envio',
    loadComponent: () =>
      import('./features/nuevo-envio/nuevo-envio.component').then(
        (m) => m.NuevoEnvioComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

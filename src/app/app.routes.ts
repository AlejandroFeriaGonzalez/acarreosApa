import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { UserRole } from './services/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    canActivate: [authGuard],
  },
  // viewer
  {
    path: 'viewer',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
    data: { role: UserRole.Viewer },
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

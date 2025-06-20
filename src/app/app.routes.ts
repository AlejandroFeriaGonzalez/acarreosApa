import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard.js';

export const routes: Routes = [
  {
    path: '',
    // Carga el componente de la página de inicio
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
  },
  {
    path: 'login',
    // Carga el componente de login
    loadComponent: () => import('./features/login/login').then((c) => c.Login),
  },
  {
    path: 'profile',
    // Carga el componente de perfil
    loadComponent: () =>
      import('./features/profile/profile').then((c) => c.Profile),
    // Protegemos la ruta con nuestra guardia funcional
    canActivate: [authGuard],
  },
  // Redirección para cualquier otra ruta
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

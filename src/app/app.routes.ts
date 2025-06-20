import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    // Carga el componente de la página de inicio
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    // Carga el componente de login
    loadComponent: () =>
      import('./features/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'profile',
    // Carga el componente de perfil
    loadComponent: () =>
      import('./features/profile/profile.component').then((c) => c.ProfileComponent),
    // Protegemos la ruta con nuestra guardia funcional
    canActivate: [authGuard], 
  },
  // Redirección para cualquier otra ruta
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Leemos directamente el valor del 'computed signal'
  if (authService.isLoggedIn()) {
    return true; // Acceso permitido
  }

  // Si no está logueado, redirigimos a /login
  return router.parseUrl('/login');
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'] as UserRole;

  if (
    !authService.isAuthenticated() ||
    authService.getUserRole()() !== expectedRole
  ) {
    router.navigate(['/login']);
    return false;
  }

  return router.navigate(['/login']);
};

import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Router } from '@angular/router';

// Definimos una interfaz para el usuario para evitar el tipo 'any'
export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  #router = inject(Router);
  currentUser = signal<User | null>(null);
  isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    // (Opcional) Un 'effect' reacciona a los cambios en una signal.
    // Útil para debugging o efectos secundarios como guardar en localStorage.
    effect(() => {
      console.log('User changed:', this.currentUser());
    });
  }

  login(): void {
    // En una app real, obtendrías el usuario de una API.
    const mockUser: User = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      avatarUrl: 'https/i.pravatar.cc/150', // Imagen de avatar de ejemplo
    };
    this.currentUser.set(mockUser);
    this.#router.navigate(['/profile']);
  }

  logout(): void {
    this.currentUser.set(null);
    this.#router.navigate(['/login']);
  }
}

import { Injectable, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';

export enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer'
}

export interface User {
  username: string;
  name: string;
  role: UserRole;
  avatarUrl?: string; // https://unavatar.io/{username}
}

const initialUser = (): User | null => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    return null;
  }
  try {
    const user = JSON.parse(storedUser);
    // Validate that the parsed object is a user
    if (user && typeof user.username === 'string' && typeof user.name === 'string' && typeof user.role === 'string') {
      return user;
    }
    return null;
  } catch (e) {
    console.error('Failed to parse user from localStorage', e);
    return null;
  }
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly VALID_USERNAME = 'sergio';
  private readonly VALID_PASSWORD = '12345678';

  private currentUser = signal<User | null>(initialUser());
  private userRole = signal<UserRole | null>(null);

  user = this.currentUser.asReadonly();
  isAuthenticated = computed(() => !!this.user());

  constructor(private router: Router) {
    effect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const user = this.currentUser();
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('currentUser');
        }
      }
    });
  }

  async login(username: string, password: string): Promise<boolean> {
    // Simular una llamada de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      const user: User = {
        username: this.VALID_USERNAME,
        name: 'Sergio García',
        role: UserRole.Admin,
        avatarUrl: `https://unavatar.io/${username}`, // URL del avatar
      };

      this.currentUser.set(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.userRole.set(null);
    this.router.navigate(['/login']);
  }

  setUserRole(role: UserRole) {
    this.userRole.set(role);
  }

  getUserRole() {
    return this.userRole.asReadonly();
  }
}

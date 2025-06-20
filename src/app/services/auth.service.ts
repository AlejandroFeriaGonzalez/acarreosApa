import { Injectable, signal } from '@angular/core';

export interface User {
  username: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly VALID_USERNAME = 'sergiogay';
  private readonly VALID_PASSWORD = '12345678';
  
  private currentUser = signal<User | null>(null);
  
  isAuthenticated = signal<boolean>(false);
  user = this.currentUser.asReadonly();

  login(username: string, password: string): boolean {
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      const user: User = {
        username: this.VALID_USERNAME,
        name: 'Sergio García',
        role: 'Coordinador de Envíos'
      };
      
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('currentUser');
  }

  checkStoredAuth(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    }
  }
}

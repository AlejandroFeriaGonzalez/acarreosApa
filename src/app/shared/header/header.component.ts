import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <a href="/order/:id/track" class="hover:underline">Tracking</a>
        <a href="/quotes" class="hover:underline">Quoting</a>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        (click)="toggleLogin()"
      >
        {{ isLoggedIn() ? 'Logout' : 'Login' }}
      </button>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private loggedIn = signal(false);

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  toggleLogin(): void {
    this.loggedIn.set(!this.loggedIn());
  }
}

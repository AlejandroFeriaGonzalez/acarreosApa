import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.user;
  userName = computed(() => this.user()?.name || '');
  userRole = computed(() => this.user()?.role || '');

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToNuevoEnvio() {
    this.router.navigate(['/nuevo-envio']);
  }
}

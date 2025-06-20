import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

  styles: [],
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginError = signal(false);
  isLoading = signal(false);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.loginError.set(false);

      // Simular delay de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { username, password } = this.loginForm.value;
      const success = this.authService.login(username!, password!);

      if (await success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError.set(true);
      }

      this.isLoading.set(false);
    }
  }
}

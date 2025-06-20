import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>AcarreosAPA</h1>
          <p>Sistema de Gestión de Envíos</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input 
              id="username"
              type="text" 
              formControlName="username"
              [class.error]="loginForm.get('username')?.invalid && loginForm.get('username')?.touched"
              placeholder="Ingresa tu usuario"
            >
            @if (loginForm.get('username')?.invalid && loginForm.get('username')?.touched) {
              <span class="error-message">El usuario es requerido</span>
            }
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              formControlName="password"
              [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
              placeholder="Ingresa tu contraseña"
            >
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <span class="error-message">La contraseña debe tener al menos 8 caracteres</span>
            }
          </div>

          @if (loginError()) {
            <div class="login-error">
              <span>Credenciales incorrectas. Intenta nuevamente.</span>
            </div>
          }

          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isLoading()"
            class="login-button"
          >
            @if (isLoading()) {
              Iniciando sesión...
            } @else {
              Iniciar Sesión
            }
          </button>
        </form>

        <div class="demo-credentials">
          <p><strong>Demo:</strong></p>
          <p>Usuario: sergiogay</p>
          <p>Contraseña: 12345678</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      padding: 40px;
      width: 100%;
      max-width: 400px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .login-header h1 {
      color: #333;
      margin: 0 0 10px 0;
      font-size: 2rem;
    }

    .login-header p {
      color: #666;
      margin: 0;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #333;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      transition: border-color 0.3s;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    input.error {
      border-color: #e74c3c;
    }

    .error-message {
      color: #e74c3c;
      font-size: 14px;
      margin-top: 5px;
      display: block;
    }

    .login-error {
      background: #fee;
      color: #c33;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 20px;
      text-align: center;
    }

    .login-button {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 15px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: opacity 0.3s;
    }

    .login-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .login-button:not(:disabled):hover {
      opacity: 0.9;
    }

    .demo-credentials {
      margin-top: 30px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;
    }

    .demo-credentials p {
      margin: 5px 0;
      color: #666;
    }
  `],
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginError = signal(false);
  isLoading = signal(false);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.loginError.set(false);

      // Simular delay de autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { username, password } = this.loginForm.value;
      const success = this.authService.login(username!, password!);

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError.set(true);
      }

      this.isLoading.set(false);
    }
  }
}

import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <div class="header-content">
          <h1>AcarreosAPA</h1>
          <div class="user-info">
            <span>Bienvenido, {{ userName() }}</span>
            <button (click)="logout()" class="logout-btn">Cerrar Sesión</button>
          </div>
        </div>
      </header>

      <main class="dashboard-main">
        <div class="welcome-section">
          <h2>¡Bienvenido al Sistema de Gestión de Envíos!</h2>
          <p class="welcome-subtitle">{{ userRole() }}</p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📦</div>
            <div class="stat-content">
              <h3>156</h3>
              <p>Envíos Activos</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🚚</div>
            <div class="stat-content">
              <h3>23</h3>
              <p>En Tránsito</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <h3>342</h3>
              <p>Entregados Hoy</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-content">
              <h3>12</h3>
              <p>Urgentes</p>
            </div>
          </div>
        </div>

        <div class="actions-section">
          <h3>Acciones Rápidas</h3>
          <div class="actions-grid">
            <button class="action-card">
              <div class="action-icon">➕</div>
              <span>Nuevo Envío</span>
            </button>

            <button class="action-card">
              <div class="action-icon">🔍</div>
              <span>Rastrear Paquete</span>
            </button>

            <button class="action-card">
              <div class="action-icon">📊</div>
              <span>Reportes</span>
            </button>

            <button class="action-card">
              <div class="action-icon">👥</div>
              <span>Clientes</span>
            </button>
          </div>
        </div>

        <div class="recent-activity">
          <h3>Actividad Reciente</h3>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">📦</div>
              <div class="activity-content">
                <p><strong>Envío #12345</strong> fue creado</p>
                <span class="activity-time">Hace 5 minutos</span>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon">🚚</div>
              <div class="activity-content">
                <p><strong>Envío #12344</strong> salió para entrega</p>
                <span class="activity-time">Hace 15 minutos</span>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon">✅</div>
              <div class="activity-content">
                <p><strong>Envío #12343</strong> fue entregado</p>
                <span class="activity-time">Hace 30 minutos</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      background: #f5f5f5;
    }

    .dashboard-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-content h1 {
      margin: 0;
      font-size: 1.8rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logout-btn {
      background: rgba(255,255,255,0.2);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .logout-btn:hover {
      background: rgba(255,255,255,0.3);
    }

    .dashboard-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 3rem;
    }

    .welcome-section h2 {
      color: #333;
      margin: 0 0 0.5rem 0;
      font-size: 2rem;
    }

    .welcome-subtitle {
      color: #666;
      font-size: 1.1rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-icon {
      font-size: 2.5rem;
    }

    .stat-content h3 {
      margin: 0;
      font-size: 2rem;
      color: #333;
    }

    .stat-content p {
      margin: 0;
      color: #666;
    }

    .actions-section h3,
    .recent-activity h3 {
      color: #333;
      margin-bottom: 1rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 3rem;
    }

    .action-card {
      background: white;
      border: none;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .action-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }

    .action-icon {
      font-size: 2rem;
    }

    .action-card span {
      color: #333;
      font-weight: 500;
    }

    .recent-activity {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .activity-icon {
      font-size: 1.5rem;
    }

    .activity-content p {
      margin: 0;
      color: #333;
    }

    .activity-time {
      color: #666;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .dashboard-main {
        padding: 1rem;
      }

      .stats-grid,
      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.user;
  userName = computed(() => this.user()?.name || '');
  userRole = computed(() => this.user()?.role || '');

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

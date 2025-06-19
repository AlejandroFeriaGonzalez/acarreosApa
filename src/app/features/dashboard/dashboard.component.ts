import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <div>
        <p>Welcome to the dashboard!</p>
        <p>Role-based content will be displayed here:</p>
        <ul>
          <li *ngIf="true">User: Active orders, Place new order button, Recent tracking updates</li>
          <li *ngIf="false">Caretaker: Assigned bison, Upcoming hauls, Map of deliveries</li>
          <li *ngIf="false">Admin: Overview metrics, User management link</li>
        </ul>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}

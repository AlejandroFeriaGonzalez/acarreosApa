import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'order/new',
    loadComponent: () =>
      import('./features/order/new-order.component').then(
        (m) => m.NewOrderComponent
      ),
  },
  {
    path: 'order/:id/track',
    loadComponent: () =>
      import('./features/order/track-order.component').then(
        (m) => m.TrackOrderComponent
      ),
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./features/inventory/inventory.component').then(
        (m) => m.InventoryComponent
      ),
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('./features/quotes/quotes.component').then(
        (m) => m.QuotesComponent
      ),
  },
];

import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { CollectorDashboardComponent } from './features/collector/collector-dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'household',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/household/household.routes').then(m => m.HOUSEHOLD_ROUTES)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminDashboardComponent,
    children: [
      // Admin routes...
    ]
  },
  {
    path: 'collector',
    canActivate: [AuthGuard],
    component: CollectorDashboardComponent,
    children: [
      // Collector routes...
    ]
  }
];

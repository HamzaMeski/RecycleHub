import { Routes } from '@angular/router';
import { HouseholdDashboardComponent } from './features/dashboard/dashboard.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { CollectorDashboardComponent } from './features/collector/collector-dashboard.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    component: HouseholdDashboardComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent
  },
  {
    path: 'collector',
    component: CollectorDashboardComponent
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

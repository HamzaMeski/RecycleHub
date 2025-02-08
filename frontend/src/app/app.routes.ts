import { Routes } from '@angular/router';
import { HouseholdDashboardComponent } from './features/household/household-dashboard.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { CollectorDashboardComponent } from './features/collector/collector-dashboard.component';
import { ProfileComponent } from './features/household/profile/profile.component';
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
    component: HouseholdDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'household/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'collector',
    component: CollectorDashboardComponent,
    canActivate: [AuthGuard]
  }
];

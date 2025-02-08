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
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HouseholdDashboardComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'collections',
        loadChildren: () => import('./features/household/collections/collections.routes')
          .then(m => m.COLLECTIONS_ROUTES)
      },
      {
        path: 'rewards',
        loadChildren: () => import('./features/household/rewards/rewards.routes')
          .then(m => m.REWARDS_ROUTES)
      }
    ]
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

import { Routes } from '@angular/router';
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
    data: { roles: ['ROLE_HOUSEHOLD'] },
    loadChildren: () => import('./features/household/household.routes').then(m => m.HOUSEHOLD_ROUTES)
  },
  {
    path: 'collector',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_COLLECTOR'] },
    loadChildren: () => import('./features/collector/collector.routes').then(m => m.COLLECTOR_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

import { Routes } from '@angular/router';
import { HouseholdDashboardComponent } from './layout/household-dashboard.component';
import { DashboardContentComponent } from './dashboard/dashboard-content.component';

export const HOUSEHOLD_ROUTES: Routes = [
  {
    path: '',
    component: HouseholdDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardContentComponent
      },
      {
        path: 'collections',
        loadChildren: () => import('./collections/collections.routes').then(m => m.COLLECTIONS_ROUTES)
      },
      {
        path: 'rewards',
        loadChildren: () => import('./rewards/rewards.routes').then(m => m.REWARDS_ROUTES)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes').then(m => m.PROFILE_ROUTES)
      }
    ]
  }
];

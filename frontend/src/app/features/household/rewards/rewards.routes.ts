import { Routes } from '@angular/router';

export const REWARDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./rewards.component')
      .then(m => m.RewardsComponent)
  }
];

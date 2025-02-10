import { Routes } from '@angular/router';
import { CollectorDashboardComponent } from './layout/collector-dashboard.component';
import { DashboardContentComponent } from './dashboard/dashboard-content.component';
import { CollectorCollectionListComponent } from './collections/collection-list/collection-list.component';

export const COLLECTOR_ROUTES: Routes = [
  {
    path: '',
    component: CollectorDashboardComponent,
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
        component: CollectorCollectionListComponent
      }
    ]
  }
];

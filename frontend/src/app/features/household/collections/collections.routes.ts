import { Routes } from '@angular/router';

export const COLLECTIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./collection-list/collection-list.component')
      .then(m => m.CollectionListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./collection-form/collection-form.component')
      .then(m => m.CollectionFormComponent)
  }
];

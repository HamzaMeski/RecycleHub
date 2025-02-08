import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionState } from '../models/collection.model';

export const selectCollectionState = createFeatureSelector<CollectionState>('collection');

export const selectAllCollections = createSelector(
  selectCollectionState,
  state => state.collections
);

export const selectCollectionsLoading = createSelector(
  selectCollectionState,
  state => state.loading
);

export const selectCollectionsError = createSelector(
  selectCollectionState,
  state => state.error
);

export const selectSelectedCollection = createSelector(
  selectCollectionState,
  state => state.selectedCollection
);

export const selectPendingCollections = createSelector(
  selectAllCollections,
  collections => collections.filter(c => c.status === 'PENDING')
);

export const selectCompletedCollections = createSelector(
  selectAllCollections,
  collections => collections.filter(c => c.status === 'COMPLETED')
);

export const selectCollectionsByStatus = (status: string) => createSelector(
  selectAllCollections,
  collections => collections.filter(c => c.status === status)
);

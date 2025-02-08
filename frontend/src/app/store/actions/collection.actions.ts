import { createAction, props } from '@ngrx/store';
import { Collection } from '../models/collection.model';

// Load Collections
export const loadCollections = createAction(
  '[Collection] Load Collections'
);

export const loadCollectionsSuccess = createAction(
  '[Collection] Load Collections Success',
  props<{ collections: Collection[] }>()
);

export const loadCollectionsFailure = createAction(
  '[Collection] Load Collections Failure',
  props<{ error: string }>()
);

// Create Collection
export const createCollection = createAction(
  '[Collection] Create Collection',
  props<{ collection: Partial<Collection> }>()
);

export const createCollectionSuccess = createAction(
  '[Collection] Create Collection Success',
  props<{ collection: Collection }>()
);

export const createCollectionFailure = createAction(
  '[Collection] Create Collection Failure',
  props<{ error: string }>()
);

// Update Collection
export const updateCollection = createAction(
  '[Collection] Update Collection',
  props<{ id: number; collection: Partial<Collection> }>()
);

export const updateCollectionSuccess = createAction(
  '[Collection] Update Collection Success',
  props<{ collection: Collection }>()
);

export const updateCollectionFailure = createAction(
  '[Collection] Update Collection Failure',
  props<{ error: string }>()
);

// Cancel Collection
export const cancelCollection = createAction(
  '[Collection] Cancel Collection',
  props<{ id: number }>()
);

export const cancelCollectionSuccess = createAction(
  '[Collection] Cancel Collection Success',
  props<{ id: number }>()
);

export const cancelCollectionFailure = createAction(
  '[Collection] Cancel Collection Failure',
  props<{ error: string }>()
);

// Select Collection
export const selectCollection = createAction(
  '[Collection] Select Collection',
  props<{ collection: Collection }>()
);

export const clearSelectedCollection = createAction(
  '[Collection] Clear Selected Collection'
);

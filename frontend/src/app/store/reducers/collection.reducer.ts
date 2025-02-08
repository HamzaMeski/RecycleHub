import { createReducer, on } from '@ngrx/store';
import { CollectionState } from '../models/collection.model';
import * as CollectionActions from '../actions/collection.actions';

export const initialState: CollectionState = {
  collections: [],
  loading: false,
  error: null,
  selectedCollection: null
};

export const collectionReducer = createReducer(
  initialState,

  // Load Collections
  on(CollectionActions.loadCollections, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CollectionActions.loadCollectionsSuccess, (state, { collections }) => ({
    ...state,
    collections,
    loading: false
  })),

  on(CollectionActions.loadCollectionsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Create Collection
  on(CollectionActions.createCollection, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CollectionActions.createCollectionSuccess, (state, { collection }) => ({
    ...state,
    collections: [...state.collections, collection],
    loading: false
  })),

  on(CollectionActions.createCollectionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Update Collection
  on(CollectionActions.updateCollection, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CollectionActions.updateCollectionSuccess, (state, { collection }) => ({
    ...state,
    collections: state.collections.map(c => 
      c.id === collection.id ? collection : c
    ),
    loading: false
  })),

  on(CollectionActions.updateCollectionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Cancel Collection
  on(CollectionActions.cancelCollection, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CollectionActions.cancelCollectionSuccess, (state, { id }) => ({
    ...state,
    collections: state.collections.map(c => 
      c.id === id ? { ...c, status: 'CANCELLED' } : c
    ),
    loading: false
  })),

  on(CollectionActions.cancelCollectionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Select Collection
  on(CollectionActions.selectCollection, (state, { collection }) => ({
    ...state,
    selectedCollection: collection
  })),

  on(CollectionActions.clearSelectedCollection, state => ({
    ...state,
    selectedCollection: null
  }))
);

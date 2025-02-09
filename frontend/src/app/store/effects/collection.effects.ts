import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CollectionService } from '@core/services/collection.service';
import * as CollectionActions from '../actions/collection.actions';

@Injectable()
export class CollectionEffects {
  private actions$ = inject(Actions);
  private collectionService = inject(CollectionService);

  loadCollections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionActions.loadCollections),
      mergeMap(() =>
        this.collectionService.getCollections().pipe(
          map(collections => CollectionActions.loadCollectionsSuccess({ collections })),
          catchError(error => of(CollectionActions.loadCollectionsFailure({ error: error.message })))
        )
      )
    )
  );

  createCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionActions.createCollection),
      mergeMap(({ collection }) =>
        this.collectionService.createRequest(collection).pipe(
          map(newCollection => CollectionActions.createCollectionSuccess({ collection: newCollection })),
          catchError(error => of(CollectionActions.createCollectionFailure({ error: error.message })))
        )
      )
    )
  );

  updateCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionActions.updateCollection),
      mergeMap(({ id, collection }) =>
        this.collectionService.updateRequest(id, collection).pipe(
          map(updatedCollection => CollectionActions.updateCollectionSuccess({ collection: updatedCollection })),
          catchError(error => of(CollectionActions.updateCollectionFailure({ error: error.message })))
        )
      )
    )
  );

  cancelCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionActions.cancelCollection),
      mergeMap(({ id }) =>
        this.collectionService.deleteRequest(id).pipe(
          map(() => CollectionActions.cancelCollectionSuccess({ id })),
          catchError(error => of(CollectionActions.cancelCollectionFailure({ error: error.message })))
        )
      )
    )
  );
}

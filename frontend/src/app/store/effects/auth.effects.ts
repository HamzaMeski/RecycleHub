import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => AuthActions.loginSuccess({ user: response })),
          catchError(error => of(AuthActions.loginFailure({ error: error.error?.message || 'Login failed' })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user }) => {
        switch (user.userType) {
          case 'HOUSEHOLD':
            this.router.navigate(['/household']);
            break;
          case 'COLLECTOR':
            this.router.navigate(['/collector']);
            break;
          case 'ADMIN':
            this.router.navigate(['/admin']);
            break;
          default:
            this.router.navigate(['/auth/login']);
        }
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
      })
    ),
    { dispatch: false }
  );

  registerHouseHold$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerHouseHold),
      mergeMap(({ request }) =>
        this.authService.registerHouseHold(request).pipe(
          map(() => AuthActions.registerHouseHoldSuccess()),
          catchError(error => of(AuthActions.registerHouseHoldFailure({ error: error.message })))
        )
      )
    )
  );
}

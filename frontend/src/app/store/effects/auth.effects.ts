import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
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
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(user => {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
            return AuthActions.loginSuccess({ user });
          }),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  registerHouseHold$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerHouseHold),
      exhaustMap(({ request }) =>
        this.authService.registerHouseHold(request).pipe(
          map(() => AuthActions.registerHouseHoldSuccess()),
          catchError(error => of(AuthActions.registerHouseHoldFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          // Redirect based on user type
          switch (user.userType) {
            case 'HOUSEHOLD':
              this.router.navigate(['/dashboard']);
              break;
            case 'COLLECTOR':
              this.router.navigate(['/collector']);
              break;
            case 'ADMIN':
              this.router.navigate(['/admin']);
              break;
            default:
              this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerHouseHoldSuccess),
        tap(() => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );
}

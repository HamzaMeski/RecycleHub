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
      tap(action => console.log('Login action dispatched:', action)),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          tap(response => console.log('Login API response:', response)),
          map(user => {
            console.log('Storing user data in localStorage');
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
            return AuthActions.loginSuccess({ user });
          }),
          catchError(error => {
            console.error('Login error:', error);
            return of(AuthActions.loginFailure({ error: error.message || 'Login failed' }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          console.log('Login success effect triggered. User type:', user.userType);
          // Redirect based on user type
          switch (user.userType) {
            case 'INDIVIDUAL':
              console.log('Redirecting to household dashboard');
              this.router.navigate(['/dashboard']);
              break;
            case 'COLLECTOR':
              console.log('Redirecting to collector dashboard');
              this.router.navigate(['/collector']);
              break;
            case 'ADMIN':
              console.log('Redirecting to admin dashboard');
              this.router.navigate(['/admin']);
              break;
            default:
              console.log('Unknown user type, redirecting to home');
              this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
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

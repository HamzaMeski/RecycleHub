import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from '../auth.state';
import * as AuthActions from '../actions/auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    loading: false,
    error
  })),

  on(AuthActions.registerHouseHold, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.registerHouseHoldSuccess, (state) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(AuthActions.registerHouseHoldFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuthActions.logout, () => initialAuthState)
);

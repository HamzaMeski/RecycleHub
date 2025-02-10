import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthResponse } from '@shared/types/models';

export interface AuthState {
  user: AuthResponse | null;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
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
  on(AuthActions.logout, () => ({
    ...initialState
  })),
  on(AuthActions.registerHouseHold, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.registerHouseHoldSuccess, state => ({
    ...state,
    loading: false
  })),
  on(AuthActions.registerHouseHoldFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

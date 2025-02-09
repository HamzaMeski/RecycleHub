import { createAction, props } from '@ngrx/store';
import { AuthRequest, AuthResponse, HouseHoldRegisterRequest } from '@shared/types/models';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: AuthRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Register Actions
export const registerHouseHold = createAction(
  '[Auth] Register HouseHold',
  props<{ request: HouseHoldRegisterRequest }>()
);

export const registerHouseHoldSuccess = createAction(
  '[Auth] Register HouseHold Success'
);

export const registerHouseHoldFailure = createAction(
  '[Auth] Register HouseHold Failure',
  props<{ error: string }>()
);

// Logout Action
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: string }>());

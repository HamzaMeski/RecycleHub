import { AuthResponse } from '@shared/types/models';

export interface AuthState {
  user: AuthResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null
};

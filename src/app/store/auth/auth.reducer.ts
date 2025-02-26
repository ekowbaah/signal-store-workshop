import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: { id: string; name: string } | null;
}

export const initialAuthState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.loadUserFromStorage, (state) => {
    const userData = localStorage.getItem('fakeUser');
    if (userData) {
      const user = JSON.parse(userData);
      return { ...state, user };
    }
    return state;
  }),

  on(AuthActions.registerUserSuccess, (state, { id, name }) => {
    const newUser = { id, name };
    localStorage.setItem('fakeUser', JSON.stringify(newUser));
    return { ...state, user: newUser };
  }),

  on(AuthActions.logoutUser, () => {
    localStorage.removeItem('fakeUser');
    return { user: null };
  })
);

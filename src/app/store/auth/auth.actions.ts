import { createAction, props } from '@ngrx/store';

export const loadUserFromStorage = createAction(
  '[Auth] Load User From Storage'
);

export const registerUser = createAction(
  '[Auth] Register User',
  props<{ name: string }>()
);

export const registerUserSuccess = createAction(
  '[Auth] Register User Success',
  props<{ id: string; name: string }>()
);

export const logoutUser = createAction('[Auth] Logout User');

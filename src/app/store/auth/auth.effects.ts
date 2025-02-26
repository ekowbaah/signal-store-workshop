import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { SupabaseService } from '../../core/auth/services/supabase.service';
import { FakeAuthService } from '../../core/auth/services/fake-auth.service';

@Injectable()
export class AuthEffects {
    actions$= inject(Actions);
    supabaseService= inject(SupabaseService);
    fakeAuthService= inject(FakeAuthService);

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      switchMap(({ name }) => {
        const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
        return from(this.supabaseService.saveUser(userId, name)).pipe(
          map(() => {  return AuthActions.registerUserSuccess({ id: userId, name })}),
          catchError(() => of(AuthActions.logoutUser()))
        );
      })
    )
  );
}

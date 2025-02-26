import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as MetroActions from './metro.actions';
import { SupabaseService } from '../../../core/auth/services/supabase.service';

@Injectable()
export class MetroEffects {
  private actions$= inject(Actions);
  private supabaseService= inject(SupabaseService);


  loadStations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MetroActions.loadStations),
      mergeMap(() =>
        this.supabaseService.getStations().pipe(
          map(stations => MetroActions.loadStationsSuccess({ stations })),
          catchError(error => of(MetroActions.loadStationsFailure({ error: error.message })))
        )
      )
    )
  );
}

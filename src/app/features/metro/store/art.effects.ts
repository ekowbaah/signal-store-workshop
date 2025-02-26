import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ArtActions from './art.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { SupabaseService } from '../../../core/auth/services/supabase.service';

@Injectable()
export class ArtEffects {
  actions$ = inject(Actions);
  supabase = inject(SupabaseService);

  uploadArt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtActions.uploadArt),
      mergeMap(({ stationId, file, userId, description }) =>
        this.supabase.uploadArtImage(stationId, file, userId, description).pipe(
          map((artRow: any) =>
            ArtActions.uploadArtSuccess({
              artId: artRow.id,
              stationId: artRow.station_id,
              imageUrl: artRow.image_url,
              uploadedBy: artRow.uploaded_by,
              description: artRow.description,
            })
          ),
          catchError((err) =>
            of(ArtActions.uploadArtFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loadStationArt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtActions.loadStationArt),
      mergeMap(({ stationId }) =>
        this.supabase.loadStationArt(stationId).pipe(
          map((art) => ArtActions.loadStationArtSuccess({ stationId, art })),
          catchError((err) =>
            of(ArtActions.loadStationArtFailure({ error: err.message }))
          )
        )
      )
    )
  );

  likeArt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtActions.likeArt),
      mergeMap(({ artId, userId, userName }) =>
        this.supabase.likeArt(artId, userId, userName).pipe(
          map((totalLikes) => ArtActions.likeArtSuccess({ artId, totalLikes })),
          catchError((err) =>
            of(ArtActions.likeArtFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loadAllArt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtActions.loadAllArt),
      switchMap(() =>
        from(this.supabase.getAllArt()).pipe(
          map((arts) => ArtActions.loadAllArtSuccess({ arts })),
          catchError((error) =>
            of(ArtActions.loadAllArtFailure({ error: error.message }))
          )
        )
      )
    )
  );

  triggerLoadAllArt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtActions.uploadArtSuccess),
      map(() => ArtActions.loadAllArt())
    )
  );
}

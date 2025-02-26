import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SupabaseService } from '../../../core/auth/services/supabase.service';
import { tapResponse } from '@ngrx/operators';
import { MetrosStore } from './metro.store';

interface MetroArt {
  stationName: any;
  uploaderName: any;
  artDescription: any;
  id: number;
  location?: string;
  description?: string;
  imageUrl?: string;
}
type ArtsState = {
  isLoading: boolean;
  arts: MetroArt[];
};

const initialState: ArtsState = {
  isLoading: false,
  arts: [],
};

type saveArtParams = {
  stationId: number;
  file: File;
  userId: string;
  description: string;
};
export const ArtsStore = signalStore(
  withState(initialState),
  withMethods((store, supabaseService = inject(SupabaseService)) => {
    const loadAllArt = async () => {
      try {
        const arts = await supabaseService.getAllArt();
        patchState(store, { arts });
      } catch (error) {
        console.error('Failed to load arts:', error);
      }
    };

    const likeArt = rxMethod<{
      artId: number;
      userId: string;
      userName: string;
    }>(
      pipe(
        switchMap(({ artId, userId, userName }) =>
          supabaseService.likeArt(artId, userId, userName).pipe(
            tapResponse({
              next: async () => {
                patchState(store, { isLoading: false });
              },
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          )
        )
      )
    );

    return {
      saveArt: rxMethod<saveArtParams>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((params) =>
            supabaseService
              .uploadArtImage(
                params.stationId,
                params.file,
                params.userId,
                params.description
              )
              .pipe(
                tapResponse({
                  next: async () => {
                    patchState(store, { isLoading: false });
                    await loadAllArt();
                  },
                  error: (err) => {
                    patchState(store, { isLoading: false });
                    console.error(err);
                  },
                })
              )
          )
        )
      ),
      loadAllArt,
      likeArt,
    };
  }),
  withHooks({
    onInit(store) {
      store.loadAllArt();
    },
  })
);

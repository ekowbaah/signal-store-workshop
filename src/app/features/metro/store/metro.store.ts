import { computed, inject } from '@angular/core';
import { pipe, tap } from 'rxjs';
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

export interface MetroStation {
  id: number;
  name: string;
  opened: number;
  grade: string;
}

type MetrosState = {
  stations: MetroStation[];
  isLoading: boolean;
};

const initialState: MetrosState = {
  stations: [],
  isLoading: false,
};

export const MetrosStore = signalStore(
  withState(initialState),
  withComputed(({ stations }) => ({
    stationsCount: computed(() => stations().length),
  })),
  withMethods((store, supabaseService = inject(SupabaseService)) => ({
    loadStations: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        tap(() => {
          supabaseService.getStations().subscribe({
            next: (stations) => patchState(store, { stations }),
            error: console.error,
            complete: () => patchState(store, { isLoading: false }),
          });
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadStations();
    },
  })
);

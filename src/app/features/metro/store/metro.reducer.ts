import { createReducer, on } from '@ngrx/store';
import * as MetroActions from './metro.actions';
export interface MetroStation {
  id: number;
  name: string;
  opened: number;
  grade: 'Elevated' | string;
}

export interface MetroState {
  stations: MetroStation[];
  loading: boolean;
  error: string | null;
}

const initialState: MetroState = {
  stations: [],
  loading: false,
  error: null,
};

export const metroReducer = createReducer(
  initialState,
  on(MetroActions.loadStations, (state) => ({
    ...state,
    loading: true,
  })),
  on(MetroActions.loadStationsSuccess, (state, { stations }) => ({
    ...state,
    loading: false,
    stations,
  })),
  on(MetroActions.loadStationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

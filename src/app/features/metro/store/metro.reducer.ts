import { createReducer, on } from '@ngrx/store';
import * as MetroActions from './metro.actions';
;

export interface MetroState {
  stations: any[];
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
  on(MetroActions.loadStations, state => ({
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

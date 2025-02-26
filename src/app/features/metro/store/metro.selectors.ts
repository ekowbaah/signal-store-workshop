import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MetroState } from './metro.reducer';

// Feature Selector: Selects the metro feature state
export const selectMetroState = createFeatureSelector<MetroState>('metro');

// Selectors
export const selectStations = createSelector(
  selectMetroState,
  (state) => state?.stations
);

export const selectLoading = createSelector(
  selectMetroState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectMetroState,
  (state) => state.error
);

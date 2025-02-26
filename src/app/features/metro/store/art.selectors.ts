import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArtState } from './art.reducer';

export const selectArtState = createFeatureSelector<ArtState>('art');

export const selectArtByStation = (stationId: number) => createSelector(
  selectArtState,
  (state) => state.artByStation[stationId] || []
);

export const selectArtLikes = (artId: number) => createSelector(
  selectArtState,
  (state) => state.artLikes[artId] || 0
);

export const selectLoading = createSelector(
  selectArtState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectArtState,
  (state) => state.error
);



export const selectAllArt = createSelector(
  selectArtState,
  (state) => state.allArt
);
import { createReducer, on } from '@ngrx/store';
import * as ArtActions from './art.actions';

interface MetroArt {
  stationName: any;
  uploaderName: any;
  artDescription: any;
  id: number;
  title: string;
  artist: string;
  location?: string;
  description?: string;
  imageUrl?: string;
}

export interface ArtState {
  artByStation: Record<number, any[]>;

  artLikes: Record<number, number>;
  loading: boolean;
  error: string | null;
  allArt: MetroArt[];
}

const initialState: ArtState = {
  artByStation: {},
  allArt: [],
  artLikes: {},
  loading: false,
  error: null,
};

export const artReducer = createReducer(
  initialState,

  on(ArtActions.uploadArt, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    ArtActions.uploadArtSuccess,
    (state, { artId, stationId, imageUrl, uploadedBy }) => {
      const existingArt = state.artByStation[stationId] || [];
      const newArtItem = {
        id: artId,
        stationId,
        imageUrl,
        uploadedBy,
        created_at: new Date(),
      };
      return {
        ...state,
        loading: false,
        artByStation: {
          ...state.artByStation,
          [stationId]: [...existingArt, newArtItem],
        },
      };
    }
  ),
  on(ArtActions.uploadArtFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load station art
  on(ArtActions.loadStationArt, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ArtActions.loadStationArtSuccess, (state, { stationId, art }) => ({
    ...state,
    loading: false,
    artByStation: { ...state.artByStation, [stationId]: art },
  })),
  on(ArtActions.loadStationArtFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Like art
  on(ArtActions.likeArt, (state) => ({ ...state, loading: true })),
  on(ArtActions.likeArtSuccess, (state, { artId, totalLikes }) => ({
    ...state,
    loading: false,
    artLikes: { ...state.artLikes, [artId]: totalLikes },
  })),
  on(ArtActions.likeArtFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ArtActions.loadAllArt, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ArtActions.loadAllArtSuccess, (state, { arts }) => ({
    ...state,
    loading: false,
    allArt: arts,
  })),
  on(ArtActions.loadAllArtFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

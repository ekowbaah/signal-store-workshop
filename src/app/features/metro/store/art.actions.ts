import { createAction, props } from '@ngrx/store';

export const uploadArt = createAction(
  '[Art] Upload Art',
  props<{
    stationId: number;
    file: File;
    userId: string;
    description: string;
  }>()
);

export const uploadArtSuccess = createAction(
  '[Art] Upload Art Success',
  props<{
    artId: number;
    stationId: number;
    imageUrl: string;
    uploadedBy: string;
    description: string;
  }>()
);

export const uploadArtFailure = createAction(
  '[Art] Upload Art Failure',
  props<{ error: string }>()
);

// Loading station art from the database
export const loadStationArt = createAction(
  '[Art] Load Station Art',
  props<{ stationId: number }>()
);

export const loadStationArtSuccess = createAction(
  '[Art] Load Station Art Success',
  props<{ stationId: number; art: any[] }>()
);

export const loadStationArtFailure = createAction(
  '[Art] Load Station Art Failure',
  props<{ error: string }>()
);

// Likes
export const likeArt = createAction(
  '[Art] Like Art',
  props<{ artId: number; userId: string; userName: string }>()
);

export const likeArtSuccess = createAction(
  '[Art] Like Art Success',
  props<{ artId: number; totalLikes: number }>()
);

export const likeArtFailure = createAction(
  '[Art] Like Art Failure',
  props<{ error: string }>()
);

export const loadAllArt = createAction('[Art] Load All Art');

export const loadAllArtSuccess = createAction(
  '[Art] Load All Art Success',
  props<{ arts: any[] }>()
);

export const loadAllArtFailure = createAction(
  '[Art] Load All Art Failure',
  props<{ error: string }>()
);

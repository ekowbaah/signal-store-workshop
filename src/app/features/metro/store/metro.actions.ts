import { createAction, props } from '@ngrx/store';


export const loadStations = createAction('[Metro] Load Stations');
export const loadStationsSuccess = createAction(
  '[Metro] Load Stations Success',
  props<{ stations: any[] }>()
);
export const loadStationsFailure = createAction(
  '[Metro] Load Stations Failure',
  props<{ error: string }>()
);

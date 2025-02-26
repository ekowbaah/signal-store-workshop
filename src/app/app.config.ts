import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { metroReducer } from './features/metro/metro.reducer';
import { MetroEffects } from './features/metro/store/metro.effects';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { artReducer } from './features/metro/store/art.reducer';
import { ArtEffects } from './features/metro/store/art.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { notificationsReducer } from './store/notifications/notifications.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      metro: metroReducer,
      auth: authReducer,
      art: artReducer,
      notifications: notificationsReducer,
    }),
    provideEffects(MetroEffects, AuthEffects, ArtEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: false, // If set to true, the connection is established within the Angular zone
    }),
  ],
};

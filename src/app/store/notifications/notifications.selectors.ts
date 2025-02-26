import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationsState } from './notifications.reducer';

export const selectNotificationsState =
  createFeatureSelector<NotificationsState>('notifications');

export const selectAllNotifications = createSelector(
  selectNotificationsState,
  (state) => state.notifications
);

export const selectLatestNotification = createSelector(
  selectNotificationsState,
  (state) => (state.notifications.length > 0 ? state.notifications[0] : null)
);

export const selectUnreadNotificationCount = createSelector(
  selectNotificationsState,
  (state) => state.notifications.length
);

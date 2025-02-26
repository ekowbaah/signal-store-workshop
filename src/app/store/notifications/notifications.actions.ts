import { createAction, props } from '@ngrx/store';

export const notifyNewLike = createAction(
  '[Notifications] New Like',
  props<{ artId: number; likedBy: string; likedById: string }>()
);

export const clearNotification = createAction(
  '[Notifications] Clear Notification',
  props<{ id: number }>()
);

export const clearAllNotifications = createAction(
  '[Notifications] Clear All Notifications'
);

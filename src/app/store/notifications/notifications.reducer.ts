import { createReducer, on } from '@ngrx/store';
import * as NotificationsActions from './notifications.actions';

export interface Notification {
  id: number;
  message: string;
  timestamp: number;
  likedBy: string;
  likedById: string;
}

export interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

export const notificationsReducer = createReducer(
  initialState,

  on(
    NotificationsActions.notifyNewLike,
    (state, { artId, likedBy, likedById }) => ({
      notifications: [
        {
          id: Date.now(),
          message: `${likedBy} liked art ID ${artId}!`,
          timestamp: Date.now(),
          likedBy,
          likedById,
        },
        ...state.notifications,
      ],
    })
  ),

  on(NotificationsActions.clearNotification, (state, { id }) => ({
    notifications: state.notifications.filter(
      (notification) => notification.id !== id
    ),
  }))
);

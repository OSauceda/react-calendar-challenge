import {
  DISPLAY_REMINDER_MODAL,
  CLOSE_REMINDER_MODAL
} from './types';

export const displayReminderModal = () => (dispatch) => {
  dispatch({
    type: DISPLAY_REMINDER_MODAL,
  });
};

export const closeReminderModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_REMINDER_MODAL,
  });
};


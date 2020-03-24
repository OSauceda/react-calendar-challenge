import {
  ADD_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
  DELETE_REMINDERS,
} from './types';

export const submitReminder = (reminder) => (dispatch) => {
  if (reminder.reminderId === -1) {
    dispatch({
      type: ADD_REMINDER,
      payload: reminder,
    });
  } else {
    dispatch({
      type: EDIT_REMINDER,
      payload: reminder,
    });
  }
};

export const deleteReminders = (date) => (dispatch) => {
  dispatch({
    type: DELETE_REMINDERS,
    payload: date,
  });
};

export const deleteReminder = (reminderId) => (dispatch) => {
  dispatch({
    type: DELETE_REMINDER,
    payload: reminderId,
  });
};

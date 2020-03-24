import { GET_REMINDER } from './types';

export const getReminder = (reminder) => (dispatch) => {
  dispatch({
    type: GET_REMINDER,
    payload: reminder,
  });
};

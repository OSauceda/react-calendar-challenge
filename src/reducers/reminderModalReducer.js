import {
  DISPLAY_REMINDER_MODAL,
  CLOSE_REMINDER_MODAL
} from '../actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_REMINDER_MODAL:
      return true;
    case CLOSE_REMINDER_MODAL:
      return false;
    default:
      return state;
  }
};

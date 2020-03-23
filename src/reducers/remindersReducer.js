import {
  ADD_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
  DELETE_REMINDERS,
} from '../actions/types';

const initialState = { incrementId: 0, reminders: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_REMINDER:
      const newReminder = { ...action.payload, reminderId: state.incrementId };
      return {
        incrementId: state.incrementId + 1,
        reminders: [...state.reminders, newReminder],
      };
    case DELETE_REMINDERS:
      return {
        incrementId: state.incrementId,
        reminders: state.reminders.filter(
          (reminder) => reminder.date !== action.payload
        ),
      };
    case DELETE_REMINDER:
      return {
        incrementId: state.incrementId,
        reminders: state.reminders.filter(
          (reminder) => reminder.reminderId !== action.payload
        ),
      };
    case EDIT_REMINDER:
      let filteredReminders = state.reminders.filter(
        (reminder) => reminder.reminderId !== action.payload.reminderId
      );
      return {
        incrementId: state.incrementId,
        reminders: [...filteredReminders, action.payload],
      };
    default:
      return state;
  }
};

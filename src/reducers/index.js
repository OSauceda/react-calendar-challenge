import { combineReducers } from 'redux';
import reminderModalReducer from './reminderModalReducer';
import remindersReducer from './remindersReducer';

export default combineReducers({
  showReminderFormModal: reminderModalReducer,
  reminders: remindersReducer,
});

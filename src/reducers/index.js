import { combineReducers } from 'redux';
import reminderModalReducer from './reminderModalReducer';
import remindersReducer from './remindersReducer';
import citiesReducer from './citiesReducer';
import dateDetailReducer from './dateDetailReducer';
import displayReminderReducer from './displayReminderReducer';

export default combineReducers({
  showReminderFormModal: reminderModalReducer,
  reminders: remindersReducer,
  cities: citiesReducer,
  dateDetail: dateDetailReducer,
  displayReminder: displayReminderReducer,
});

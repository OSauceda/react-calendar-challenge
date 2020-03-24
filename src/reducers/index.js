import { combineReducers } from 'redux';
import reminderModalReducer from './reminderModalReducer';
import remindersReducer from './remindersReducer';
import citiesReducer from './citiesReducer';

export default combineReducers({
  showReminderFormModal: reminderModalReducer,
  reminders: remindersReducer,
  cities: citiesReducer,
});

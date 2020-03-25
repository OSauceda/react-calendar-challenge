import {
  ADD_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
  DELETE_REMINDERS,
  REQUEST_WEATHER_FORECAST,
} from './types';
import { format } from 'date-fns';

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

export const fetchWeather = (cityId) => (dispatch) => {
  let weather = [];
  const today = new Date();

  fetch(`https://api.openweathermap.org/data/2.5/weather/?units=metric&id=${cityId}&appid=1c0e103c32f64cd4428126e2363e482c`)
    .then((currentWeatherResponse) => currentWeatherResponse.json())
    .then((currentWeather) => (weather = [{
        dt_txt: format(today, 'MM/dd/yyyy'),
        weather: currentWeather.weather,
        main: currentWeather.main,
      }])).then(() => {
      fetch(`https://api.openweathermap.org/data/2.5/forecast/?units=metric&id=${cityId}&appid=1c0e103c32f64cd4428126e2363e482c`)
        .then((forecastResponse) => forecastResponse.json())
        .then((forecast) => {
          weather = [...weather, ...forecast.list];
          dispatch({
            type: REQUEST_WEATHER_FORECAST,
            payload: { list: weather, city: forecast.city },
          });
        });
    });
};

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CalendarPanel from '../CalendarPanel/';
import DayOverview from '../DayOverview/';
import ReminderForm from '../ReminderForm/';
import Calendar from '../Calendar/';
import { Provider } from 'react-redux'
import store from '../../store';

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <Switch>
            <Route path="/day-overview" component={ DayOverview } />
            <Route path="/calendar" component={ Calendar } />
            <Route path="/" component={ CalendarPanel } />
          </Switch>
          <ReminderForm />
        </Router>
      </Provider>
    );
  }
}



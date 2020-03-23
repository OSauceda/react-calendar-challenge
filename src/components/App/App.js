import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CalendarPanel from '../CalendarPanel/';
import DayOverview from '../DayOverview/';
import ReminderForm from '../ReminderForm/';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/day-overview" component={ DayOverview } />
          <Route path="/" component={ CalendarPanel } />
        </Switch>
        <ReminderForm />
      </Router>
    );
  }
}



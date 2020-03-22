import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Calendar from '../Calendar/';
import DayOverview from '../DayOverview/';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/day-overview">
            <DayOverview />
          </Route>
          <Route path="/">
            <Calendar />
          </Route>
        </Switch>
      </Router>
    );
  }
}



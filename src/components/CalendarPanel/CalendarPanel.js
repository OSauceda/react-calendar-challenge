import React, { Component, Fragment } from 'react';
import Calendar from 'react-calendar';

// Component Styles
import './CalendarPanel.scss';

export default class CalendarPanel extends Component {
  render() {
    return(
      <Fragment>
        <Calendar
          calendarType="US"
          minDetail="month"
        />
      </Fragment>
    );
  }
}
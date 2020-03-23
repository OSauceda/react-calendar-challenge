import React, { Component, Fragment } from 'react';
import Calendar from 'react-calendar';
import { Button, Columns } from 'react-bulma-components';

// Component Styles
import './CalendarPanel.scss';

const { Column } = Columns;

export default class CalendarPanel extends Component {
  render() {
    return(
      <Fragment>
        <Calendar
          calendarType="US"
          minDetail="month"
        />
        <Columns className="is-centered is-vcentered txt-centered">
          <Column size={ 2 }>
            <Button
              color="primary"
              className="add-reminder-btn">
              Add a new reminder
            </Button>
          </Column>
        </Columns>
      </Fragment>
    );
  }
}
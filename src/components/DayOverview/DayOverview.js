import React, { Component } from 'react';
import { Button, Columns } from 'react-bulma-components';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import "./DayOverview.scss"

export default class DayOverview extends Component {
  render() {
    return(
      <section className="day-overview container">
        <nav role="navigation">
          <ul className="columns is-centered is-vcentered txt-centered">
            <li className="column">Previous Day</li>
            <li className="column">Reminders for Current Day Placeholder</li>
            <li className="column">Next Day</li>
          </ul>
        </nav>
        <hr/>
        Reminder list will go here
        <hr/>
        <Columns className="is-centered is-vcentered txt-centered">
          <Columns.Column>
            <Button color="link">
              Back to Calendar
            </Button>
          </Columns.Column>
          <Columns.Column>
            <Button color="primary">
              Add New Reminder
            </Button>
          </Columns.Column>
          <Columns.Column>
            <Button color="danger">
              Delete All Reminders
            </Button>
          </Columns.Column>
        </Columns>
      </section>
    );
  }
}
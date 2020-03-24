import React, { Component } from 'react';
import { Button, Columns } from 'react-bulma-components';
import { Link } from "react-router-dom";
import "./DayOverview.scss"

export default class DayOverview extends Component {
  render() {
    return(
      <section className="day-overview container">
        <nav role="navigation">
          <ul className="columns is-centered is-vcentered txt-centered">
            <li className="column">Reminders for Current Day Placeholder</li>
          </ul>
        </nav>
        <hr/>
        Reminder list will go here
        <hr/>
        <Columns className="is-centered is-vcentered txt-centered">
          <Columns.Column>
          <Link to="/">
            <Button color="link">
              Back to Calendar
            </Button>
          </Link>
          </Columns.Column>
          <Columns.Column>
            <Button color="primary">
              Add New Reminder
            </Button>
          </Columns.Column>
        </Columns>
      </section>
    );
  }
}
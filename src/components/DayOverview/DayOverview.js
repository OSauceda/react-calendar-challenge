import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Columns } from 'react-bulma-components';
import { Link } from "react-router-dom";
import { displayReminderModal } from '../../actions/reminderModalActions';
import { getReminder } from '../../actions/displayReminderActions';
import ReminderCard from '../ReminderCard/';
import "./DayOverview.scss"

class DayOverview extends Component {

  static propTypes = {
    displayReminderModal: PropTypes.func.isRequired,
    getReminder: PropTypes.func.isRequired,
  }
  componentDidMount() {

    // console.log(this.props);
  }

  _renderReminders = (reminderArray) => {
    const reminders = reminderArray.map((reminder) => {
      return (
        <ReminderCard
          key={reminder.reminderId}
          reminder={reminder}
          onEdit={() => {
            this.props.getReminder(reminder);
            this.props.displayReminderModal();
          }}
        />
      );
    });

    return reminders;
  };

  render() {
    const { dateDetail = "" } = this.props;
    const fullDate = new Date(dateDetail);
    // const formattedDate = format(fullDate, 'MM/dd/yyyy');
    const filteredReminders = this.props.reminders
      .filter((reminder) => reminder.date === dateDetail)
      .sort((a, b) => a.time > b.time)
    const reminderCards = this._renderReminders(filteredReminders);

    return(
      <section className="day-overview container">
        <nav role="navigation">
          <ul className="columns is-centered is-vcentered txt-centered">
            <li className="column">{fullDate.toDateString()}</li>
          </ul>
        </nav>
        <hr/>
        {reminderCards}
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
            <Button 
              color="primary"
              onClick={ this.props.displayReminderModal }
            >
              Add New Reminder
            </Button>
          </Columns.Column>
        </Columns>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  dateDetail: state.dateDetail,
  reminders: state.reminders.reminders
});

export default connect(
  mapStateToProps,
  { displayReminderModal, getReminder }
)(DayOverview);

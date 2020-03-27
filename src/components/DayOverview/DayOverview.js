import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Columns } from 'react-bulma-components';
import { Link } from "react-router-dom";
import { displayReminderModal } from '../../actions/reminderModalActions';
import { getReminder } from '../../actions/displayReminderActions';
import { deleteReminder, deleteReminders } from '../../actions/reminderActions';
import ReminderCard from '../ReminderCard/';
import ConfirmModal from './ConfirmModal';
import "./DayOverview.scss"

const { Column } = Columns;

class DayOverview extends Component {

  static propTypes = {
    displayReminderModal: PropTypes.func.isRequired,
    getReminder: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showConfirmModal: false,
      isClearDay: false,
      deleteReminderId: -1,
    };
  }

  _renderReminders = (reminderArray) => {
    const reminders = reminderArray.map((reminder) => {
      return (
        <ReminderCard
          key={reminder.reminderId}
          reminder={reminder}
          confirmModalHandler={ this._confirmModalHandler }
          onEdit={() => {
            this.props.getReminder(reminder);
            this.props.displayReminderModal();
          }}
        />
      );
    });

    return reminders;
  };


  _confirmModalHandler = (showConfirmModal = true, isClearDay = true, deleteReminderId = -1) => () =>{
    this.setState({
      showConfirmModal,
      isClearDay,
      deleteReminderId,
    });
  }


  render() {
    const {
      _renderReminders,
      _confirmModalHandler,
    } = this;
    const { showConfirmModal, isClearDay, deleteReminderId } = this.state;
    const { dateDetail = "", displayReminderModal, deleteReminder, deleteReminders } = this.props;
    const fullDate = new Date(dateDetail);
    const filteredReminders = this.props.reminders
      .filter((reminder) => reminder.date === dateDetail)
      .sort((a, b) => a.time > b.time)
    const reminderCards = _renderReminders(filteredReminders);

    return(
      <section className="day-overview container">
        <nav role="navigation">
          <ul className="columns is-centered is-vcentered txt-centered">
            <li className="column">{fullDate.toDateString()}</li>
          </ul>
        </nav>
        <hr/>
        { reminderCards }
        <hr/>
        <Columns className="is-centered is-vcentered txt-centered">
          <Column>
            <Link to="/">
              <Button color="link">
                Back to Calendar
              </Button>
            </Link>
          </Column>
          <Column>
            <Button
              color="primary"
              onClick={ displayReminderModal }
            >
              Add New Reminder
            </Button>
          </Column>
          <Column>
            {
              filteredReminders.length > 0 && <Button
                color="danger"
                onClick={ _confirmModalHandler(true, true) }
              >
                Clear all Reminders
              </Button>
            }
          </Column>
        </Columns>
        <ConfirmModal
          showConfirmation={ showConfirmModal }
          isClearDay={ isClearDay }
          closeModal={ _confirmModalHandler(false, false) }
          onDeleteReminder={ deleteReminder }
          onClearDay={ deleteReminders }
          currentSelectedDate={ dateDetail }
          deleteReminderId= { deleteReminderId }
        />
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
  {
    displayReminderModal,
    getReminder,
    deleteReminder,
    deleteReminders
  }
)(DayOverview);

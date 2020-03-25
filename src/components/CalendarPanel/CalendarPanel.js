import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { Button, Columns } from 'react-bulma-components';
import { connect } from 'react-redux';
import { displayReminderModal } from '../../actions/reminderModalActions';
import { viewDateDetails } from '../../actions/dateDetailActions';
import { format, isSameDay } from 'date-fns';
import tinycolor from 'tinycolor2';

// Component Styles
import './CalendarPanel.scss';

const { Column } = Columns;

class CalendarPanel extends Component {

  static propTypes = {
    displayReminderModal: PropTypes.func.isRequired,
    reminders: PropTypes.array,
  };

  _renderReminderTag = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = format(date, 'MM/dd/yyyy');
      let dateReminders = this.props.reminders
        .filter((reminder) => reminder.date === formattedDate)
        .sort((a, b) => a.time > b.time)
        .map((reminder) => (
          <div
            key={reminder.reminderId}
            style={{
              backgroundColor: reminder.color,
              borderColor: reminder.color,
              color: tinycolor(reminder.color).getBrightness() < 128 ? '#fff' : '#000'
            }}
            className="btn btn-primary reminder-element">
            <Columns>
              <Column size={6}>
                <div className="reminder-title">{reminder.title}</div>
              </Column>
              <Column size={6}>
                {reminder.time}
              </Column>
            </Columns>
          </div>
        ));
      if (dateReminders.length >= 4) {
        let remainingLength = dateReminders.length - 3;
        dateReminders = [
          ...dateReminders.slice(0, 3),
          <div key="remainder" className="btn btn-secondary reminder-element">
            And {remainingLength} more {`${remainingLength.length > 1 ? 'reminders' : 'reminder'}`}...
          </div>,
        ];
      }
      return (
        <Fragment>
          {isSameDay(date, new Date()) && (
            <div className="today" />
          )}
          <div className="reminder-list">{dateReminders}</div>
        </Fragment>
      );
    }
  };

  render() {

    return(
      <Fragment>
        <Calendar
          calendarType="US"
          minDetail="month"
          onChange={
            (e) => {
              this.props.viewDateDetails(format(e, 'MM/dd/yyyy'))
              this.props.history.push('/day-overview');
            }
          }
          tileContent={({ date, view }) =>
            this._renderReminderTag({ date, view })
          }
        />
        <Columns className="is-centered is-vcentered txt-centered">
          <Column size={ 2 }>
            <Button
              color="primary"
              className="add-reminder-btn"
              onClick={this.props.displayReminderModal}
            >
              Create a new reminder
            </Button>
          </Column>
        </Columns>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  reminders: state.reminders.reminders,
});

export default connect(
  mapStateToProps,
  { displayReminderModal, viewDateDetails }
)(CalendarPanel);

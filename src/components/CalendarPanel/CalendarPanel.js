import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { Button, Columns } from 'react-bulma-components';
import { connect } from 'react-redux';
import { displayReminderModal } from '../../actions/reminderModalActions';

// Component Styles
import './CalendarPanel.scss';

const { Column } = Columns;

class CalendarPanel extends Component {

  static propTypes = {
    displayReminderModal: PropTypes.func.isRequired,
    reminders: PropTypes.array,
  };

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
  { displayReminderModal }
)(CalendarPanel);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Section, Form, Button } from 'react-bulma-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TimePicker from 'react-time-picker';
import ColorPicker from 'rc-color-picker';
import { closeReminderModal } from '../../actions/reminderModalActions';
import { getTime } from 'date-fns';
import 'react-day-picker/lib/style.css';
import 'rc-color-picker/assets/index.css';
import './ReminderForm.scss';

const { Field, Label, Control, Textarea, Input } = Form;

class ReminderForm extends Component {

  static propTypes = {
    showReminderFormModal: PropTypes.bool.isRequired,
    closeReminderModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedCity: [],
      selectedDate: new Date(),
      selectedTime: new Date(),
      reminderId: -1,
      reminderColor: '#dedede',
      title: '',
      errors: {},
      showErrors: false,
      showInvalidReminder: false,
    };
  }

  _handleInputChange = (e) => {
    if (e.getMonth) {
      const currentTime = new Date(this.state.selectedTime);
      const selectedHour = currentTime.getHours();
      const selectedMinutes = currentTime.getMinutes();
      const selectedDate = new Date(e.setHours(selectedHour, selectedMinutes, 0));

      this.setState({ selectedDate, selectedTime: selectedDate });

      return;
    }
    if (e.color) {
      this.setState({ reminderColor: e.color });

      return;
    }
    if (typeof e === 'string') {
      const currentDate = new Date(this.state.selectedDate);
      const selectedTimeArray = e.split(':');
      const selectedTime = new Date(currentDate.setHours(selectedTimeArray[0], selectedTimeArray[1], 0));

      this.setState({ selectedTime, selectedDate: selectedTime });

      return;
    }

    this.setState({ [e.target.id]: e.target.value });
  }

  _closeModal = () => {
    this.props.closeReminderModal();
  }

  render() {
    const { _closeModal, _handleInputChange } = this;
    const { showReminderFormModal } = this.props;

    return(
      <div className="reminder-form">
        <Modal show={ showReminderFormModal } onClose={ _closeModal }>
          <Modal.Content>
            <Section>
              <h3 className="title">Create a reminder</h3>
              <form action="/">
                <Field>
                  <Label>
                    Title:
                  </Label>
                  <Control>
                    <Textarea
                      id="title"
                      className="has-fixed-size"
                      placeholder="Reminder title should not exceed 30 characters..."
                      maxLength={ 30 }
                      required
                      onChange={ _handleInputChange }
                      value={ this.state.title }
                    />
                  </Control>
                </Field>
                <Field>
                  <Label>
                    Date:
                  </Label>
                  <Control>
                    <DayPickerInput
                      id="selectedDate"
                      value={ this.state.selectedDate }
                      dayPickerProps={{ disabledDays: { before: new Date() } }}
                      inputProps={ { readOnly: true, className: 'input' } }
                      onDayChange={ _handleInputChange }
                    />
                  </Control>
                </Field>
                <Field>
                  <Label>
                    Time:
                  </Label>
                  <Control>
                    <TimePicker
                      disableClock
                      required
                      value={ this.state.selectedTime }
                      onChange={ _handleInputChange }
                      clearIcon={ null }
                    />
                  </Control>
                </Field>
                <Field>
                  <Label>
                    Select a City:
                  </Label>
                  <Control>
                    <Input type="text" />
                  </Control>
                </Field>
                <Field>
                  <Label>
                    Select a Color:
                  </Label>
                  <Control>
                    <ColorPicker
                      animation="slide-up"
                      enableAlpha={ false }
                      color={ this.state.reminderColor }
                      onChange={ _handleInputChange }
                    />
                  </Control>
                </Field>
                <hr/>
                <Field kind="group">
                  <Control>
                    <Button
                      type="primary"
                      color="primary"
                    >
                      Save Reminder
                    </Button>
                  </Control>
                  <Control>
                    <Button
                      color="link"
                      onClick={ _closeModal }
                    >
                      Cancel
                    </Button>
                  </Control>
                </Field>
              </form>
            </Section>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showReminderFormModal: state.showReminderFormModal,
});

export default connect(
  mapStateToProps,
  { closeReminderModal }
)(ReminderForm);

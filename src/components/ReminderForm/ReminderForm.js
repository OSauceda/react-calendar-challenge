import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Section, Form, Button } from 'react-bulma-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TimePicker from 'react-time-picker';
import ColorPicker from 'rc-color-picker';
import Select from 'react-select-virtualized';
import { createFilter } from 'react-select';
import { closeReminderModal } from '../../actions/reminderModalActions';
import { getCities } from '../../actions/citiesActions';
import { submitReminder } from '../../actions/reminderActions';
import { format } from 'date-fns';
import dateFnsFormat from 'date-fns/format';
import 'react-day-picker/lib/style.css';
import 'rc-color-picker/assets/index.css';
import './ReminderForm.scss';


const { Field, Label, Control, Textarea, Help } = Form;

class ReminderForm extends Component {

  static propTypes = {
    showReminderFormModal: PropTypes.bool.isRequired,
    closeReminderModal: PropTypes.func.isRequired,
    getCities: PropTypes.func.isRequired,
    submitReminder: PropTypes.func.isRequired,
    reminders: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      reminderId: -1,
      title: '',
      selectedDate: new Date(),
      selectedTime: new Date(),
      reminderColor: '#dedede',
      selectedCity: {},
      errors: {},
      showErrors: false,
      invalidReminder: false,
    };
  }

  componentDidMount() {

    this.props.getCities();
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

    if (e.lowercaseLabel) {
      const selectedCity = { id: e.value, name: e.label };

      this.setState({ selectedCity });

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

  _validateForm = () => {
    const errors = {};
    let showErrors = false;
    const { selectedCity, title } = this.state;

    if (title.length === 0) {
      errors.title = 'You must set a Title for this reminder.';
      showErrors = true;
    } else {
      errors.title = '';
    }

    if (typeof selectedCity.id === 'undefined') {
      errors.selectedCity = 'You must select a City.';
      showErrors = true;
    } else {
      errors.selectedCity = '';
    }

    this.setState({ errors: errors, showErrors: showErrors });

    return showErrors;
  };

  _validateReminder = (reminderData) => {
    const invalidReminder = this.props.reminders.some(
      (rem) => rem.date === reminderData.date && rem.time === reminderData.time
    );

    this.setState({ invalidReminder });

    return invalidReminder;
  };

  _onSubmit = (e) => {
    e.preventDefault();

    if (this._validateForm()) {
      return;
    }

    const { state } = this;
    const reminderData = {
      reminderId: state.reminderId,
      title: state.title,
      date: format(state.selectedDate, 'MM/dd/yyyy'),
      time: state.selectedTime.toTimeString().slice(0,5),
      city: {
        id: state.selectedCity.id,
        name: state.selectedCity.name,
      },
      color: state.reminderColor,
      forecast: []
    };

    if (reminderData.reminderId === -1 && this._validateReminder(reminderData)) {
      return;
    }

    this._resetForm(() => {
      this.props.submitReminder(reminderData);
      this.props.closeReminderModal();
    });
  }

  _closeModal = () => {

    this._resetForm(() => {
      this.props.closeReminderModal();
    });
  }

  _resetForm = (cb = () => null) => {
    this.setState({
      selectedCity: {},
      selectedDate: new Date(),
      selectedTime: new Date(),
      reminderId: -1,
      reminderColor: '#dedede',
      title: '',
    }, cb);
  }

  render() {
    const { state, _closeModal, _handleInputChange, _onSubmit } = this;
    const { title, selectedDate, selectedTime, reminderColor, selectedCity, errors, invalidReminder } = state;
    const { showReminderFormModal, cities } = this.props;
    const lowercaseLabel = selectedCity.name ? selectedCity.name.toLowerCase() : '';
    const selectValue = { label: selectedCity.name || '', value: selectedCity.id || '', lowercaseLabel };


    const formatDate = (date, format, locale) => dateFnsFormat(date, format, { locale });

    return(
      <div className="reminder-form">
        <Modal show={ showReminderFormModal } onClose={ _closeModal }>
          <Modal.Content>
            <Section>
              <h3 className="title">Create a reminder</h3>
              <form onSubmit={ _onSubmit }>
                <Field>
                  <Label>Title:</Label>
                  <Control>
                    <Textarea
                      id="title"
                      className="has-fixed-size"
                      placeholder="Reminder title should not exceed 30 characters..."
                      maxLength={ 30 }
                      onChange={ _handleInputChange }
                      value={ title }
                      color={`${(errors.title) ? 'danger' : 'info'}`}
                    />
                    <Help color="danger">{errors.title}</Help>
                  </Control>
                </Field>
                <Field>
                  <Label>Date:</Label>
                  <Control>
                    <DayPickerInput
                      id="selectedDate"
                      value={ selectedDate }
                      dayPickerProps={{ disabledDays: { before: new Date() } }}
                      inputProps={ { readOnly: true, className: 'input' } }
                      formatDate={ formatDate }
                      format="dd, MMMM ,yyyy"
                      onDayChange={ _handleInputChange }
                    />
                  </Control>
                </Field>
                <Field>
                  <Label>Time:</Label>
                  <Control>
                    <TimePicker
                      disableClock
                      required
                      value={ selectedTime }
                      onChange={ _handleInputChange }
                      clearIcon={ null }
                    />
                  </Control>
                </Field>
                <Field>
                  <Label>Select a City:</Label>
                  <Control>
                    <Select
                      id="selectedCity"
                      className={`${(errors.selectedCity) ? 'has-error' : ''}`}
                      placeholder="Please select a city..."
                      options={ cities }
                      filterOption={createFilter({ ignoreAccents: false })}
                      minimumInputSearch={ 1 }
                      maxMenuHeight={ 150 }
                      value={ selectValue }
                      onChange={ _handleInputChange }
                    />
                    <Help color="danger">{errors.selectedCity}</Help>
                  </Control>
                </Field>
                <Field>
                  <Label>Select a Color:</Label>
                  <Control>
                    <ColorPicker
                      animation="slide-up"
                      enableAlpha={ false }
                      color={ reminderColor }
                      onChange={ _handleInputChange }
                    />
                  </Control>
                </Field>
                <hr/>
                {
                  invalidReminder && <Help color="danger">You already have a reminder with this time and date!</Help>
                }
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
  cities: state.cities,
  reminders: state.reminders.reminders,
});

export default connect(
  mapStateToProps,
  { closeReminderModal, getCities, submitReminder }
)(ReminderForm);

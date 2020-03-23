import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Section, Form, Button } from 'react-bulma-components';
import { connect } from 'react-redux';
import { closeReminderModal } from '../../actions/reminderModalActions';
import "./ReminderForm.scss";

const { Field, Label, Control, Textarea, Input } = Form;

class ReminderForm extends Component {

  static propTypes = {
    showReminderFormModal: PropTypes.bool.isRequired,
    closeReminderModal: PropTypes.func.isRequired,
  };

  _closeModal = () => {
    this.props.closeReminderModal();
  }

  render() {
    const { _closeModal } = this;
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
                      className="has-fixed-size"
                      placeholder="Reminder title should not exceed 30 characters..."
                      maxLength={ 30 } />
                  </Control>
                </Field>
                <Field>
                  <Label>
                    Date:
                  </Label>
                  <Control>
                    <Input type="date" />
                  </Control>
                </Field>
                <Field>
                  <Label>
                    Time:
                  </Label>
                  <Control>
                    <Input type="time" />
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
                    <Input type="color" />
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

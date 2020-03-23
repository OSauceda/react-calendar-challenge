import React, { Component } from 'react';
import { Modal, Section, Form, Button } from 'react-bulma-components';

const { Field, Label, Control, Textarea, Input } = Form;

export default class ReminderForm extends Component {
  render() {
    return(
      <div className="reminder-form">
        <Modal show={ true }>
          <Modal.Content>
            <Section style={{ backgroundColor: 'white' }}>
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
                    <Button type="primary" color="primary">Save Reminder</Button>
                  </Control>
                  <Control>
                    <Button color="link">Cancel</Button>
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
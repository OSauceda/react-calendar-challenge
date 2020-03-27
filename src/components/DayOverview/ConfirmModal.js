import React from 'react';
import { Modal, Section, Button, Columns } from 'react-bulma-components';
import PropTypes from 'prop-types';

const ConfirmModal = (props) => {
  const { showConfirmation,
    closeModal,
    isClearDay,
    onClearDay,
    onDeleteReminder,
    currentSelectedDate,
    deleteReminderId,
  } = props;
  const { Column } = Columns;

  return(
    <Modal
      show={ showConfirmation }
      modal={{ closeOnEsc: false }}
      onClose={ closeModal }
    >
      <Modal.Content>
        <Section className="confirmation-modal txt-centered">
          <p>
            {`Are you sure you want to ${(isClearDay) ? 'delete all reminders for this day?' : 'delete this reminder?'}`}
          </p>
          <Columns className="is-centered is-vcentered">
            <Column>
              <Button
                type="primary"
                color="primary"
                className="submit"
                onClick={ () => {
                  if (isClearDay) {
                    onClearDay(currentSelectedDate)
                    closeModal()

                    return;
                  }

                  onDeleteReminder(deleteReminderId)
                  closeModal()
                } }
              >
                Confirm
              </Button>
            </Column>
            <Column>
              <Button
                color="link"
                onClick={ closeModal }
              >
                Cancel
              </Button>
            </Column>
          </Columns>
        </Section>
      </Modal.Content>
    </Modal>
  );
};

ConfirmModal.propTypes ={
  showConfirmation: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  isClearDay: PropTypes.bool.isRequired,
  currentSelectedDate: PropTypes.string.isRequired,
  onDeleteReminder: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
  deleteReminderId: PropTypes.number.isRequired,
}

export default ConfirmModal;

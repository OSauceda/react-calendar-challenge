import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Content, Columns, Button } from 'react-bulma-components';
import tinycolor from 'tinycolor2';
import './ReminderCard.scss';

const { Header, Footer } = Card;
const { Column } = Columns;

const ReminderCard = (props) => {
  const cardStyles = {
    background: props.reminder.color,
    color:
      tinycolor(props.reminder.color).getBrightness() < 128 ? '#fff' : '#000',
  };

  return (
    <Card className="reminder-card txt-centered" style={cardStyles}>
      <Fragment>
        <Header>
          <Header.Title className="is-inline">
            Title: {props.reminder.title}
          </Header.Title>
        </Header>
        <Content>
          <Columns>
            <Column size={6}>Time: {props.reminder.time}</Column>
            <Column size={6}>City: {props.reminder.city.name}</Column>
          </Columns>
        </Content>
        <Button color="light">Edit Reminder</Button>
      </Fragment>
    </Card>
  );
};

ReminderCard.propTypes = {
  reminder: PropTypes.object.isRequired,
};

export default ReminderCard;

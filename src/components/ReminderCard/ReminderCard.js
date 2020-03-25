import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Content, Columns, Button } from 'react-bulma-components';
import tinycolor from 'tinycolor2';
import './ReminderCard.scss';

const { Header } = Card;
const { Column } = Columns;

const ReminderCard = (props) => {

  const cardStyles = {
    background: props.reminder.color,
    color:
      tinycolor(props.reminder.color).getBrightness() < 128 ? '#fff' : '#000',
  };

  const weatherInformation = props.reminder.forecast.map((weatherObj) => {
    return (
      <Columns key={`weatherforecast_${weatherObj.dt}`} className="forecast-information">
        <Column size={12} className="forecast-time text-center">
          { weatherObj.dt_txt }
        </Column>
        <Column size={12}>
          <Column size={6}>
            <img
              id="wicon"
              className="weather-icon"
              src={`http://openweathermap.org/img/w/${weatherObj.weather[0].icon}.png`}
              alt="Weather icon"
            />
          </Column>
          <Column size={6}>
            <div className="forecast-description">{weatherObj.weather[0].main}</div>
            <div className="main-temp">
              {weatherObj.main.temp}
              <sup>&deg;</sup>C
            </div>
          </Column>
        </Column>
      </Columns>
    );
  });

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
            <Column size={12}>
              { weatherInformation }
            </Column>
          </Columns>
        </Content>
        <Button
          color="light"
          onClick={props.onEdit}
        >
          Edit Reminder
        </Button>
      </Fragment>
    </Card>
  );
};

ReminderCard.propTypes = {
  reminder: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ReminderCard;

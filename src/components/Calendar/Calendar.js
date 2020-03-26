import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { startOfMonth, isBefore, isSameDay, format } from 'date-fns';

// component styles
import './Calendar.scss';

const internals = {};
internals.days_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
internals.days_month_leap_year = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
internals.days_of_the_week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
internals.months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


export default class Calendar extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    customTileContent: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => null,
    customTileContent: () => null
  };

  constructor(props) {
    super(props);

    const today = new Date();

    this.state = {
      currentDate: today,
      date: today,
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      startDayMonth: startOfMonth(today).getDate()
    };
  }

  _changeMonthHandler = (date) => () => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const startDayMonth = startOfMonth(date).getDate();

    this.setState({
      date,
      day,
      month,
      year,
      startDayMonth,
    });
  }

  render() {
    const { _changeMonthHandler } = this;
    const { month, year, startDayMonth, day, currentDate } = this.state;
    const { days_month, days_month_leap_year, days_of_the_week, months } = internals;
    const days = (new Date(year, 1, 29).getDate() === 29) ? days_month_leap_year : days_month;

    return(
      <section className="calendar">
        <div className="calendar-navigation">
          <button
            className="btn btn-previous"
            onClick={ _changeMonthHandler(new Date(year, month - 1, day)) }
          >
            previous
          </button>
          <h3>
            <strong>{months[month]} {year}</strong>
          </h3>
          <button
            className="btn btn-next"
            onClick={ _changeMonthHandler(new Date(year, month + 1, day)) }
          >
            next
          </button>
        </div>
        <div className="calendar-tile-container">
          {
            days_of_the_week.map((day) => (<div className="calendar-day-tile week-days" key={day}><strong>{day}</strong></div>))
          }
          <Fragment>
            {
              Array(days[month] + (startDayMonth - 1))
              .fill(null)
              .map((_, index) => {
                const day = index - (startDayMonth - 2);

                return (
                  <div
                    key={index}
                    onClick={ () => { this.props.onChange(new Date(year, month, day)) } }
                    className={`calendar-day-tile ${(isBefore(new Date(year, month, day), currentDate) && !isSameDay(new Date(year, month, day), currentDate)) ? 'disabled' : ''}`}
                  >
                    <small
                      className={`${(format(new Date(year, month, day), 'MM/dd/yyyy') === format(currentDate, 'MM/dd/yyyy')) ? 'today ' : ''}`}
                    >
                      {day > 0 ? day : ''}
                    </small>
                    {
                      this.props.customTileContent(new Date(year, month, day))
                    }
                  </div>
                );
              })
            }
          </Fragment>
        </div>
      </section>
    );
  }
}
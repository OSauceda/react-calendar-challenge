import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as cities from '../../json/city-list.min.json';
import ReminderForm from './ReminderForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<ReminderForm />', () => {
  const getCitiesMock = jest.fn();
  const fetchWeatherMock = jest.fn();
  const submitReminderMock = jest.fn();
  const closeReminderModalMock = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ReminderForm
          reminderId={{ reminderId: -1 }}
          showReminderFormModal={ true }
          cities={cities.default}
          reminders={[]}
          getCities={getCitiesMock}
          submitReminder={submitReminderMock}
          closeReminderModal={closeReminderModalMock}
          fetchWeather={fetchWeatherMock}
        />
      </Provider>
    );
  });


  it('renders the ReminderForm', () => {
    expect(wrapper).toBeDefined();
  });

  // it('calls fetchCities on mount', () => {
  //   expect(getCitiesMock.mock.calls.length).toBeGreaterThan(0);
  // });

  // it('adds validation errors on form submit without required fields', () => {
  //   const submitButton = wrapper.find('.reminder-submit').at(0);

  //   submitButton.simulate('click');
  //   expect(wrapper.state('showErrors')).toEqual(true);
  // });

  // it('adds validation error for title on form submit without title', () => {
  //   const submitButton = wrapper.find('#reminder-submit').at(0);
  //   submitButton.simulate('click');
  //   expect(wrapper.state('errors')).toHaveProperty('title');
  // });

  // it('adds validation error for selectedCity on form submit without selectedCity', () => {
  //   const submitButton = wrapper.find('#reminder-submit').at(0);
  //   submitButton.simulate('click');
  //   expect(wrapper.state('errors')).toHaveProperty('selectedCity');
  // });
});

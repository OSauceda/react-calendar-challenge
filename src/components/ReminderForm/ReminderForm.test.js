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
});

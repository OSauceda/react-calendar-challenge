import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../../store';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('should render a react component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(wrapper).toBeDefined();
});

import * as React from 'react';
import App from './App';
import {shallow} from 'enzyme';

test('adds 1 + 2 to equal 3', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#greetings')).toHaveText('Hola Ben');
});
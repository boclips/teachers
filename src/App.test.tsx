import {mount} from 'enzyme';
import * as React from 'react';
import App from './App';

test('adds 1 + 2 to equal 3', () => {
  const wrapper = mount(<App/>);
  expect(wrapper.find('#greetings')).toHaveText('Hola Ben');
});
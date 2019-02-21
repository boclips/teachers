import { mount } from 'enzyme';
import * as React from 'react';
import DateFormatter from './DateFormatter';

test('Formats date', () => {
  expect(format(new Date('2018-10-13T10:12:13Z'))).toHaveText('Oct 13, 2018');
});

test('Formats date from string', () => {
  expect(format('2018-10-13T10:12:13Z')).toHaveText('Oct 13, 2018');
});

test('Does not render anything when date is null', () => {
  expect(format(null)).toBeEmptyRender();
});

test('Does not render anything when date is empty', () => {
  expect(format('')).toBeEmptyRender();
});

function format(date) {
  return mount(<DateFormatter date={date} />);
}

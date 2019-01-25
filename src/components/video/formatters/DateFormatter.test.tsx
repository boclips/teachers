import { mount } from 'enzyme';
import * as React from 'react';
import DateFormatter from './DateFormatter';

test('Formats date', () => {
  const formatter = mount(
    <DateFormatter date={new Date('2018-10-13T10:12:13Z')} />,
  );

  expect(formatter).toHaveText('Oct 13, 2018');
});

test('Does not render anything when date is null', () => {
  expect(mount(<DateFormatter date={null} />)).toBeEmptyRender();
});

import { mount } from 'enzyme';
import moment from 'moment';
import * as React from 'react';
import DurationFormatter from './DurationFormatter';

test('Formats duration', () => {
  const formatter = mount(
    <DurationFormatter
      duration={moment.duration({ seconds: 1, minutes: 2, hours: 3 })}
    />,
  );

  expect(formatter).toHaveText('3h 2m 1s');
});

test('Does not render anything when duration is null', () => {
  expect(mount(<DurationFormatter duration={null} />)).toBeEmptyRender();
});

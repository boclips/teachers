import { mount } from 'enzyme';
import * as React from 'react';
import dayjs from 'src/types/dayjs';
import DurationFormatter from './DurationFormatter';

test('Formats duration', () => {
  const formatter = mount(
    <DurationFormatter
      duration={dayjs.duration({ seconds: 1, minutes: 2, hours: 3 })}
    />,
  );

  expect(formatter).toHaveText('3h 2m 1s');
});

test('Does not render anything when duration is null', () => {
  expect(mount(<DurationFormatter duration={null} />)).toBeEmptyRender();
});

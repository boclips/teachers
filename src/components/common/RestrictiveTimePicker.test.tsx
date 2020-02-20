import { TimePicker } from 'antd';
import { shallow } from 'enzyme';
import difference from 'lodash/difference';
import range from 'lodash/range';
import * as moment from 'moment';
import * as React from 'react';
import { noOp } from '../../utils';
import { RestrictiveTimePicker } from './RestrictiveTimePicker';

it('matches the snapshot when rendering a restricted timepicker', () => {
  const component = shallow(
    <RestrictiveTimePicker
      checkboxLabel="Checkbox label"
      label="Label"
      upperBound={60}
      onChange={noOp}
      initialValue={0}
    />,
  );
  expect(component).toMatchSnapshot();
});

it('calls the onChange with seconds, when the time is changed', () => {
  const spy = jest.fn();

  const component = shallow(
    <RestrictiveTimePicker
      checkboxLabel="Checkbox label"
      label="Label"
      upperBound={60}
      onChange={spy}
      initialValue={0}
    />,
  );

  const timePicker = component.find(TimePicker);

  const onChange = timePicker.prop('onChange');

  onChange(moment.utc(63, 'X'), '');

  expect(spy).toHaveBeenCalledWith(63);
});

describe('upper bound restriction', () => {
  const testData = [
    {
      message: 'One hour',
      upperBound: 60 * 60,
      selectedHour: 0,
      selectedMinute: 0,
      expectedEnabledHours: [0, 1],
      expectedEnabledMinutes: range(60),
      expectedEnabledSeconds: range(60),
    },
    {
      message: 'One hour, selected one hour',
      upperBound: 60 * 60,
      selectedHour: 1,
      selectedMinute: 0,
      expectedEnabledHours: [0, 1],
      expectedEnabledMinutes: [0],
      expectedEnabledSeconds: [0],
    },
    {
      message: 'One hour and a half, selected one hour',
      upperBound: 60 * 60 * 1.5,
      selectedHour: 1,
      selectedMinute: 0,
      expectedEnabledHours: [0, 1],
      expectedEnabledMinutes: range(31),
      expectedEnabledSeconds: range(60),
    },
    {
      message: 'Two minutes 40',
      upperBound: 60 + 60 + 40,
      selectedHour: 0,
      selectedMinute: 0,
      expectedEnabledHours: [0],
      expectedEnabledMinutes: range(2 + 1),
      expectedEnabledSeconds: range(60),
    },
    {
      message: 'Two minutes 40, one minute selected',
      upperBound: 60 + 60 + 40,
      selectedHour: 0,
      selectedMinute: 1,
      expectedEnabledHours: [0],
      expectedEnabledMinutes: range(2 + 1),
      expectedEnabledSeconds: range(60),
    },
    {
      message: 'Two minutes 40, two minutes selected',
      upperBound: 60 + 60 + 40,
      selectedHour: 0,
      selectedMinute: 2,
      expectedEnabledHours: [0],
      expectedEnabledMinutes: range(2 + 1),
      expectedEnabledSeconds: range(40 + 1),
    },
  ];

  testData.forEach(data => {
    it(`restricts the input selection for ${data.message}`, () => {
      const component = shallow(
        <RestrictiveTimePicker
          checkboxLabel="Checkbox label"
          label="Label"
          upperBound={data.upperBound}
          onChange={noOp}
          initialValue={0}
        />,
      );

      const timePicker = component.find(TimePicker);

      const disabledHoursFn = timePicker.prop('disabledHours');

      expect(disabledHoursFn()).toEqual(
        difference(range(24), data.expectedEnabledHours),
      );

      const disabledMinutesFn = timePicker.prop('disabledMinutes');

      expect(disabledMinutesFn(data.selectedHour)).toEqual(
        difference(range(60), data.expectedEnabledMinutes),
      );

      const disabledSecondsFn = timePicker.prop('disabledSeconds');

      const disabledSeconds = disabledSecondsFn(
        data.selectedHour,
        data.selectedMinute,
      );
      expect(disabledSeconds).toEqual(
        difference(range(60), data.expectedEnabledSeconds),
      );
    });
  });
});

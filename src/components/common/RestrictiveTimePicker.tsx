import { Checkbox, Form, TimePicker } from 'antd';
import range from 'lodash/range';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';

interface Props {
  checkboxLabel: string;
  label: string;
  upperBound: number;
  onChange: (seconds: number) => void;
  initialValue: number;
}

interface TimeBound {
  hours: number;
  seconds: number;
  minutes: number;
}

const boundToComponents = (bound: number): TimeBound => ({
  hours: Math.floor(bound / 60 / 60),
  minutes: Math.floor((bound / 60) % 60),
  seconds: bound % 60,
});

const getSecondsFromTime = (time: Moment): number => {
  // Moment is not immutable.
  const startOfTheDay = time.clone().startOf('d');
  const timeDifference = time.diff(startOfTheDay);

  return moment.duration(timeDifference).asSeconds();
};

export const RestrictiveTimePicker = (props: Props) => {
  const { checkboxLabel, label, upperBound, onChange, initialValue } = props;
  const upperBoundTime = boundToComponents(upperBound);

  const [value, setValue] = useState(moment.utc(initialValue, 'X'));
  const [disabled, setDisabled] = useState(true);

  const getDisabledHours = () =>
    range(24).filter((hour) => hour > upperBoundTime.hours);

  const getDisabledMinutes = (selectedHour) =>
    range(60).filter((minute) =>
      selectedHour < upperBoundTime.hours
        ? false
        : minute > upperBoundTime.minutes,
    );

  const getDisabledSeconds = (selectedHour, selectedMinute) =>
    range(60).filter((second) =>
      selectedMinute < upperBoundTime.minutes ||
      selectedHour < upperBoundTime.hours
        ? false
        : second > upperBoundTime.seconds,
    );

  const handleChange = (time?: Moment) => {
    if (time != null) {
      setValue(time);
      onChange(getSecondsFromTime(time));
    }
  };

  const onDisableChange = (event) => {
    const isDisabled = !event.target.checked;
    setDisabled(isDisabled);
    if (isDisabled) {
      onChange(undefined);
    } else {
      onChange(getSecondsFromTime(value));
    }
  };

  return (
    <section>
      <Form.Item
        label={checkboxLabel}
        className="hidden-label"
        hasFeedback={false}
      >
        <Checkbox onChange={onDisableChange} />
      </Form.Item>
      <Form.Item label={label} hasFeedback={false}>
        <TimePicker
          disabled={disabled}
          disabledHours={getDisabledHours}
          disabledMinutes={getDisabledMinutes}
          disabledSeconds={getDisabledSeconds}
          format={upperBoundTime.hours > 0 ? 'hh:mm:ss' : 'mm:ss'}
          hideDisabledOptions
          onChange={handleChange}
          value={value}
          showNow={false}
          allowClear={false}
        />
      </Form.Item>
    </section>
  );
};

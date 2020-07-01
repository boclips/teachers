import { Form } from '@ant-design/compatible';

import { Checkbox, TimePicker } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import range from 'lodash/range';
import moment, { Moment } from 'moment';
import React from 'react';

interface Props {
  checkboxLabel: string;
  label: string;
  upperBound: number;
  onChange: (seconds: number) => void;
  initialValue: number;
}
interface State {
  value: Moment;
  disabled: boolean;
}

export class RestrictiveTimePicker extends React.Component<Props, State> {
  public state = {
    value: moment.utc(this.props.initialValue, 'X'),
    disabled: true,
  };

  private upperBound: {
    hours: number;
    seconds: number;
    minutes: number;
  };

  public constructor(props) {
    super(props);

    this.upperBound = this.boundToComponents(this.props.upperBound);
  }

  public componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.upperBound !== this.props.upperBound) {
      this.upperBound = this.boundToComponents(this.props.upperBound);
    }
  }

  public render() {
    return (
      <section>
        <Form.Item label={this.props.checkboxLabel} className="hidden-label">
          <Checkbox onChange={this.handleCheckboxChange} />
        </Form.Item>
        <Form.Item label={this.props.label}>
          <TimePicker
            disabled={this.state.disabled}
            disabledHours={this.getDisabledHours}
            disabledMinutes={this.getDisabledMinutes}
            disabledSeconds={this.getDisabledSeconds}
            format={this.upperBound.hours > 0 ? 'hh:mm:ss' : 'mm:ss'}
            hideDisabledOptions={true}
            onChange={this.handleChange}
            onOpenChange={this.handleOpen}
            value={this.state.value}
          />
        </Form.Item>
      </section>
    );
  }

  private handleOpen = (open: boolean) =>
    setTimeout(() => {
      if (open) {
        // A bit hacky, but the only way we can reliably get the other options to show.
        // Antd won't give us a reference for the DOM element
        const selectContainers = document.querySelectorAll(
          '.ant-time-picker-panel-select',
        );
        if (selectContainers.length) {
          selectContainers.forEach((selectContainer) => {
            const selected = selectContainer.querySelector(
              '.ant-time-picker-panel-select-option-selected',
            ) as HTMLDivElement;

            let scrollTop = 0;
            if (selected) {
              scrollTop =
                selected.offsetTop +
                selected.clientHeight / 2 -
                selectContainer.clientHeight / 2;
            }

            selectContainer.scroll(0, Math.max(0, scrollTop));
          });
        }
      }
    }, 0);

  private boundToComponents = (bound: number) => ({
    hours: Math.floor(bound / 60 / 60),
    minutes: Math.floor((bound / 60) % 60),
    seconds: bound % 60,
  });

  private getDisabledHours = () =>
    range(24).filter((hour) => hour > this.upperBound.hours);

  private getDisabledMinutes = (selectedHour) =>
    range(60).filter((minute) => {
      if (selectedHour < this.upperBound.hours) {
        return false;
      }

      return minute > this.upperBound.minutes;
    });

  private getDisabledSeconds = (selectedHour, selectedMinute) =>
    range(60).filter((second) =>
      selectedMinute < this.upperBound.minutes ||
      selectedHour < this.upperBound.hours
        ? false
        : second > this.upperBound.seconds,
    );

  private handleChange = (time?: Moment) => {
    if (time == null) {
      return;
    }

    this.setState({ value: time }, () => {
      this.props.onChange(this.getSecondsFromValue());
    });
  };

  private getSecondsFromValue() {
    const time = this.state.value;

    // Moment is not immutable.
    const startOfTheDay = time.clone().startOf('d');
    const timeDifference = time.diff(startOfTheDay);

    return moment.duration(timeDifference).asSeconds();
  }

  private handleCheckboxChange = (event: CheckboxChangeEvent) => {
    this.setState({ disabled: !event.target.checked }, () => {
      if (this.state.disabled) {
        this.props.onChange(undefined);
      } else {
        this.props.onChange(this.getSecondsFromValue());
      }
    });
  };
}

import { Slider } from 'antd';
import { SliderValue } from 'antd/lib/slider';
import React from 'react';

export interface Range {
  min: number;
  max: number;
}

interface Props {
  onChange: (duration: Range) => void;
}

class DurationSlider extends React.Component<Props> {
  private getMarks = () => ({
    0: '0m',
    2: '2m',
    4: '4m',
    6: '6m',
    8: '8m',
    10: '10m+',
  });

  private formatToolTip = (value: number) => {
    return value >= 10 ? `${value}m+` : `${value}m`;
  };

  public render() {
    return (
      <Slider
        step={1}
        defaultValue={[0, 10]}
        tipFormatter={this.formatToolTip}
        min={0}
        max={10}
        range={true}
        marks={this.getMarks()}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = (durationValue: SliderValue) => {
    if (!Array.isArray(durationValue) || durationValue.length !== 2) {
      return;
    }

    const min = durationValue[0];
    const max = durationValue[1];

    if (min == null || max == null) {
      return;
    }

    this.props.onChange({
      min: min * 60,
      max: max === 10 ? null : max * 60,
    });
  };
}

export default DurationSlider;

import { SliderValue } from 'antd/lib/slider';
import React from 'react';
import { Range } from '../../../../types/Range';
import { BoclipsSlider } from '../../../common/BoclipsSlider';
import DurationBounds from './DurationBounds';

interface Props {
  onChange: (duration: Range) => void;
  min?: number;
  max?: number;
}

class DurationSlider extends React.Component<Props> {
  private readonly durationBounds = new DurationBounds();

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
      <BoclipsSlider
        step={1}
        defaultValue={[
          this.durationBounds.resolveMin(this.props.min),
          this.durationBounds.resolveMax(this.props.max),
        ]}
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

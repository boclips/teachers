import { SliderValue } from 'antd/lib/slider';
import React from 'react';
import { AgeRange } from '../../types/AgeRange';
import MediaBreakpoints from '../../types/MediaBreakpoints';
import { BoclipsSlider } from './BoclipsSlider';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from './higerOrderComponents/withMediaBreakPoint';

interface Props extends WithMediaBreakPointProps {
  onChange: (e) => void;
  min?: number;
  max?: number;
}

class AgeRangeSlider extends React.Component<Props> {
  private getMarks = () => ({
    3: '3',
    5: '5',
    7: '7',
    9: '9',
    11: '11',
    14: '14',
    16: '16',
    18: '18',
    19:
      this.props.mediaBreakpoint.width <= MediaBreakpoints.sm.width
        ? '+'
        : '19+',
  });

  private formatToolTip = (value: number) => {
    return value >= 19 ? `${value}+` : `${value}`;
  };

  private ageRange = new AgeRange({
    min: this.props.min,
    max: this.props.max,
  });

  public render() {
    return (
      <BoclipsSlider
        defaultValue={[this.ageRange.resolveMin(), this.ageRange.resolveMax()]}
        min={3}
        max={19}
        range={true}
        marks={this.getMarks()}
        onChange={this.handleChange}
        step={null}
        tipFormatter={this.formatToolTip}
      />
    );
  }

  private handleChange = (ageRangeValue: SliderValue) => {
    if (!Array.isArray(ageRangeValue) || ageRangeValue.length !== 2) {
      return;
    }

    const min = ageRangeValue[0];
    const max = ageRangeValue[1];

    if (min == null || max == null) {
      return;
    }

    this.props.onChange(
      new AgeRange({
        min,
        max: max === 19 ? null : max,
      }).getData(),
    );
  };
}

export default withMediaBreakPoint(AgeRangeSlider);

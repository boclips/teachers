import { Slider } from 'antd';
import React from 'react';

const getMarks = () => ({
  0: '0m',
  2: '2m',
  4: '4m',
  6: '6m',
  8: '8m',
  10: '10m+',
});

const formatToolTip = (value: number) => {
  return value >= 10 ? `${value}m+` : `${value}m`;
};

const DurationSlider = React.memo(() => {
  return (
    <Slider
      step={null}
      tipFormatter={formatToolTip}
      range={true}
      marks={getMarks()}
    />
  );
});

export default DurationSlider;

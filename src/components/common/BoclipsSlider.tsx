import Slider, { SliderProps } from 'antd/lib/slider';
import React from 'react';
import './BoclipsSlider.less';

export class BoclipsSlider extends React.Component<SliderProps> {
  public render() {
    return (
      <Slider
        className="slider"
        children={this.props.children}
        {...this.props}
      />
    );
  }
}

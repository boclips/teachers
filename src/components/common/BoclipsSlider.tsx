import Slider, { SliderProps } from 'antd/lib/slider';
import React from 'react';
import './BoclipsSlider.less';

export class BoclipsSlider extends React.Component<SliderProps> {
  public render() {
    return (
      <Slider className="slider" {...this.props}>
        {this.props.children}
      </Slider>
    );
  }
}

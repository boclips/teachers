import Slider, { SliderProps } from 'antd/lib/slider';
import React, { ReactNode } from 'react';
import './BoclipsSlider.less';

interface BoclipsSliderProps extends SliderProps {
  children?: ReactNode;
}

export const BoclipsSlider = (props: BoclipsSliderProps) => {
  return (
    // @ts-ignore
    // eslint-disable-next-line
    <Slider className="slider" {...props}>
      {props.children}
    </Slider>
  );
};

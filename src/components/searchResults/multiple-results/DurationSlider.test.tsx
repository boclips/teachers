import { Slider } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import DurationSlider from './DurationSlider';

it('resolves slider values from minutes to seconds', () => {
  const spy = jest.fn();
  const wrapper = shallow(<DurationSlider onChange={spy} />);

  wrapper
    .find(Slider)
    .props()
    .onChange([2, 4]);

  expect(spy).toHaveBeenCalledWith({
    min: 120,
    max: 240,
  });
});

it('resolves slider with 10+ as unbounded', () => {
  const spy = jest.fn();
  const wrapper = shallow(<DurationSlider onChange={spy} />);

  wrapper
    .find(Slider)
    .props()
    .onChange([2, 10]);

  expect(spy).toHaveBeenCalledWith({
    min: 120,
    max: null,
  });
});

it('does not call callback when types are incorrect', () => {
  const spy = jest.fn();
  const wrapper = shallow(<DurationSlider onChange={spy} />);

  wrapper
    .find(Slider)
    .props()
    .onChange(10);

  expect(spy).not.toHaveBeenCalled();
});

it('does not call callback when values are null', () => {
  const spy = jest.fn();
  const wrapper = shallow(<DurationSlider onChange={spy} />);

  wrapper
    .find(Slider)
    .props()
    .onChange([null, null]);

  expect(spy).not.toHaveBeenCalled();
});

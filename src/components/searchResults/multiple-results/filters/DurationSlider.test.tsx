import { shallow } from 'enzyme';
import React from 'react';
import { BoclipsSlider } from '../../../common/BoclipsSlider';
import DurationSlider from './DurationSlider';

it('resolves slider values from minutes to seconds', () => {
  const spy = jest.fn();
  const wrapper = shallow(<DurationSlider onChange={spy} />);

  wrapper
    .find(BoclipsSlider)
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
    .find(BoclipsSlider)
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
    .find(BoclipsSlider)
    .props()
    .onChange(10);

  expect(spy).not.toHaveBeenCalled();
});

it('does not call callback when values are null', () => {
  const spy = jest.fn();
  const wrapper = shallow(<DurationSlider onChange={spy} />);

  wrapper
    .find(BoclipsSlider)
    .props()
    .onChange([null, null]);

  expect(spy).not.toHaveBeenCalled();
});

it('defaults to 0 - 10 if no default values are given', () => {
  const wrapper = shallow(<DurationSlider onChange={jest.fn()} />);

  expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([0, 10]);
});

it('sets default to min and max values passed in', () => {
  const wrapper = shallow(
    <DurationSlider onChange={jest.fn()} min={120} max={300} />,
  );

  expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([2, 5]);
});

it('sets default to min value passed in and defaults max to 10', () => {
  const wrapper = shallow(<DurationSlider onChange={jest.fn()} min={120} />);

  expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([2, 10]);
});

it('defaults to 0-10 if min and max are out of range', () => {
  const wrapper = shallow(
    <DurationSlider onChange={jest.fn()} min={-1} max={600000} />,
  );

  expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([0, 10]);
});

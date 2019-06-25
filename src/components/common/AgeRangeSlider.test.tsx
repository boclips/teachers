import { shallow } from 'enzyme';
import React from 'react';
import AgeRangeSlider from './AgeRangeSlider';
import { BoclipsSlider } from './BoclipsSlider';

describe('tests slider onchange is called correctly', () => {
  it('does not call callback when types are incorrect', () => {
    const spy = jest.fn();

    const wrapper = shallow(<AgeRangeSlider onChange={spy} />);

    wrapper
      .dive()
      .find(BoclipsSlider)
      .props()
      .onChange(10);

    expect(spy).not.toHaveBeenCalled();
  });

  it('does not call callback when values are null', () => {
    const spy = jest.fn();
    const wrapper = shallow(<AgeRangeSlider onChange={spy} />);

    wrapper
      .dive()
      .find(BoclipsSlider)
      .props()
      .onChange([null, null]);

    expect(spy).not.toHaveBeenCalled();
  });
  it('resolves slider with 19+ as unbounded', () => {
    const spy = jest.fn();
    const wrapper = shallow(<AgeRangeSlider onChange={spy} min={5} max={7} />);

    wrapper
      .dive()
      .find(BoclipsSlider)
      .props()
      .onChange([5, 19]);

    expect(spy).toHaveBeenCalledWith({
      min: 5,
      max: null,
    });
  });
});
describe('tests default slider values are enforced', () => {
  it('defaults to 3 - 19 if no age values are given', () => {
    const wrapper = shallow(<AgeRangeSlider onChange={jest.fn()} />);

    expect(
      wrapper
        .dive()
        .find(BoclipsSlider)
        .props().defaultValue,
    ).toEqual([3, 19]);
  });

  it('sets default to min and max ages passed in', () => {
    const wrapper = shallow(
      <AgeRangeSlider onChange={jest.fn()} min={4} max={9} />,
    );

    expect(
      wrapper
        .dive()
        .find(BoclipsSlider)
        .props().defaultValue,
    ).toEqual([4, 9]);
  });

  it('sets default to min age passed in and defaults max age to 19', () => {
    const wrapper = shallow(
      <AgeRangeSlider onChange={jest.fn()} min={4} max={null} />,
    );

    expect(
      wrapper
        .dive()
        .find(BoclipsSlider)
        .props().defaultValue,
    ).toEqual([4, 19]);
  });
});

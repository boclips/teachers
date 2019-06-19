import { shallow } from 'enzyme';
import React from 'react';
import AgeRangeSlider from './AgeRangeSlider';
import { BoclipsSlider } from './BoclipsSlider';

it('resolves slider with 19+ as unbounded', () => {
    const spy = jest.fn();
    const wrapper = shallow(<AgeRangeSlider onChange={spy} />);

    wrapper
        .find(BoclipsSlider)
        .props()
        .onChange([5, 19]);

    expect(spy).toHaveBeenCalledWith({
        min: 5,
        max: null,
    });
});

it('does not call callback when types are incorrect', () => {
    const spy = jest.fn();
    const wrapper = shallow(<AgeRangeSlider onChange={spy} />);

    wrapper
        .find(BoclipsSlider)
        .props()
        .onChange(10);

    expect(spy).not.toHaveBeenCalled();
});

it('does not call callback when values are null', () => {
    const spy = jest.fn();
    const wrapper = shallow(<AgeRangeSlider onChange={spy} />);

    wrapper
        .find(BoclipsSlider)
        .props()
        .onChange([null, null]);

    expect(spy).not.toHaveBeenCalled();
});

it('defaults to 3 - 19 if no default values are given', () => {
    const wrapper = shallow(<AgeRangeSlider onChange={jest.fn()} />);

    expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([3, 19]);
});

it('sets default to min and max values passed in', () => {
    const wrapper = shallow(
        <AgeRangeSlider onChange={jest.fn()} min={5} max={21} />,
    );

    expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([5, 21]);
});

it('sets default to min value passed in and defaults max to 10', () => {
    const wrapper = shallow(<AgeRangeSlider onChange={jest.fn()} min={7} />);

    expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([7, 19]);
});

it('defaults to 3-19 if min and max are out of range', () => {
    const wrapper = shallow(
        <AgeRangeSlider onChange={jest.fn()} min={-1} max={11} />,
    );

    expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([3, 19]);
});

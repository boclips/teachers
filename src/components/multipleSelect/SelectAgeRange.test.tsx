import { Select } from 'antd';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { AgeRange } from '../../types/AgeRange';
import { SelectAgeRange } from './SelectAgeRange';

it('renders a list of age ranges', () => {
  const wrapper = shallow(
    <SelectAgeRange
      ageRanges={[new AgeRange({ min: 3, max: 5 })]}
      onUpdateAgeRange={jest.fn()}
    />,
  );

  const options = wrapper.find(Select.Option);
  expect(options.first().prop('children')).toEqual('3-5');
});

it('serialises value prop to a json array', () => {
  const wrapper = shallow(
    <SelectAgeRange
      ageRanges={[new AgeRange({ min: 3, max: 5 })]}
      onUpdateAgeRange={jest.fn()}
    />,
  );

  const options = wrapper.find(Select.Option);
  expect(options.first().prop('value')).toEqual('[3,4,5]');
});

it('callback gets called with unique ages', () => {
  const callback = jest.fn();
  const wrapper = mount(
    <SelectAgeRange
      ageRanges={[
        new AgeRange({ min: 3, max: 5 }),
        new AgeRange({ min: 5, max: 7 }),
      ]}
      onUpdateAgeRange={callback}
    />,
  );

  wrapper.find('.ant-select').simulate('click');
  const menuItems = wrapper.find('Trigger').find('MenuItem');

  menuItems.at(0).simulate('click');
  menuItems.at(1).simulate('click');

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenCalledWith([3, 4, 5]);
  expect(callback).toHaveBeenCalledWith([3, 4, 5, 6, 7]);
});

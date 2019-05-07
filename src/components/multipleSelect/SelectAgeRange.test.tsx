import { Select } from 'antd';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { SelectAgeRange } from './SelectAgeRange';

it('renders a list of age ranges', () => {
  const wrapper = shallow(
    <SelectAgeRange
      ageRanges={[{ label: '3-5', min: 3, max: 5 }]}
      onUpdateAgeRange={jest.fn()}
    />,
  );

  const options = wrapper.find(Select.Option);
  expect(options.first().prop('children')).toEqual('3-5');
});

it('serialises value prop to a json array', () => {
  const wrapper = shallow(
    <SelectAgeRange
      ageRanges={[{ label: '3-5', min: 3, max: 5 }]}
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
        { label: '3-5', min: 3, max: 5 },
        { label: '5-7', min: 5, max: 7 },
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

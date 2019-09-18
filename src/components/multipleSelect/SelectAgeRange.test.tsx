import { Select } from 'antd';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { AgeRange } from '../../types/AgeRange';
import { SelectAgeRange } from './SelectAgeRange';

it('renders a list of age ranges', () => {
  const wrapper = shallow(<SelectAgeRange onUpdateAgeRange={jest.fn()} />);

  const options = wrapper.find(Select.Option);
  expect(options.first().prop('children')).toEqual('3-5');
});

it('serialises value prop to a json array', () => {
  const wrapper = shallow(<SelectAgeRange onUpdateAgeRange={jest.fn()} />);

  const options = wrapper.find(Select.Option);
  expect(options.first().prop('value')).toEqual(
    new AgeRange(3, 5).encodeJSON(),
  );
});

it('callback gets called with unique ages', () => {
  const callback = jest.fn();
  const wrapper = mount(<SelectAgeRange onUpdateAgeRange={callback} />);

  wrapper.find('.ant-select').simulate('click');
  const menuItems = wrapper.find('Trigger').find('MenuItem');

  menuItems.at(0).simulate('click');
  expect(callback).toHaveBeenCalledWith([new AgeRange(3, 5).encodeJSON()]);

  menuItems.at(1).simulate('click');
  expect(callback).toHaveBeenCalledWith([
    new AgeRange(3, 5).encodeJSON(),
    new AgeRange(5, 7).encodeJSON(),
  ]);
  expect(callback).toHaveBeenCalledTimes(2);
});

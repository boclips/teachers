import { Select } from 'antd';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { SelectSubjects } from './SelectSubjects';

test('renders a list of subjects alphabetically ordered', () => {
  const wrapper = shallow(
    <SelectSubjects
      subjects={[{ id: '1', name: 'Maths' }, { id: '3', name: 'Art' }]}
      onUpdateSubjects={jest.fn()}
    />,
  );

  const options = wrapper.find(Select.Option);
  expect(options.at(0).prop('children')).toBe('Art');
  expect(options.at(1).prop('children')).toBe('Maths');
});

test('onSelection returns a list of selected ids', () => {
  const callback = jest.fn();
  const wrapper = mount(
    <SelectSubjects
      subjects={[{ id: '1', name: 'Maths' }, { id: '3', name: 'Art' }]}
      onUpdateSubjects={callback}
    />,
  );

  wrapper.find('.ant-select').simulate('click');
  const menuItems = wrapper.find('Trigger').find('MenuItem');

  menuItems.at(0).simulate('click');
  menuItems.at(1).simulate('click');

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenCalledWith(['3', '1']);
});

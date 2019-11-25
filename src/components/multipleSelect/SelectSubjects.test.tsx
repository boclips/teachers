import { Select } from 'antd';
import { SubjectFactory } from 'boclips-api-client/dist/test-support';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Props, SelectSubjects, State } from './SelectSubjects';

test('renders a list of subjects alphabetically ordered', () => {
  const wrapper = shallow(
    <SelectSubjects
      subjects={[
        SubjectFactory.sample({ id: '1', name: 'Maths' }),
        SubjectFactory.sample({ id: '3', name: 'Art' }),
      ]}
      onUpdateSubjects={jest.fn()}
      placeholder="Select a subject"
      initialValue={[]}
    />,
  );

  const options = wrapper.find(Select.Option);
  expect(options.at(0).prop('children')).toBe('Art');
  expect(options.at(1).prop('children')).toBe('Maths');
});

test('renders a list of subjects alphabetically ordered, after receiving an update', () => {
  const subjects = [
    { id: '1', name: 'Maths' },
    { id: '3', name: 'Art' },
  ];

  const wrapper = shallow(
    <SelectSubjects
      subjects={[]}
      onUpdateSubjects={jest.fn()}
      placeholder="Select a subject"
      initialValue={[]}
    />,
  );

  const options = wrapper.find(Select.Option);
  expect(options.length).toEqual(0);

  wrapper.setProps({ subjects });

  const optionsAfterUpdate = wrapper.find(Select.Option);
  expect(optionsAfterUpdate.length).toEqual(2);

  expect(optionsAfterUpdate.at(0).prop('children')).toBe('Art');
  expect(optionsAfterUpdate.at(1).prop('children')).toBe('Maths');
});

test('onSelection returns a list of selected ids', () => {
  const callback = jest.fn();
  const wrapper = mount(
    <SelectSubjects
      subjects={[
        SubjectFactory.sample({ id: '1', name: 'Maths' }),
        SubjectFactory.sample({ id: '3', name: 'Art' }),
      ]}
      onUpdateSubjects={callback}
      placeholder="Select a subject"
      initialValue={[]}
    />,
  );

  wrapper.find('.ant-select').simulate('click');
  const menuItems = wrapper.find('Trigger').find('MenuItem');

  menuItems.at(0).simulate('click');
  menuItems.at(1).simulate('click');

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenCalledWith(['3', '1']);
});

test('initial state for subjects is set by initial value', () => {
  const callback = jest.fn();
  const wrapper = mount<Props, State>(
    <SelectSubjects
      subjects={[
        SubjectFactory.sample({ id: '1', name: 'Maths' }),
        SubjectFactory.sample({ id: '3', name: 'Art' }),
      ]}
      onUpdateSubjects={callback}
      placeholder="Select a subject"
      initialValue={['1', '2']}
    />,
  );

  expect(wrapper.state().value).toEqual(['1', '2']);
});

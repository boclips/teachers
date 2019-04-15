import { Select } from 'antd';
import { shallow } from 'enzyme';
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

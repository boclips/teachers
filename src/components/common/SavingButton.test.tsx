import { Button } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import SavingButton from './SavingButton';

test('renders button with props', () => {
  const onclick = () => {};
  const wrapper = shallow(<SavingButton data-qa="sometin" onClick={onclick} />);

  expect(wrapper.find(Button)).toHaveProp('data-qa', 'sometin');
  expect(wrapper.find(Button)).toHaveProp('onClick', onclick);
});

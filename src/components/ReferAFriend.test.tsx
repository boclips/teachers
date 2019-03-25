import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import ReferAFriend from './ReferAFriend';

let wrapper: ReactWrapper;

beforeEach(() => {
  wrapper = mount(<ReferAFriend text={'Refer a friend'} />);
});

test('initializes input with value prop', () => {
  expect(wrapper.find('a').text()).toBe('Refer a friend');
});

test('on click a modal pops up', () => {
  wrapper.find('a').simulate('click');
  expect(wrapper.debug()).toContain('visible={true}');
});

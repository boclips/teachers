import { mount } from 'enzyme';
import React from 'react';
import { TabNames, TabsComponent } from './TabsComponent';

test('news tab is active when news mode is true', () => {
  const wrapper = mount(
    <TabsComponent
      isNewsMode={true}
      onTabChange={jest.fn()}
      tabs={[TabNames.MAIN, TabNames.NEWS]}
    />,
  );

  expect(wrapper.find('.ant-tabs-tab-active').text()).toEqual(TabNames.NEWS);
});

test('main tab is active when news mode is false', () => {
  const wrapper = mount(
    <TabsComponent
      isNewsMode={false}
      onTabChange={jest.fn()}
      tabs={[TabNames.MAIN, TabNames.NEWS]}
    />,
  );

  expect(wrapper.find('.ant-tabs-tab-active').text()).toEqual(TabNames.MAIN);
});

test('tab click calls onTabChange', () => {
  const onTabChange = jest.fn();
  const inActiveTab = TabNames.NEWS;
  const wrapper = mount(
    <TabsComponent
      isNewsMode={false}
      onTabChange={onTabChange}
      tabs={[TabNames.MAIN, TabNames.NEWS]}
    />,
  );

  wrapper
    .find('.ant-tabs-tab')
    .filterWhere(tab => tab.text() === inActiveTab)
    .simulate('click');

  expect(onTabChange).toHaveBeenCalledWith(inActiveTab);
});

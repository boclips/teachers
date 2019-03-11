import { mount } from 'enzyme';
import React from 'react';
import { TabNames } from './TabsComponent';
import { TabsContainer } from './TabsContainer';

test('click on news calls goToNews', () => {
  const mockGoToNews = jest.fn();
  const tabsContainer = mount(
    <TabsContainer
      isNewsMode={false}
      goToNewsResults={mockGoToNews}
      // tslint:disable-next-line:jsx-no-lambda
      goToSearchResults={() => {}}
    />,
  );

  tabsContainer
    .find('.ant-tabs-tab')
    .filterWhere(tab => tab.text() === TabNames.NEWS)
    .simulate('click');

  expect(mockGoToNews).toBeCalled();
});

test('click on main calls goToSearch', () => {
  const mockGoToSearch = jest.fn();
  const tabsContainer = mount(
    <TabsContainer
      isNewsMode={true}
      // tslint:disable-next-line:jsx-no-lambda
      goToNewsResults={() => {}}
      goToSearchResults={mockGoToSearch}
    />,
  );

  tabsContainer
    .find('.ant-tabs-tab')
    .filterWhere(tab => tab.text() === TabNames.MAIN)
    .simulate('click');

  expect(mockGoToSearch).toBeCalled();
});

import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Link, MemoryRouter } from 'react-router-dom';
import { By } from '../../../../test-support/By';
import {
  MockStoreFactory,
  UserProfileFactory,
} from '../../../../test-support/factories';
import { setWidth } from '../../../../test-support/setWidth';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import { NavBarButtonsContainer } from './NavBarButtonsContainer';
import TopNavbarContainer from './TopNavbarContainer';

const user = UserProfileFactory.sample({ authenticated: true });

describe('when authenticated', () => {
  test('renders search bar', () => {
    const wrapper = mountAuthenticatedLayout();

    expect(wrapper.find('Connect(SearchBar)')).toExist();
  });

  test('renders tabs', () => {
    const wrapper = mountAuthenticatedLayoutWithTabs();

    expect(wrapper.find(By.dataQa('navbar-tabs'))).toExist();
  });

  test('does not render tabs', () => {
    const wrapper = mountAuthenticatedLayout();

    expect(wrapper.find(By.dataQa('navbar-tabs'))).not.toExist();
  });

  test('does not render search bar when configured appropriately', () => {
    const wrapper = mountAuthenticatedLayoutWithoutSearch();

    expect(wrapper.find('Connect(SearchBar)')).not.toExist();
  });

  test('renders Link in logo', () => {
    const wrapper = mountAuthenticatedLayout();

    expect(wrapper.find(Link)).toExist();
  });

  test('renders logout button', () => {
    const wrapper = mountAuthenticatedLayout();

    expect(wrapper.find(AccountMenuContainer)).toExist();
  });

  test('renders navbar buttons container', () => {
    const wrapper = mountAuthenticatedLayout();

    expect(wrapper.find(NavBarButtonsContainer)).toExist();
  });

  describe('mobile view', () => {
    test('does not render navbar buttons container and only renders account menu container', () => {
      setWidth(400);

      const wrapper = mountAuthenticatedLayout();

      expect(wrapper.find(NavBarButtonsContainer)).not.toExist();
      expect(wrapper.find(AccountMenuContainer)).toExist();
    });
  });

  function mountAuthenticatedLayout() {
    return mount(
      <Provider store={MockStoreFactory.sample({ user })}>
        <MemoryRouter>
          <TopNavbarContainer />
        </MemoryRouter>
      </Provider>,
    );
  }

  function mountAuthenticatedLayoutWithoutSearch() {
    return mount(
      <Provider store={MockStoreFactory.sample({ user })}>
        <MemoryRouter>
          <TopNavbarContainer showSearchBar={false} />
        </MemoryRouter>
      </Provider>,
    );
  }

  function mountAuthenticatedLayoutWithTabs() {
    return mount(
      <Provider store={MockStoreFactory.sample({ user })}>
        <MemoryRouter>
          <TopNavbarContainer showTabs={true} />
        </MemoryRouter>
      </Provider>,
    );
  }
});

describe('when not authenticated', () => {
  test('does not render search bar', () => {
    const wrapper = mountAnonymousLayout();

    expect(wrapper.find('Connect(SearchBar)')).not.toExist();
  });

  test('renders logout button', () => {
    const wrapper = mountAnonymousLayout();

    expect(wrapper.find(AccountMenuContainer)).not.toExist();
  });

  test('does not render navbar buttons container', () => {
    const wrapper = mountAnonymousLayout();

    expect(wrapper.find(NavBarButtonsContainer)).not.toExist();
  });

  function mountAnonymousLayout() {
    return mount(
      <Provider store={MockStoreFactory.sample({ user: undefined })}>
        <MemoryRouter>
          <TopNavbarContainer />
        </MemoryRouter>
      </Provider>,
    );
  }
});

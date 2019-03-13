import { shallow } from 'enzyme';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { UserProfileFactory } from '../../../test-support/factories';
import { LoginState } from '../../types/State';
import { AccountMenuContainer } from './accountMenu/AccountMenuContainer';
import TopNavbarContainer from './TopNavbarContainer';

const mockStore = configureStore<LoginState>();
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

  function mountAuthenticatedLayout() {
    return shallowWithStore(<TopNavbarContainer />, mockStore({ user }))
      .dive()
      .dive();
  }

  function mountAuthenticatedLayoutWithoutSearch() {
    return shallowWithStore(
      <TopNavbarContainer showSearchBar={false} />,
      mockStore({ user }),
    )
      .dive()
      .dive();
  }

  function mountAuthenticatedLayoutWithTabs() {
    return shallowWithStore(
      <TopNavbarContainer showTabs={true} />,
      mockStore({ user }),
    )
      .dive()
      .dive();
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

  function mountAnonymousLayout() {
    return shallowWithStore(
      <TopNavbarContainer />,
      mockStore({ user: undefined }),
    )
      .dive()
      .dive();
  }
});

const shallowWithStore = (component: ReactElement<any>, store: Store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};
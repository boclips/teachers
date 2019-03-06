import { shallow } from 'enzyme';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import { UserProfileFactory } from '../../../test-support/factories';
import { LoginState } from '../../types/State';
import { LogoutButton } from '../common/LogoutButton';
import TopSearchBarLayout from './TopSearchBarLayout';

const mockStore = configureStore<LoginState>();
const user = UserProfileFactory.sample({ authenticated: true });

describe('when authenticated', () => {
  test('renders search bar', () => {
    const wrapper = mountAuthenticatedLayout();

    expect(wrapper.find('Connect(SearchBar)')).toExist();
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

    expect(wrapper.find(LogoutButton)).toExist();
  });

  function mountAuthenticatedLayout() {
    return shallowWithStore(
      <TopSearchBarLayout>
        <div>hi</div>
      </TopSearchBarLayout>,
      mockStore({ user }),
    ).dive();
  }

  function mountAuthenticatedLayoutWithoutSearch() {
    return shallowWithStore(
      <TopSearchBarLayout showSearchBar={false}>
        <div>hi</div>
      </TopSearchBarLayout>,
      mockStore({ user }),
    ).dive();
  }
});

describe('when not authenticated', () => {
  test('does not render search bar', () => {
    const wrapper = mountAnonymousLayout();

    expect(wrapper.find('Connect(SearchBar)')).not.toExist();
  });

  test('renders logout button', () => {
    const wrapper = mountAnonymousLayout();

    expect(wrapper.find(LogoutButton)).not.toExist();
  });

  function mountAnonymousLayout() {
    return shallowWithStore(
      <TopSearchBarLayout>
        <div>hi</div>
      </TopSearchBarLayout>,
      mockStore({ user: undefined }),
    ).dive();
  }
});

const shallowWithStore = (component: ReactElement<any>, store: Store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};

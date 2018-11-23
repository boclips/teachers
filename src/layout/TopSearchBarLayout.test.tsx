import { shallow } from 'enzyme';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import { LogoutButton } from '../components/LogoutButton';
import { LoginState } from '../State';
import TopSearchBarLayout from './TopSearchBarLayout';

const mockStore = configureStore<LoginState>();
const login = true;

describe('when authenticated', () => {
  test('renders search bar', () => {
    const wrapper = mountAuthenticatedLayout();

    expect(wrapper.find('Connect(SearchBar)')).toExist();
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
      mockStore({ login }),
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
      mockStore({ login: undefined }),
    ).dive();
  }
});

const shallowWithStore = (component: ReactElement<any>, store: Store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};

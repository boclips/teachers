import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Link, MemoryRouter } from 'react-router-dom';
import SearchBar from 'src/components/searchBar/SearchBar';
import {
  MockStoreFactory,
  UserProfileFactory,
} from '../../../../test-support/factories';
import { setWidth } from '../../../../test-support/setWidth';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import { NavbarButtonsContainer } from './NavbarButtonsContainer';
import { TopNavbarContainer } from './TopNavbarContainer';

const user = UserProfileFactory.sample({});

test('renders search bar', () => {
  const wrapper = mountTopNavBarWithSearchBar();

  expect(wrapper.find(SearchBar)).toExist();
});

test('renders account menu', () => {
  const wrapper = mountTopNavBarWithAccountMenu();

  expect(wrapper.find(AccountMenuContainer)).toExist();
});

test('renders navbar with account menu and search bar', () => {
  const wrapper = mountTopNavBarWithAccountMenuAndSearchBar();

  expect(wrapper.find(NavbarButtonsContainer)).toExist();
  expect(wrapper.find(SearchBar)).toExist();
});

test('renders top navbar with navigation', () => {
  const wrapper = mountTopNavBarWithNavigation();

  expect(wrapper.find(NavbarButtonsContainer)).toExist();
  expect(wrapper.find('Connect(SearchBar)')).not.toExist();
  expect(wrapper.find(Link)).toExist();
});

test('renders navbar without any elements but always with a logo', () => {
  const wrapper = mountTopNavBarWithoutAnything();

  expect(wrapper.find(NavbarButtonsContainer)).not.toExist();
  expect(wrapper.find('Connect(SearchBar)')).not.toExist();
  expect(wrapper.find(Link)).not.toExist();
});

test('does not render navbar buttons container and only renders account menu container', () => {
  setWidth(400);

  const wrapper = mountTopNavBarWithAccountMenu();

  expect(wrapper.find(NavbarButtonsContainer)).not.toExist();
  expect(wrapper.find(AccountMenuContainer)).toExist();
});

test('does not render search bar', () => {
  const wrapper = mountTopNavBarWithoutUser();

  expect(wrapper.find('Connect(SearchBar)')).not.toExist();
  expect(wrapper.find(AccountMenuContainer)).not.toExist();
  expect(wrapper.find(NavbarButtonsContainer)).not.toExist();
});

function mountTopNavBarWithoutUser() {
  return mount(
    <Provider store={MockStoreFactory.sample({ user: undefined })}>
      <MemoryRouter>
        <TopNavbarContainer />
      </MemoryRouter>
    </Provider>,
  );
}

function mountTopNavBarWithAccountMenu() {
  return mount(
    <Provider store={MockStoreFactory.sample({ user })}>
      <MemoryRouter>
        <TopNavbarContainer showNavigation={true} />
      </MemoryRouter>
    </Provider>,
  );
}

function mountTopNavBarWithAccountMenuAndSearchBar() {
  return mount(
    <Provider store={MockStoreFactory.sample({ user })}>
      <MemoryRouter>
        <TopNavbarContainer showNavigation={true} showSearchBar={true} />
      </MemoryRouter>
    </Provider>,
  );
}

function mountTopNavBarWithSearchBar() {
  return mount(
    <Provider store={MockStoreFactory.sample({ user })}>
      <MemoryRouter>
        <TopNavbarContainer showSearchBar={true} />
      </MemoryRouter>
    </Provider>,
  );
}

function mountTopNavBarWithNavigation() {
  return mount(
    <Provider store={MockStoreFactory.sample({ user })}>
      <MemoryRouter>
        <TopNavbarContainer showNavigation={true} />
      </MemoryRouter>
    </Provider>,
  );
}

function mountTopNavBarWithoutAnything() {
  return mount(
    <Provider store={MockStoreFactory.sample({ user })}>
      <MemoryRouter>
        <TopNavbarContainer />
      </MemoryRouter>
    </Provider>,
  );
}

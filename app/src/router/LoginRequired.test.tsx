import {
  RouterActionType,
  RouterState as ReactRouterState,
} from 'connected-react-router';
import { shallow } from 'enzyme';
import { LocationDescriptorObject } from 'history';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import { By } from '../../test-support/By';
import { UserCredentials } from '../login/UserCredentials';
import { LocationState, RouterState, UserState } from '../State';
import LoginRequired from './LoginRequired';

const mockStore = configureStore<RouterState & UserState>();

const routerState: ReactRouterState = Object.freeze({
  location: {
    pathname: '/videos',
    search: '?q=123',
    hash: 'xyz',
    state: null,
  },
  action: 'PUSH' as RouterActionType,
});

function shallowRender(store: Store<any>) {
  const options = { context: { store } };
  return shallow(
    <LoginRequired>
      <span data-qa="restricted-content" />
    </LoginRequired>,
    options,
  ).dive(options);
}

test('Redirects when there is no user', () => {
  const wrapper = shallowRender(
    mockStore({
      router: routerState,
      user: null,
    }),
  );

  const expectedRedirectTo: LocationDescriptorObject<LocationState> = {
    pathname: '/login',
    state: {
      from: {
        pathname: '/videos',
        search: '?q=123',
        hash: 'xyz',
        state: null,
      },
    },
  };

  const redirect = wrapper.find(Redirect);
  expect(redirect).toExist();
  expect(redirect).toHaveProp('to', expectedRedirectTo);
});

test('Redirects when user credentials are not valid', () => {
  const user: UserCredentials = {
    username: 'some-username',
    password: 'some-password',
    valid: false,
  };

  const wrapper = shallowRender(
    mockStore({
      router: routerState,
      user,
    }),
  );

  const redirect = wrapper.find(Redirect);
  expect(redirect).toExist();
});

test('Renders children when user credentials are valid', () => {
  const user: UserCredentials = {
    username: 'some-username',
    password: 'some-password',
    valid: true,
  };

  const wrapper = shallowRender(
    mockStore({
      router: routerState,
      user,
    }),
  );

  const content = wrapper.find(By.dataQa('restricted-content'));
  expect(content).toExist();
});

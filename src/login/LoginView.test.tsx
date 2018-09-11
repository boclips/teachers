import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import configureStore from 'redux-mock-store';
import { UserState } from '../State';
import { login } from '../test-support/enzymeHelpers';
import LoginView, { loginUser } from './LoginView';

const mockStore = configureStore<UserState>();

function mountWith(store: Store) {
  return mount(
    <Provider store={store}>
      <LoginView redirectPath="/" />
    </Provider>,
  );
}

test('dispatches an action with login creds when login button clicked', () => {
  const store = mockStore({ user: null });
  const wrapper = mountWith(store);

  login(wrapper, 'username', 'password');

  expect(store.getActions()).toContainEqual(
    loginUser({ username: 'username', password: 'password' }),
  );
});

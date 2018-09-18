/* tslint:disable:no-string-literal */

import axios from 'axios';

jest.mock('../links/fetchLinks');

import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import { UserState } from '../State';
import FetchProvider from './FetchProvider';

const mockStore = configureStore<UserState>();
const mountFetchProvider = (store: Store) =>
  mount(
    <Provider store={store}>
      <FetchProvider>
        <div id="child" />
      </FetchProvider>
    </Provider>,
  );

describe('FetchProvider', () => {
  test('renders child component', () => {
    const wrapper = mountFetchProvider(mockStore({ user: null }));

    expect(wrapper.find('#child')).toExist();
  });
});

describe('axios', () => {
  test('when valid credentials received sets global authorization header', async () => {
    const store = mockStore({
      user: { username: 'user', password: 'password', valid: true },
    });
    mountFetchProvider(store);

    expect(axios.defaults.headers.common.Authorization).toEqual(
      'Basic dXNlcjpwYXNzd29yZA==',
    );
  });

  test('when invalid credentials received removes global authorization header', async () => {
    const store = mockStore({
      user: { username: 'user', password: 'password', valid: false },
    });
    mountFetchProvider(store);

    expect(axios.defaults.headers.common.Authorization).toBeFalsy();
  });
});

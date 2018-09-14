/* tslint:disable:no-string-literal */

jest.mock('../links/fetchLinks');

import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import MockFetchVerify from '../../test-support/MockFetchVerify';
import { UserState } from '../State';
import FetchProvider, { boclipsFetch } from './FetchProvider';

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

describe('boclipsFetch', () => {
  test('when valid credentials received sets authorization header', async () => {
    const store = mockStore({
      user: { username: 'user', password: 'password', valid: true },
    });
    mountFetchProvider(store);
    MockFetchVerify.get('/test', {});

    await boclipsFetch('/test').then(() => {
      expect(fetchMock.lastOptions().headers['Authorization']).toEqual(
        'Basic dXNlcjpwYXNzd29yZA==',
      );
    });
  });

  test('when invalid credentials received sets no authorization header', async () => {
    const store = mockStore({
      user: { username: 'user', password: 'password', valid: false },
    });
    mountFetchProvider(store);
    MockFetchVerify.get('/test', {});

    await boclipsFetch('/test').then(() => {
      expect(fetchMock.lastOptions().headers).toBeFalsy();
    });
  });
});

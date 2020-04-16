import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import BoclipsSecurity from 'boclips-js-security';
import State from '../types/State';
import { noOp } from './index';

export const storyWithProvider = (store: Store<State>) => (story) => (
  <Provider store={store}>{story()}</Provider>
);

export const storyWithRouter = () => (story) => (
  <Router history={createMemoryHistory()}>{story()}</Router>
);

export const storyWithAuthentication = () => (story) => {
  BoclipsSecurity.createInstance({
    clientId: 'testing-storybook',
    realm: 'testing-storybook',
    onLogin: noOp,
    onFailure: noOp,
    authEndpoint: '',
    mode: 'check-sso',
  });

  return story();
};

import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import State from '../types/State';

export const storyWithProvider = (store: Store<State>) => story => (
  <Provider store={store}>{story()}</Provider>
);

import { render as rtlRender, RenderResult } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { applyMiddleware, createStore, Store } from 'redux';
import { History } from 'history';
import { createReducer } from '../src/app/redux/createReducer';
import State from '../src/types/State';

interface Options {
  initialState?: Partial<State>;
  reducers?: any[];
  middlewares?: any[];
}

export interface ResultingContext extends RenderResult {
  store: Store;
  history: History;
}

export const renderWithStore = (
  ui,
  { initialState = {}, reducers = [], middlewares = [] }: Options = {},
): ResultingContext => {
  const store: Store = createStore(
    createReducer(...reducers),
    initialState,
    applyMiddleware(...middlewares),
  );

  return renderWithCreatedStore(ui, store);
};

export const renderWithCreatedStore = (
  ui,
  store: Store,
  history = createMemoryHistory({}),
): ResultingContext => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
    }),
    // Adding `store`, and `history` to the returned utilities to allow us
    // To reference it in our tests (just try to avoid using
    // This to test implementation details).
    store,
    history,
  };
};

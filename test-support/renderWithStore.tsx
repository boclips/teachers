import { render as rtlRender, RenderResult } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { applyMiddleware, createStore, Store } from 'redux';
import { History } from 'history';
import { createReducer } from 'src/app/redux/createReducer';
import { ConnectedRouter } from 'connected-react-router';
import { createBoclipsStore } from 'src/app/redux/store';
import State from '../src/types/State';

interface Options {
  initialState?: Partial<State>;
  reducers?: any[];
  middlewares?: any[];
}

export interface ResultingContext extends RenderResult {
  store: Store<State>;
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

  return renderWithCreatedStore(ui, store, createMemoryHistory({}));
};

export const renderWithBoclipsStore = (
  ui,
  initialState: Partial<State> = {},
  history = createMemoryHistory(),
): ResultingContext => {
  const store = createBoclipsStore(initialState, history);

  return renderWithCreatedStore(ui, store, history);
};

export const renderWithCreatedStore = (
  ui,
  store: Store,
  history,
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

export const renderWithConnectedRoutes = (
  routes,
  store: Store,
  history: History,
): ResultingContext => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    );
  }

  return {
    ...rtlRender(routes, {
      wrapper: Wrapper,
    }),
    store,
    history,
  };
};

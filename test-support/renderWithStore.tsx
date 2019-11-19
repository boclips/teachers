import { render as rtlRender } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { createReducer } from '../src/app/redux/createReducer';

export const renderWithStore = (
  ui,
  { initialState = {}, reducers = [], middlewares = [] } = {},
) => {
  const store = createStore(
    createReducer(...reducers),
    initialState,
    applyMiddleware(...middlewares),
  );

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={createMemoryHistory({})}>{children}</Router>
      </Provider>
    );
  }
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
    }),
    // Adding `store` to the returned utilities to allow us
    // To reference it in our tests (just try to avoid using
    // This to test implementation details).
    store,
  };
};

import { replace } from 'connected-react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { LinksFactory, MockStoreFactory } from 'test-support/factories';
import CreateAccountView from './CreateAccountView';

describe('when accounts cannot be created', () => {
  it('redirects to homepage without createAccount link', async () => {
    const store = MockStoreFactory.sample({
      links: {
        loadingState: 'success',
        entries: {
          ...LinksFactory.sample(),
          createAccount: undefined,
        },
      },
    });

    mount(
      <Provider store={store}>
        <Router history={createMemoryHistory()}>
          <CreateAccountView />
        </Router>
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()[0]).toEqual(replace('/'));
  });
});

import { ConnectedRouter, RouterActionType } from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { CollectionState, RouterState } from '../../types/State';
import CollectionListView from './CollectionListView';

const mockStore = configureStore<CollectionState & RouterState>();

function render(collection) {
  const store = mockStore({
    collections: collection,
    router: {
      location: {
        pathname: '',
        search: `?q=${''}`,
        hash: '',
        state: null,
      },
      action: 'PUSH' as RouterActionType,
    },
  });

  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={createMemoryHistory()}>
        <CollectionListView />
      </ConnectedRouter>
    </Provider>,
  );

  return { store, wrapper };
}

test('displays an empty state when no collections', () => {
  const { wrapper } = render({
    loading: false,
    updating: false,
    userCollections: [],
  });

  expect(wrapper.find(By.dataQa('no-collections'))).toHaveText(
    'You have no collections',
  );
});

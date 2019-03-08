import { ConnectedRouter, RouterActionType } from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { fetchCollectionsAction } from '../../components/collection/redux/actions/fetchCollectionsAction';
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

test('dispatches FETCH_COLLECTIONS when mounted', () => {
  const { store } = render({});
  expect(store.getActions()).toContainEqual(fetchCollectionsAction());
});

test('does not dispatch FETCH_COLLECTIONS when mounted and collection already reloaded', () => {
  const { store } = render({ loading: false, updating: false, items: [] });
  expect(store.getActions()).not.toContainEqual(fetchCollectionsAction());
});

test('displays an empty state when no collections', () => {
  const { wrapper } = render({ loading: false, updating: false, items: [] });

  expect(wrapper.find(By.dataQa('no-collections'))).toHaveText(
    'You have no collections',
  );
});

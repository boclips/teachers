import { ConnectedRouter, RouterActionType } from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Link } from '../../types/Link';
import { CollectionState, RouterState } from '../../types/State';
import CollectionView, { fetchCollectionAction } from './CollectionView';

const mockStore = configureStore<CollectionState & RouterState>();

test('dispatches FETCH_COLLECTION when mounted', () => {
  const store = mockStore({
    videoCollection: {
      videos: [],
      links: {
        addVideo: new Link({ href: '' }),
      },
    },
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

  mount(
    <Provider store={store}>
      <ConnectedRouter history={createMemoryHistory()}>
        <CollectionView />
      </ConnectedRouter>
    </Provider>,
  );

  expect(store.getActions()).toContainEqual(fetchCollectionAction());
});

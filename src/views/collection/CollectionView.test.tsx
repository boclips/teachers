import { ConnectedRouter, RouterActionType } from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { Link } from '../../types/Link';
import { CollectionState, RouterState } from '../../types/State';
import { Video } from '../../types/Video';
import { fetchCollectionsAction } from './CollectionListView';
import CollectionView from './CollectionView';

const mockStore = configureStore<CollectionState & RouterState>();

function render(videos: Video[]) {
  const store = mockStore({
    collections: {
      loading: true,
      items: [
        {
          id: 'default',
          title: '',
          updatedAt: '',
          videos,
          links: {
            addVideo: new Link({ href: '' }),
            removeVideo: new Link({ href: '' }),
            self: new Link({ href: '' }),
          },
        },
      ],
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

  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={createMemoryHistory()}>
        <CollectionView collectionId="default" />
      </ConnectedRouter>
    </Provider>,
  );

  return { store, wrapper };
}

test('dispatches FETCH_COLLECTIONS when mounted', () => {
  const { store } = render([]);
  expect(store.getActions()).toContainEqual(fetchCollectionsAction());
});

test('displays an empty state when the collection is empty', () => {
  const { wrapper } = render([]);

  expect(wrapper.find(By.dataQa('collection-empty-title'))).toHaveText(
    'This video collection is empty',
  );
});

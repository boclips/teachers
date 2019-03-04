import { ConnectedRouter, RouterActionType } from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { LinksFactory, VideoFactory } from '../../../test-support/factories';
import { CollectionTitleHelper } from '../../components/collection/CollectionTitle.test';
import { renameCollectionAction } from '../../components/collection/redux/actions/renameCollectionAction';
import { Link } from '../../types/Link';
import { CollectionState, LinksState, RouterState } from '../../types/State';
import { Video } from '../../types/Video';
import { fetchCollectionsAction } from './CollectionListView';
import CollectionView from './CollectionView';

const mockStore = configureStore<CollectionState & RouterState & LinksState>();
let collection;
function render(videos: Video[]) {
  collection = {
    id: 'default',
    title: '',
    updatedAt: '',
    videos,
    links: {
      addVideo: new Link({ href: '' }),
      removeVideo: new Link({ href: '' }),
      self: new Link({ href: '' }),
    },
  };
  const store = mockStore({
    collections: {
      loading: true,
      updating: false,
      items: [collection],
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
    links: LinksFactory.sample(),
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

test('dispatches RENAME_COLLECTION when title edited', () => {
  const { store, wrapper } = render([VideoFactory.sample()]);
  const collectionTitle = new CollectionTitleHelper(wrapper);

  collectionTitle.clickEdit();
  collectionTitle.typeText('doggy');
  collectionTitle.submit();

  expect(store.getActions()).toContainEqual(
    renameCollectionAction({ title: 'doggy', originalCollection: collection }),
  );
});

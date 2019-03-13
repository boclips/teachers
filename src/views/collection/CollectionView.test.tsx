import { ConnectedRouter, RouterActionType } from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ApiStub from '../../../test-support/ApiStub';
import { By } from '../../../test-support/By';
import eventually from '../../../test-support/eventually';
import {
  LinksFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../test-support/factories';
import {
  userCollectionsResponse,
  video177Slim,
} from '../../../test-support/video-service-responses';
import { CollectionTitleHelper } from '../../components/collection/CollectionTitle.test';
import { fetchVideosForCollectionAction } from '../../components/collection/redux/actions/fetchVideosForCollectionAction';
import { renameCollectionAction } from '../../components/collection/redux/actions/renameCollectionAction';
import { Link } from '../../types/Link';
import { CollectionState, LinksState, RouterState } from '../../types/State';
import { VideoId } from '../../types/Video';
import { VideoCollection, VideoMap } from '../../types/VideoCollection';
import CollectionView from './CollectionView';

const mockStore = configureStore<CollectionState & RouterState & LinksState>();
let collection: VideoCollection;

const renderCollectionView = (collectionsToRender: VideoCollection[]) => {
  const store = mockStore({
    collections: {
      loading: true,
      updating: false,
      items: collectionsToRender,
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
};

function render(videos: VideoMap, videoIds: VideoId[]) {
  collection = {
    id: 'default',
    title: '',
    updatedAt: '',
    videos,
    videoIds,
    links: {
      addVideo: new Link({ href: '' }),
      removeVideo: new Link({ href: '' }),
      edit: new Link({ href: '' }),
      remove: new Link({ href: '' }),
      self: new Link({ href: '' }),
    },
  };

  return renderCollectionView([collection]);
}

test('fetch all videos when collection is not loaded', () => {
  const { store } = renderCollectionView([]);

  new ApiStub().fetchCollections(userCollectionsResponse([video177Slim]));

  eventually(() => {
    expect(store.getActions()).toContainEqual(
      fetchVideosForCollectionAction({
        collection,
        videos: [
          {
            id: video177Slim.id,
            links: {
              self: new Link({
                href: video177Slim._links.self.href,
                templated: false,
              }),
            },
          },
        ],
      }),
    );
  });
});

test('fetch only necessary videos', () => {
  const someVideos = [
    VideoFactory.sample({ id: '1' }),
    VideoFactory.sample({ id: '2' }),
    VideoFactory.sample({ id: '3' }),
  ];

  const videoAlreadyLoaded = someVideos[0];

  const { store } = render(
    { [videoAlreadyLoaded.id]: videoAlreadyLoaded },
    someVideos.map(v => ({ id: v.id, links: v.links })),
  );

  someVideos.splice(0, 1);

  expect(store.getActions()).toContainEqual(
    fetchVideosForCollectionAction({
      collection,
      videos: someVideos.map((v): VideoId => ({ id: v.id, links: v.links })),
    }),
  );
});

test('displays an empty state when the collection is empty', () => {
  const { wrapper } = render({}, []);

  expect(wrapper.find(By.dataQa('collection-empty-title'))).toHaveText(
    'This video collection is empty',
  );
});

test('dispatches RENAME_COLLECTION when title edited', () => {
  const video = VideoFactory.sample();
  const { store, wrapper } = render(
    VideoCollectionFactory.sampleVideos([video]),
    [{ id: video.id, links: video.links }],
  );
  const collectionTitle = new CollectionTitleHelper(wrapper);

  collectionTitle.clickEdit();
  collectionTitle.typeText('doggy');
  collectionTitle.submit();

  expect(store.getActions()).toContainEqual(
    renameCollectionAction({ title: 'doggy', originalCollection: collection }),
  );
});

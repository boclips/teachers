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
import { fetchVideosForCollectionAction } from '../../components/collection/redux/actions/fetchVideosForCollectionAction';
import { Link } from '../../types/Link';
import { CollectionState, LinksState, RouterState } from '../../types/State';
import { VideoId } from '../../types/Video';
import { VideoCollection, VideoMap } from '../../types/VideoCollection';
import CollectionView from './CollectionView';

const mockStore = configureStore<CollectionState & RouterState & LinksState>();
let collection: VideoCollection;

test('fetch all videos when collection is not loaded', async () => {
  const { store } = renderEditableCollection({}, [
    {
      id: video177Slim.id,
      links: {
        self: new Link({
          href: video177Slim._links.self.href,
          templated: false,
        }),
      },
    },
  ]);

  new ApiStub().fetchCollections(userCollectionsResponse([video177Slim]));

  await eventually(() => {
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

  const { store } = renderEditableCollection(
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
  const { wrapper } = renderEditableCollection({}, []);

  expect(wrapper.find(By.dataQa('collection-empty-title'))).toHaveText(
    'This video collection is empty',
  );
});

describe('when editable collection', () => {
  test('renders edit collection button', () => {
    const video = VideoFactory.sample();
    const { wrapper } = renderEditableCollection(
      VideoCollectionFactory.sampleVideos([video]),
      [{ id: video.id, links: video.links }],
    );

    expect(wrapper.find(By.dataQa('collection-edit-button'))).toExist();
  });
});

describe('when collection cannot be edited', () => {
  test('does not render edit collection button', () => {
    const video = VideoFactory.sample();
    const { wrapper } = renderNonEditableCollection(
      VideoCollectionFactory.sampleVideos([video]),
      [{ id: video.id, links: video.links }],
    );
    expect(wrapper.find(By.dataQa('collection-edit-button'))).not.toExist();
  });
});

function renderNonEditableCollection(videos: VideoMap, videoIds: VideoId[]) {
  return render(videos, videoIds, false);
}

function renderEditableCollection(videos: VideoMap, videoIds: VideoId[]) {
  return render(videos, videoIds, true);
}

function render(videos: VideoMap, videoIds: VideoId[], editable: boolean) {
  collection = {
    id: 'default',
    title: '',
    updatedAt: '',
    videos,
    videoIds,
    links: {
      addVideo: new Link({ href: '' }),
      removeVideo: new Link({ href: '' }),
      edit: editable ? new Link({ href: '' }) : undefined,
      remove: new Link({ href: '' }),
      self: new Link({ href: '' }),
    },
    isPublic: false,
  };

  return renderCollectionView([collection]);
}

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

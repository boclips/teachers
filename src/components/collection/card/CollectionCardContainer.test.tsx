import { within } from '@testing-library/dom';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { video177 } from '../../../../test-support/api-responses';
import ApiStub from '../../../../test-support/ApiStub';
import {
  CollectionsFactory,
  EntitiesFactory,
  MockStoreFactory,
  PageableCollectionsFactory,
  RouterFactory,
  VideoCollectionFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../../test-support/factories';
import MockFetchVerify from '../../../../test-support/MockFetchVerify';
import { renderWithStore } from '../../../../test-support/renderWithStore';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { organizeById } from '../../../utils/entityMap';
import { fetchVideosByIdsAction } from '../../video/redux/actions/fetchVideosByIdsAction';
import { videoHandlers } from '../../video/redux/reducers/videoReducer';
import fetchVideosForCollectionMiddleware from '../redux/middleware/fetchVideosForCollectionMiddleware';
import CollectionCardContainer from './CollectionCardContainer';

describe('need to fetch videos scenarios', () => {
  test('fetches videos when no videos are loaded', () => {
    const video = VideoFactory.sample({ id: '123' });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          value: video.id,
          links: video.links,
        },
      ],
    });

    const store = createMockStore(collection, []);

    new ApiStub().fetchVideo({ video });

    mount(
      <Provider store={store}>
        <Router>
          <CollectionCardContainer collection={collection} />
        </Router>
      </Provider>,
    );

    expect(store.getActions()).toContainEqual(
      fetchVideosByIdsAction({
        videos: [
          {
            value: video.id,
            links: video.links,
          },
        ],
      }),
    );
  });

  test('fetches at most the 4 videos when no videos are loaded', () => {
    const videos = [
      VideoFactory.sample({ id: '1' }),
      VideoFactory.sample({ id: '2' }),
      VideoFactory.sample({ id: '3' }),
      VideoFactory.sample({ id: '4' }),
      VideoFactory.sample({ id: '5' }),
      VideoFactory.sample({ id: '6' }),
    ];

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: videos.map(v => ({ value: v.id, links: v.links })),
    });

    const store = createMockStore(collection, []);

    new ApiStub()
      .fetchVideo({ video: videos[0] })
      .fetchVideo({ video: videos[1] })
      .fetchVideo({ video: videos[2] })
      .fetchVideo({ video: videos[3] })
      .fetchVideo({ video: videos[4] })
      .fetchVideo({ video: videos[5] });

    mount(
      <Provider store={store}>
        <Router>
          <CollectionCardContainer collection={collection} />
        </Router>
      </Provider>,
    );
    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()[0].payload.videos).toHaveLength(4);
  });
});

describe('does not fetch videos scenarios', () => {
  test('does not fetch videos when all videos in a collection are loaded', () => {
    const video = VideoFactory.sample({ id: '123' });

    const collection = VideoCollectionFactory.sample({
      videoIds: [VideoIdFactory.sample({ value: video.id })],
    });

    const store = createMockStore(collection, [video]);

    mount(
      <Provider store={store}>
        <Router>
          <CollectionCardContainer collection={collection} />
        </Router>
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(0);
  });

  test('does not fetch videos when 4 videos in a collection are already loaded', () => {
    const videos = [
      VideoFactory.sample({ id: '1' }),
      VideoFactory.sample({ id: '2' }),
      VideoFactory.sample({ id: '3' }),
      VideoFactory.sample({ id: '4' }),
    ];

    const collection = VideoCollectionFactory.sample({
      videoIds: videos.map(it => VideoIdFactory.sample({ value: it.id })),
    });

    collection.videoIds.push({
      value: '5',
      links: videos[1].links,
    });

    const store = createMockStore(collection, videos);

    mount(
      <Provider store={store}>
        <Router>
          <CollectionCardContainer collection={collection} />
        </Router>
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(0);
  });
});

describe('showing correct video previews', () => {
  it('displays the correct count when there are more videos than preview slots', async () => {
    const collection = VideoCollectionFactory.sample({
      videoIds: generateVideoIds(6),
    });

    const initialState = {
      router: RouterFactory.sample(),
      entities: {
        collections: { byId: { [collection.id]: collection } },
        videos: { byId: { '1234': VideoFactory.sample() } },
      },
      collections: CollectionsFactory.sample(),
    };

    MockFetchVerify.get(
      `v1/videos/123`,
      JSON.stringify({ ...video177, id: '123' }),
    );

    const { getByText, getByTestId } = await renderWithStore(
      <CollectionCardContainer collection={collection} />,
      {
        initialState,
        reducers: videoHandlers,
        middlewares: [fetchVideosForCollectionMiddleware],
      },
    );

    expect(getByText('+')).toBeInTheDocument();
    expect(
      within(getByTestId('collection-video-preview-counter')).getByText('3'),
    ).toBeInTheDocument();
  });
});

const createMockStore = (collection: VideoCollection, videos: Video[]) => {
  return MockStoreFactory.sample({
    entities: EntitiesFactory.sample({
      collections: { byId: { [collection.id]: collection } },
      videos: { byId: organizeById(videos) },
    }),
    collections: {
      myCollections: PageableCollectionsFactory.sample({
        items: [collection.id],
      }),
      discoverCollections: undefined,
      publicCollections: undefined,
      bookmarkedCollections: undefined,
      loading: false,
      updating: false,
    },
  });
};

const generateVideoIds = (numberOfIds: number) => {
  const arr = [];
  for (let i = 0; i < numberOfIds; i++) {
    arr.push(VideoIdFactory.sample());
  }

  return arr;
};

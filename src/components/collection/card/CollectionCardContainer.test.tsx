import { within } from '@testing-library/dom';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  fakeVideoSetup,
  fakeVideosSetup,
} from 'test-support/fakeApiClientSetup';
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
  VideoResourceFactory,
} from '../../../../test-support/factories';
import { renderWithStore } from '../../../../test-support/renderWithStore';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { organizeById } from '../../../utils/entityMap';
import { fetchVideosByIdsAction } from '../../video/redux/actions/fetchVideosByIdsAction';
import { videoHandlers } from '../../video/redux/reducers/videoReducer';
import fetchVideosForCollectionMiddleware from '../redux/middleware/fetchVideosForCollectionMiddleware';
import { Link } from '../../../types/Link';
import CollectionCardContainer from './CollectionCardContainer';

describe('need to fetch videos scenarios', () => {
  test('fetches videos when no videos are loaded', async () => {
    const video = VideoResourceFactory.sample({ id: '123' });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          value: video.id,
          links: {
            self: new Link(video._links.self),
          },
        },
      ],
    });

    const store = createMockStore(collection, []);

    new ApiStub();
    await fakeVideoSetup(video);

    mount(
      <Provider store={store}>
        <Router>
          <CollectionCardContainer grid={false} collection={collection} />
        </Router>
      </Provider>,
    );

    expect(store.getActions()).toContainEqual(
      fetchVideosByIdsAction({
        videos: [
          {
            value: video.id,
            links: {
              self: new Link(video._links.self),
            },
          },
        ],
      }),
    );
  });

  test('fetches at most the 4 videos when no videos are loaded', () => {
    const videoResources = [
      VideoResourceFactory.sample({ id: '1' }),
      VideoResourceFactory.sample({ id: '2' }),
      VideoResourceFactory.sample({ id: '3' }),
      VideoResourceFactory.sample({ id: '4' }),
      VideoResourceFactory.sample({ id: '5' }),
      VideoResourceFactory.sample({ id: '6' }),
    ];

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: videoResources.map((v) => ({
        value: v.id,
        links: { self: new Link(v._links.self) },
      })),
    });

    const store = createMockStore(collection, []);
    new ApiStub();
    fakeVideosSetup(videoResources);

    mount(
      <Provider store={store}>
        <Router>
          <CollectionCardContainer grid={false} collection={collection} />
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
          <CollectionCardContainer grid={false} collection={collection} />
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
      videoIds: videos.map((it) => VideoIdFactory.sample({ value: it.id })),
    });

    collection.videoIds.push({
      value: '5',
      links: videos[1].links,
    });

    const store = createMockStore(collection, videos);

    mount(
      <Provider store={store}>
        <Router>
          <CollectionCardContainer grid={false} collection={collection} />
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

    await fakeVideoSetup({ ...video177, id: '123' });

    const initialState = {
      router: RouterFactory.sample(),
      entities: {
        collections: { byId: { [collection.id]: collection } },
        videos: { byId: { '1234': VideoFactory.sample() } },
      },
      collections: CollectionsFactory.sample(),
    };

    const { getByText, getByTestId } = await renderWithStore(
      <CollectionCardContainer grid={false} collection={collection} />,
      {
        initialState,
        reducers: videoHandlers,
        middlewares: [fetchVideosForCollectionMiddleware],
      },
    );

    expect(getByText('+')).toBeInTheDocument();
    expect(
      within(getByTestId('video-counter-count')).getByText('3'),
    ).toBeInTheDocument();
  });
});

const createMockStore = (collection: VideoCollection, videos: Video[]) =>
  MockStoreFactory.sample({
    entities: EntitiesFactory.sample({
      collections: { byId: { [collection.id]: collection } },
      videos: { byId: organizeById(videos) },
    }),
    collections: {
      myCollections: PageableCollectionsFactory.sample({
        items: [collection.id],
      }),
      myResources: PageableCollectionsFactory.sample({
        items: [collection.id],
      }),
      discoverCollections: undefined,
      promotedCollections: undefined,
      publicCollections: undefined,
      loading: false,
      updating: false,
    },
  });

const generateVideoIds = (numberOfIds: number) => {
  const arr = [];
  for (let i = 0; i < numberOfIds; i++) {
    arr.push(VideoIdFactory.sample());
  }

  return arr;
};

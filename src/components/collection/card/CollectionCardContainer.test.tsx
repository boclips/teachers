import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ApiStub from '../../../../test-support/ApiStub';
import {
  EntitiesFactory,
  MockStoreFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../../test-support/factories';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { organizeById } from '../../../utils/entityMap';
import { fetchVideosByIdsAction } from '../../video/redux/actions/fetchVideosByIdsAction';
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
  test('does not fetch vidoes when all videos in a collection are loaded', () => {
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

  test('does not fetch vidoes when 4 videos in a collection are already loaded', () => {
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

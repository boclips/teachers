import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ApiStub from '../../../test-support/ApiStub';
import {
  LinksFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../test-support/factories';
import { CollectionState, LinksState } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import CollectionCardContainer from './CollectionCardContainer';
import { fetchVideosForCollectionAction } from './redux/actions/fetchVideosForCollectionAction';

describe('need to fetch videos scenarios', () => {
  test('fetches videos when no videos are loaded', () => {
    const video = VideoFactory.sample({ id: '123' });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const store = createMockStore(collection);

    new ApiStub().fetchVideo({ video });

    mount(
      <Provider store={store}>
        <Router>
          <CollectionCardContainer collection={collection} />
        </Router>
      </Provider>,
    );

    expect(store.getActions()).toContainEqual(
      fetchVideosForCollectionAction({
        videos: [
          {
            id: video.id,
            links: video.links,
          },
        ],
        collection,
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
      videoIds: videos.map(v => ({ id: v.id, links: v.links })),
    });

    const store = createMockStore(collection);

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
      videos: VideoCollectionFactory.sampleVideos([video]),
    });

    const store = createMockStore(collection);

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
      videos: VideoCollectionFactory.sampleVideos(videos),
    });

    collection.videoIds.push({
      id: '5',
      links: videos[1].links,
    });

    const store = createMockStore(collection);

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

const createMockStore = (collection: VideoCollection) => {
  const mockStore = configureStore<CollectionState & LinksState>();
  return mockStore({
    collections: {
      items: [collection],
      loading: false,
      updating: false,
    },
    links: LinksFactory.sample(),
  });
};

import ApiStub from '../../../../../test-support/ApiStub';
import {
  CollectionsFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { CollectionsStateValue } from '../../../../types/State';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storeVideosForCollectionAction } from '../actions/storeVideosForCollectionAction';
import { collectionsReducer } from './collectionsReducer';

test('can store my collections', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    ...CollectionsFactory.sample({ myCollections: undefined }),
  };

  const action = storeCollectionsAction({
    collections: {
      items: [collectionToFetch],
      links: {},
    },
    key: 'myCollections',
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.myCollections.items).toEqual([collectionToFetch.id]);
  expect(stateAfter.collections).toEqual({
    [collectionToFetch.id]: collectionToFetch,
  });
});

test('can store a collection', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    ...CollectionsFactory.sample({ myCollections: undefined }),
  };

  const action = storeCollectionAction(collectionToFetch);

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.collectionIdBeingViewed).toEqual(collectionToFetch.id);
  expect(stateAfter.collections).toEqual({
    [collectionToFetch.id]: collectionToFetch,
  });
});

describe('fetch video for collection', () => {
  test('sets videos in user collections', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: CollectionsStateValue = {
      collections: { [collection.id]: collection },
      updating: false,
      loading: false,
      myCollections: PageableCollectionsFactory.sample({
        items: [collection.id],
      }),
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
      discoverCollections: undefined,
    };

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    const normalizedCollection = stateAfter.collections[collection.id];

    expect(Object.keys(normalizedCollection.videos)).toHaveLength(1);
    expect(normalizedCollection.videos[video.id].title).toEqual(video.title);
    expect(normalizedCollection.videos[video.id].id).toEqual(video.id);
    expect(normalizedCollection.videoIds).toHaveLength(1);
  });

  test('sets videos in collection details', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: CollectionsStateValue = {
      collections: { [collection.id]: collection },
      updating: false,
      loading: false,
      collectionIdBeingViewed: collection.id,
      discoverCollections: undefined,
      myCollections: undefined,
      publicCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    const storedCollection =
      stateAfter.collections[stateAfter.collectionIdBeingViewed];

    expect(Object.keys(storedCollection.videos)).toHaveLength(1);
    expect(storedCollection.videos[video.id].title).toEqual(video.title);
    expect(storedCollection.videos[video.id].id).toEqual(video.id);
    expect(storedCollection.videoIds).toHaveLength(1);
  });

  test('sets videos in public collections', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: CollectionsStateValue = {
      collections: {},
      updating: false,
      loading: false,
      publicCollections: PageableCollectionsFactory.sample({
        items: [collection.id],
      }),
      discoverCollections: undefined,
      myCollections: undefined,
      bookmarkedCollections: undefined,
    };

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    const normalizedCollection = stateAfter.collections[collection.id];

    expect(Object.keys(normalizedCollection.videos)).toHaveLength(1);
    expect(normalizedCollection.videos[video.id].title).toEqual(video.title);
    expect(normalizedCollection.videos[video.id].id).toEqual(video.id);
    expect(normalizedCollection.videoIds).toHaveLength(1);
  });

  test('sets videos in bookmarked collections', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: CollectionsStateValue = {
      collections: {},
      updating: false,
      loading: false,
      publicCollections: undefined,
      discoverCollections: undefined,
      myCollections: undefined,
      bookmarkedCollections: PageableCollectionsFactory.sample({
        items: [collection.id],
      }),
    };

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    const normalizedCollection = stateAfter.collections[collection.id];

    expect(Object.keys(normalizedCollection.videos)).toHaveLength(1);
    expect(normalizedCollection.videos[video.id].title).toEqual(video.title);
    expect(normalizedCollection.videos[video.id].id).toEqual(video.id);
    expect(normalizedCollection.videoIds).toHaveLength(1);
  });

  test('sets videos in discover collections', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: CollectionsStateValue = {
      collections: {},
      updating: false,
      loading: false,
      publicCollections: undefined,
      discoverCollections: PageableCollectionsFactory.sample({
        items: [collection.id],
      }),
      myCollections: undefined,
      bookmarkedCollections: undefined,
    };

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    const normalizedCollection = stateAfter.collections[collection.id];

    expect(Object.keys(normalizedCollection.videos)).toHaveLength(1);
    expect(normalizedCollection.videos[video.id].title).toEqual(video.title);
    expect(normalizedCollection.videos[video.id].id).toEqual(video.id);
    expect(normalizedCollection.videoIds).toHaveLength(1);
  });
});

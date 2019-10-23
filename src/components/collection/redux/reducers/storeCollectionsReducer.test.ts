import ApiStub from '../../../../../test-support/ApiStub';
import {
  CollectionsFactory,
  MockStoreFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import State from '../../../../types/State';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storeVideosForCollectionAction } from '../actions/storeVideosForCollectionAction';
import { collectionHandlers } from './collectionsReducer';

const testReducer = createReducer(...collectionHandlers);

test('can store my collections', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const collections = CollectionsFactory.sample({ myCollections: undefined });

  const stateBefore: State = MockStoreFactory.sampleState({
    entities: { collections: { byId: {} } },
    collections,
  });

  const action = storeCollectionsAction({
    collections: {
      items: [collectionToFetch],
      links: {},
    },
    key: 'myCollections',
  });

  const stateAfter = testReducer(stateBefore, action);

  expect(stateAfter.collections.myCollections.items).toEqual([
    collectionToFetch.id,
  ]);
  expect(stateAfter.entities.collections.byId).toEqual({
    [collectionToFetch.id]: collectionToFetch,
  });
});

test('can store a collection', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const collections = CollectionsFactory.sample({ myCollections: undefined });

  const stateBefore: State = MockStoreFactory.sampleState({
    entities: { collections: { byId: {} } },
    collections,
  });

  const action = storeCollectionAction(collectionToFetch);

  const stateAfter = testReducer(stateBefore, action);

  expect(stateAfter.collections.collectionIdBeingViewed).toEqual(
    collectionToFetch.id,
  );
  expect(stateAfter.entities.collections.byId).toEqual({
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

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: { collections: { byId: { [collection.id]: collection } } },
      collections: {
        updating: false,
        loading: false,
        myCollections: PageableCollectionsFactory.sample({
          items: [collection.id],
        }),
        publicCollections: PageableCollectionsFactory.sample(),
        bookmarkedCollections: undefined,
        discoverCollections: undefined,
      },
    });

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = testReducer(stateBefore, action);

    const normalizedCollection =
      stateAfter.entities.collections.byId[collection.id];

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

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: { collections: { byId: { [collection.id]: collection } } },
      collections: {
        updating: false,
        loading: false,
        collectionIdBeingViewed: collection.id,
        discoverCollections: undefined,
        myCollections: undefined,
        publicCollections: PageableCollectionsFactory.sample(),
        bookmarkedCollections: undefined,
      },
    });

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = testReducer(stateBefore, action);

    const storedCollection =
      stateAfter.entities.collections.byId[
        stateAfter.collections.collectionIdBeingViewed
      ];

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

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: { collections: { byId: {} } },
      collections: {
        updating: false,
        loading: false,
        publicCollections: PageableCollectionsFactory.sample({
          items: [collection.id],
        }),
        discoverCollections: undefined,
        myCollections: undefined,
        bookmarkedCollections: undefined,
      },
    });

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = testReducer(stateBefore, action);

    const normalizedCollection =
      stateAfter.entities.collections.byId[collection.id];

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

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: { collections: { byId: {} } },
      collections: {
        updating: false,
        loading: false,
        publicCollections: undefined,
        discoverCollections: undefined,
        myCollections: undefined,
        bookmarkedCollections: PageableCollectionsFactory.sample({
          items: [collection.id],
        }),
      },
    });

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = testReducer(stateBefore, action);

    const normalizedCollection =
      stateAfter.entities.collections.byId[collection.id];

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

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: { collections: { byId: {} } },
      collections: {
        updating: false,
        loading: false,
        publicCollections: undefined,
        discoverCollections: PageableCollectionsFactory.sample({
          items: [collection.id],
        }),
        myCollections: undefined,
        bookmarkedCollections: undefined,
      },
    });

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = testReducer(stateBefore, action);

    const normalizedCollection =
      stateAfter.entities.collections.byId[collection.id];

    expect(Object.keys(normalizedCollection.videos)).toHaveLength(1);
    expect(normalizedCollection.videos[video.id].title).toEqual(video.title);
    expect(normalizedCollection.videos[video.id].id).toEqual(video.id);
    expect(normalizedCollection.videoIds).toHaveLength(1);
  });
});

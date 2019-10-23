import {
  PageableCollectionsFactory,
  VideoCollectionFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import State from '../../../../types/State';
import { addVideoToMyCollectionAction } from '../actions/addToMyCollectionAction';
import { onMyCollectionEditedAction } from '../actions/onMyCollectionEditedAction';
import { onMyCollectionRemovedAction } from '../actions/onMyCollectionRemovedAction';
import { removeVideoFromMyCollectionAction } from '../actions/removeFromMyCollectionAction';
import {
  EntitiesFactory,
  MockStoreFactory,
} from './../../../../../test-support/factories';
import { collectionHandlers } from './collectionsReducer';

const testReducer = createReducer(...collectionHandlers);

describe('adding video to collection', () => {
  test('adding a video to a collection reduces user collections', () => {
    const targetCollection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [VideoIdFactory.sample({ value: '123' })],
    });
    const otherCollection = VideoCollectionFactory.sample({
      id: 'irrelevant',
      videoIds: [VideoIdFactory.sample({ value: '333' })],
    });
    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: {
          byId: {
            [otherCollection.id]: otherCollection,
            [targetCollection.id]: targetCollection,
          },
        },
      }),
      collections: {
        updating: false,
        loading: false,
        myCollections: PageableCollectionsFactory.sample({
          items: [otherCollection.id, targetCollection.id],
        }),
        publicCollections: PageableCollectionsFactory.sample(),
        discoverCollections: PageableCollectionsFactory.sample(),
        bookmarkedCollections: undefined,
      },
    });

    const newVideo = VideoFactory.sample({ id: '124' });
    const action = addVideoToMyCollectionAction({
      video: newVideo,
      collection: targetCollection,
    });

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.collections.updating).toEqual(true);
    expect(stateAfter.collections.myCollections.items[0]).toEqual(
      otherCollection.id,
    );
    expect(stateAfter.collections.myCollections.items[1]).toEqual(
      targetCollection.id,
    );

    const updatedCollection =
      stateAfter.entities.collections.byId[targetCollection.id];

    expect(updatedCollection.videoIds).toHaveLength(2);
    expect(updatedCollection.videoIds.map(id => id.value)).toContain('124');
  });

  test('remove a collection', () => {
    const collection = VideoCollectionFactory.sample();

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: { byId: { [collection.id]: collection } },
      }),
      collections: {
        updating: false,
        loading: false,
        myCollections: PageableCollectionsFactory.sample({
          items: [collection.id],
        }),
        publicCollections: PageableCollectionsFactory.sample(),
        discoverCollections: PageableCollectionsFactory.sample(),
        bookmarkedCollections: undefined,
      },
    });

    const action = onMyCollectionRemovedAction(collection);

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.collections.myCollections.items).toHaveLength(0);
    expect(
      stateAfter.entities.collections.byId[collection.id],
    ).not.toBeUndefined();
  });

  test('editing a collection', () => {
    const collection = VideoCollectionFactory.sample();

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: { byId: { [collection.id]: collection } },
      }),
      collections: {
        updating: false,
        loading: false,
        myCollections: PageableCollectionsFactory.sample({
          items: [collection.id],
        }),
        publicCollections: PageableCollectionsFactory.sample(),
        discoverCollections: PageableCollectionsFactory.sample(),
        bookmarkedCollections: undefined,
      },
    });

    const editedCollection = { ...collection, title: 'changed' };

    const action = onMyCollectionEditedAction(editedCollection);

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.collections.myCollections.items.length).toEqual(1);
    expect(stateAfter.entities.collections.byId[collection.id].title).toEqual(
      'changed',
    );
    expect(stateAfter.collections.updating).toBeFalse();
  });

  test('adding a duplicate video to a collection does not re-add it', () => {
    const video = VideoFactory.sample({ id: '123' });
    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [VideoIdFactory.sample({ value: video.id })],
    });
    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: { byId: { [collection.id]: collection } },
        videos: { byId: { [video.id]: video } },
      }),
      collections: {
        updating: false,
        loading: false,
        myCollections: PageableCollectionsFactory.sample({
          items: [collection.id],
        }),
        publicCollections: PageableCollectionsFactory.sample(),
        discoverCollections: PageableCollectionsFactory.sample(),
        bookmarkedCollections: undefined,
      },
    });

    const action = addVideoToMyCollectionAction({
      video,
      collection,
    });

    const stateAfter = testReducer(stateBefore, action);

    const updatedCollection =
      stateAfter.entities.collections.byId[collection.id];

    expect(stateAfter.collections.updating).toEqual(false);
    expect(updatedCollection.videoIds).toHaveLength(1);
  });

  test('adding a new video that we already know about in the video ids list only updates the video map', () => {
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

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: { byId: { [collection.id]: collection } },
      }),
      collections: {
        updating: false,
        loading: false,
        myCollections: PageableCollectionsFactory.sample({
          items: [collection.id],
        }),
        publicCollections: PageableCollectionsFactory.sample(),
        discoverCollections: PageableCollectionsFactory.sample(),
        bookmarkedCollections: undefined,
      },
    });

    const action = addVideoToMyCollectionAction({
      video,
      collection,
    });

    const stateAfter = testReducer(stateBefore, action);

    const updatedCollection =
      stateAfter.entities.collections.byId[collection.id];

    expect(stateAfter.collections.updating).toEqual(true);
    expect(updatedCollection.videoIds).toHaveLength(1);
  });
});

describe('removing videos from a collection', () => {
  test('removing a video from a collection', () => {
    const firstVideo = VideoFactory.sample({ id: '123' });
    const secondVideo = VideoFactory.sample({ id: '124' });
    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [firstVideo, secondVideo].map(it =>
        VideoIdFactory.sample({ value: it.id }),
      ),
    });

    const stateBefore: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: { byId: { [collection.id]: collection } },
      }),
      collections: {
        updating: false,
        loading: false,
        myCollections: PageableCollectionsFactory.sample({
          items: [collection.id],
        }),
        publicCollections: PageableCollectionsFactory.sample(),
        discoverCollections: PageableCollectionsFactory.sample(),
        bookmarkedCollections: undefined,
      },
    });

    const videoToRemove = firstVideo;
    const action = removeVideoFromMyCollectionAction({
      video: videoToRemove,
      collection,
    });

    const stateAfter = testReducer(stateBefore, action);

    const updatedCollection =
      stateAfter.entities.collections.byId[collection.id];

    expect(stateAfter.collections.updating).toEqual(true);
    expect(Object.keys(updatedCollection.videoIds)).toHaveLength(1);
    expect(updatedCollection.videoIds).toHaveLength(1);
    expect(updatedCollection.videoIds[0].value).toEqual('124');
  });
});

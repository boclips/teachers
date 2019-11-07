import {
  CollectionsFactory,
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
import { CollectionMap, VideoMap } from './../../../../types/State';
import { collectionHandlers } from './collectionsReducer';

const testReducer = createReducer(...collectionHandlers);

const createInitialState = (options: {
  collectionsById: CollectionMap;
  items: string[];
  updating?: boolean;
  videosById?: VideoMap;
}) =>
  MockStoreFactory.sampleState({
    entities: EntitiesFactory.sample({
      collections: { byId: options.collectionsById },
      videos: { byId: options.videosById || {} },
    }),
    collections: CollectionsFactory.sample({
      updating: options.updating || false,
      loading: false,
      myCollections: PageableCollectionsFactory.sample({
        items: options.items,
      }),
    }),
  });

describe('manipulating my collections', () => {
  test('can remove from my collection', () => {
    const collection = VideoCollectionFactory.sample();
    const otherCollection = VideoCollectionFactory.sample({
      id: 'untouched-id',
    });

    const stateBefore: State = createInitialState({
      collectionsById: {
        [collection.id]: collection,
        [otherCollection.id]: otherCollection,
      },
      items: [collection.id, otherCollection.id],
    });

    const action = onMyCollectionRemovedAction(collection);

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.collections.myCollections.items).toHaveLength(1);
    expect(stateAfter.collections.myCollections.items).toContainEqual(
      otherCollection.id,
    );
    expect(
      stateAfter.entities.collections.byId[collection.id],
    ).not.toBeUndefined();
  });

  test('can edit a collection', () => {
    const collection = VideoCollectionFactory.sample();

    const stateBefore: State = createInitialState({
      collectionsById: { [collection.id]: collection },
      items: [collection.id],
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
});

describe('adding video to collection', () => {
  test('can add a video to a collection', () => {
    const targetCollection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [VideoIdFactory.sample({ value: '123' })],
    });
    const otherCollection = VideoCollectionFactory.sample({
      id: 'irrelevant',
      videoIds: [VideoIdFactory.sample({ value: '333' })],
    });
    const stateBefore: State = createInitialState({
      collectionsById: {
        [otherCollection.id]: otherCollection,
        [targetCollection.id]: targetCollection,
      },
      items: [otherCollection.id, targetCollection.id],
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

  test('adding a duplicate video to a collection does not re-add it', () => {
    const video = VideoFactory.sample({ id: '123' });
    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [VideoIdFactory.sample({ value: video.id })],
    });
    const stateBefore: State = createInitialState({
      collectionsById: { [collection.id]: collection },
      videosById: { [video.id]: video },
      items: [collection.id],
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
    const stateBefore: State = createInitialState({
      collectionsById: { [collection.id]: collection },
      items: [collection.id],
    });

    const action = removeVideoFromMyCollectionAction({
      video: firstVideo,
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

import {
  PageableCollectionsFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { CollectionsStateValue } from '../../../../types/State';
import { addVideoToMyCollectionAction } from '../actions/addToMyCollectionAction';
import { onMyCollectionEditedAction } from '../actions/onMyCollectionEditedAction';
import { onMyCollectionRemovedAction } from '../actions/onMyCollectionRemovedAction';
import { removeVideoFromMyCollectionAction } from '../actions/removeFromMyCollectionAction';
import { collectionsReducer } from './collectionsReducer';

describe('adding video to collection', () => {
  test('adding a video to a collection reduces user collections', () => {
    const targetCollection = VideoCollectionFactory.sample({
      id: 'target',
      videos: VideoCollectionFactory.sampleVideos([
        VideoFactory.sample({ id: '123' }),
      ]),
    });
    const otherCollection = VideoCollectionFactory.sample({
      id: 'irrelevant',
      videos: VideoCollectionFactory.sampleVideos([
        VideoFactory.sample({ id: '333' }),
      ]),
    });
    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: PageableCollectionsFactory.sample({
        items: [otherCollection, targetCollection],
      }),
      publicCollections: PageableCollectionsFactory.sample(),
      discoverCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const newVideo = VideoFactory.sample({ id: '124' });
    const action = addVideoToMyCollectionAction({
      video: newVideo,
      collection: targetCollection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(stateAfter.myCollections.items[0]).toEqual(otherCollection);
    expect(stateAfter.myCollections.items[1]).not.toEqual(targetCollection);
    expect(Object.keys(stateAfter.myCollections.items[1].videos)).toHaveLength(
      2,
    );
    expect(stateAfter.myCollections.items[1].videos['124']).toEqual(newVideo);
    expect(stateAfter.myCollections.items[1].videoIds).toHaveLength(2);
    expect(
      stateAfter.myCollections.items[1].videoIds.map(id => id.id),
    ).toContain('124');
  });

  test('remove a collection', () => {
    const collection = VideoCollectionFactory.sample();

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: PageableCollectionsFactory.sample({
        items: [collection],
      }),
      publicCollections: PageableCollectionsFactory.sample(),
      discoverCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = onMyCollectionRemovedAction(collection);

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.myCollections.items).toHaveLength(0);
  });

  test('editing a collection', () => {
    const collection = VideoCollectionFactory.sample();

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: PageableCollectionsFactory.sample({
        items: [collection],
      }),
      publicCollections: PageableCollectionsFactory.sample(),
      discoverCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const editedCollection = { ...collection, title: 'changed' };

    const action = onMyCollectionEditedAction(editedCollection);

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.myCollections.items.length).toEqual(1);
    expect(stateAfter.myCollections.items[0].title).toEqual('changed');
  });
  test('adding a duplicate video to a collection does not re-add it', () => {
    const video = VideoFactory.sample({ id: '123' });
    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videos: VideoCollectionFactory.sampleVideos([video]),
    });
    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: PageableCollectionsFactory.sample({
        items: [collection],
      }),
      publicCollections: PageableCollectionsFactory.sample(),
      discoverCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = addVideoToMyCollectionAction({
      video,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(false);
    expect(Object.keys(stateAfter.myCollections.items[0].videos)).toHaveLength(
      1,
    );
    expect(stateAfter.myCollections.items[0].videoIds).toHaveLength(1);
  });

  test('adding a new video that we already know about in the video ids list only updates the video map', () => {
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

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: PageableCollectionsFactory.sample({
        items: [collection],
      }),
      publicCollections: PageableCollectionsFactory.sample(),
      discoverCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const action = addVideoToMyCollectionAction({
      video,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.myCollections.items[0].videos)).toHaveLength(
      1,
    );
    expect(stateAfter.myCollections.items[0].videoIds).toHaveLength(1);
  });
});

describe('removing videos from a colleciton', () => {
  test('removing a video from a collection', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videos: VideoCollectionFactory.sampleVideos([
        VideoFactory.sample({ id: '123' }),
        VideoFactory.sample({ id: '124' }),
      ]),
    });

    const stateBefore: CollectionsStateValue = {
      updating: false,
      loading: false,
      myCollections: PageableCollectionsFactory.sample({
        items: [collection],
      }),
      publicCollections: PageableCollectionsFactory.sample(),
      discoverCollections: PageableCollectionsFactory.sample(),
      bookmarkedCollections: undefined,
    };

    const videoToRemove = VideoFactory.sample({ id: '123' });
    const action = removeVideoFromMyCollectionAction({
      video: videoToRemove,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.myCollections.items[0].videos)).toHaveLength(
      1,
    );
    expect(stateAfter.myCollections.items[0].videos['124'].id).toEqual('124');
    expect(stateAfter.myCollections.items[0].videoIds).toHaveLength(1);
    expect(stateAfter.myCollections.items[0].videoIds[0].id).toEqual('124');
  });
});

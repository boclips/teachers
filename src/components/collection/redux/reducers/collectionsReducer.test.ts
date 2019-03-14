import ApiStub from '../../../../../test-support/ApiStub';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { CollectionsStateValue } from '../../../../types/State';
import { addToCollectionAction } from '../actions/addToCollectionAction';
import { onCollectionEditedAction } from '../actions/onCollectionEditedAction';
import { onCollectionRemovedAction } from '../actions/onCollectionRemovedAction';
import { removeFromCollectionAction } from '../actions/removeFromCollectionAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
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
      userCollections: [otherCollection, targetCollection],
      collectionDetails: targetCollection,
    };

    const newVideo = VideoFactory.sample({ id: '124' });
    const action = addToCollectionAction({
      video: newVideo,
      collection: targetCollection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(stateAfter.userCollections[0]).toEqual(otherCollection);
    expect(stateAfter.userCollections[1]).not.toEqual(targetCollection);
    expect(Object.keys(stateAfter.userCollections[1].videos)).toHaveLength(2);
    expect(stateAfter.userCollections[1].videos['124']).toEqual(newVideo);
    expect(stateAfter.userCollections[1].videoIds).toHaveLength(2);
    expect(stateAfter.userCollections[1].videoIds.map(id => id.id)).toContain(
      '124',
    );

    expect(stateAfter.collectionDetails).not.toEqual(targetCollection);
    expect(Object.keys(stateAfter.collectionDetails.videos)).toHaveLength(2);
    expect(stateAfter.collectionDetails.videos['124']).toEqual(newVideo);
    expect(stateAfter.collectionDetails.videoIds).toHaveLength(2);
    expect(stateAfter.collectionDetails.videoIds.map(id => id.id)).toContain(
      '124',
    );
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
      userCollections: [collection],
    };

    const action = addToCollectionAction({
      video,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(false);
    expect(Object.keys(stateAfter.userCollections[0].videos)).toHaveLength(1);
    expect(stateAfter.userCollections[0].videoIds).toHaveLength(1);
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
      userCollections: [collection],
    };

    const action = addToCollectionAction({
      video,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.userCollections[0].videos)).toHaveLength(1);
    expect(stateAfter.userCollections[0].videoIds).toHaveLength(1);
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
      userCollections: [collection],
      collectionDetails: collection,
    };

    const videoToRemove = VideoFactory.sample({ id: '123' });
    const action = removeFromCollectionAction({
      video: videoToRemove,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.userCollections[0].videos)).toHaveLength(1);
    expect(stateAfter.userCollections[0].videos['124'].id).toEqual('124');
    expect(stateAfter.userCollections[0].videoIds).toHaveLength(1);
    expect(stateAfter.userCollections[0].videoIds[0].id).toEqual('124');

    expect(Object.keys(stateAfter.collectionDetails.videos)).toHaveLength(1);
    expect(stateAfter.collectionDetails.videos['124'].id).toEqual('124');
    expect(stateAfter.collectionDetails.videoIds).toHaveLength(1);
    expect(stateAfter.collectionDetails.videoIds[0].id).toEqual('124');
  });
});

describe('fetch video for collection', () => {
  test('can fetch video for collection using ids', () => {
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
      updating: false,
      loading: false,
      userCollections: [collection],
    };

    const action = storeVideoForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.userCollections[0].videos)).toHaveLength(1);
    expect(stateAfter.userCollections[0].videos[video.id].title).toEqual(
      video.title,
    );
    expect(stateAfter.userCollections[0].videos[video.id].id).toEqual(video.id);
    expect(stateAfter.userCollections[0].videoIds).toHaveLength(1);
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
      updating: false,
      loading: false,
      collectionDetails: collection,
      userCollections: [],
    };

    const action = storeVideoForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(Object.keys(stateAfter.collectionDetails.videos)).toHaveLength(1);
    expect(stateAfter.collectionDetails.videos[video.id].title).toEqual(
      video.title,
    );
    expect(stateAfter.collectionDetails.videos[video.id].id).toEqual(video.id);
    expect(stateAfter.collectionDetails.videoIds).toHaveLength(1);
  });
});

test('remove a collection', () => {
  const collection = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    userCollections: [collection],
  };

  const action = onCollectionRemovedAction(collection);

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.userCollections).toHaveLength(0);
});

test('editing a collection', () => {
  const collection = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    userCollections: [collection],
    collectionDetails: collection,
  };

  const editedCollection = { ...collection, title: 'changed' };

  const action = onCollectionEditedAction(editedCollection);

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.userCollections.length).toEqual(1);
  expect(stateAfter.userCollections[0].title).toEqual('changed');
  expect(stateAfter.collectionDetails.title).toEqual('changed');
});

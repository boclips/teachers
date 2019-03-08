import ApiStub from '../../../../../test-support/ApiStub';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { CollectionsStateValue } from '../../../../types/State';
import { addToCollectionAction } from '../actions/addToCollectionAction';
import { onCollectionRemovedAction } from '../actions/onCollectionRemovedAction';
import { removeFromCollectionAction } from '../actions/removeFromCollectionAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { collectionsReducer } from './collectionsReducer';

describe('adding videso to collection', () => {
  test('adding a video to a collection', () => {
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
      items: [otherCollection, targetCollection],
    };

    const newVideo = VideoFactory.sample({ id: '124' });
    const action = addToCollectionAction({
      video: newVideo,
      collection: targetCollection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(stateAfter.items[0]).toEqual(otherCollection);
    expect(stateAfter.items[1]).not.toEqual(targetCollection);
    expect(Object.keys(stateAfter.items[1].videos)).toHaveLength(2);
    expect(stateAfter.items[1].videos['124']).toEqual(newVideo);
    expect(stateAfter.items[1].videoIds).toHaveLength(2);
    expect(stateAfter.items[1].videoIds.map(id => id.id)).toContain('124');
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
      items: [collection],
    };

    const action = addToCollectionAction({
      video,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(false);
    expect(Object.keys(stateAfter.items[0].videos)).toHaveLength(1);
    expect(stateAfter.items[0].videoIds).toHaveLength(1);
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
      items: [collection],
    };

    const action = addToCollectionAction({
      video,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.items[0].videos)).toHaveLength(1);
    expect(stateAfter.items[0].videoIds).toHaveLength(1);
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
      items: [collection],
    };

    const videoToRemove = VideoFactory.sample({ id: '123' });
    const action = removeFromCollectionAction({
      video: videoToRemove,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.items[0].videos)).toHaveLength(1);
    expect(stateAfter.items[0].videos['124'].id).toEqual('124');
    expect(stateAfter.items[0].videoIds).toHaveLength(1);
    expect(stateAfter.items[0].videoIds[0].id).toEqual('124');
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
      items: [collection],
    };

    const action = storeVideoForCollectionAction({
      video,
      collection,
    });

    const stateAfter = collectionsReducer(stateBefore, action);

    expect(stateAfter.updating).toEqual(true);
    expect(Object.keys(stateAfter.items[0].videos)).toHaveLength(1);
    expect(stateAfter.items[0].videos[video.id].title).toEqual(video.title);
    expect(stateAfter.items[0].videos[video.id].id).toEqual(video.id);
    expect(stateAfter.items[0].videoIds).toHaveLength(1);
  });
});

test('remove a collection', () => {
  const collection = VideoCollectionFactory.sample();

  const stateBefore: CollectionsStateValue = {
    updating: false,
    loading: false,
    items: [collection],
  };

  const action = onCollectionRemovedAction(collection);

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.items).toHaveLength(0);
});

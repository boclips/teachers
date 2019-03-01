import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { CollectionsStateValue } from '../../../../types/State';
import { addToCollectionAction } from '../actions/addToCollectionAction';
import { removeFromCollectionAction } from '../actions/removeFromCollectionAction';
import { collectionsReducer } from './collectionsReducer';

test('adding a video to a collection', () => {
  const targetCollection = VideoCollectionFactory.sample({
    id: 'target',
    videos: [VideoFactory.sample({ id: '123' })],
  });
  const otherCollection = VideoCollectionFactory.sample({
    id: 'irrelevant',
    videos: [VideoFactory.sample({ id: '333' })],
  });
  const stateBefore: CollectionsStateValue = {
    loading: false,
    items: [otherCollection, targetCollection],
  };

  const newVideo = VideoFactory.sample({ id: '124' });
  const action = addToCollectionAction({
    video: newVideo,
    collection: targetCollection,
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.items[0]).toEqual(otherCollection);
  expect(stateAfter.items[1]).not.toEqual(targetCollection);
  expect(stateAfter.items[1].videos).toHaveLength(2);
  expect(stateAfter.items[1].videos).toContain(newVideo);
});

test('adding a duplicate video to a collection does not re-add it', () => {
  const video = VideoFactory.sample({ id: '123' });
  const collection = VideoCollectionFactory.sample({
    id: 'target',
    videos: [video],
  });
  const stateBefore: CollectionsStateValue = {
    loading: false,
    items: [collection],
  };

  const action = addToCollectionAction({
    video,
    collection,
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.items[0].videos).toHaveLength(1);
});

test('removing a video from a collection', () => {
  const collection = VideoCollectionFactory.sample({
    id: 'target',
    videos: [
      VideoFactory.sample({ id: '123' }),
      VideoFactory.sample({ id: '124' }),
    ],
  });

  const stateBefore: CollectionsStateValue = {
    loading: false,
    items: [collection],
  };

  const videoToRemove = VideoFactory.sample({ id: '123' });
  const action = removeFromCollectionAction({
    video: videoToRemove,
    collection,
  });

  const stateAfter = collectionsReducer(stateBefore, action);

  expect(stateAfter.items[0].videos).toHaveLength(1);
  expect(stateAfter.items[0].videos[0].id).toEqual('124');
});

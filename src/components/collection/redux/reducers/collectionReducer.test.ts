import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { storeVideoInDefaultCollectionAction } from '../actions/storeVideoInDefaultCollectionAction';
import { unstoreVideoInDefaultCollectionAction } from '../actions/unstoreVideoInDefaultCollectionAction';
import { collectionReducer } from './collectionReducer';

test('adding a video to default collection', () => {
  const stateBefore = VideoCollectionFactory.sample({
    videos: [VideoFactory.sample({ id: '123' })],
  });

  const newVideo = VideoFactory.sample({ id: '124' });
  const action = storeVideoInDefaultCollectionAction(newVideo);

  const stateAfter = collectionReducer(stateBefore, action);

  expect(stateAfter.videos).toHaveLength(2);
  expect(stateAfter.videos).toContain(newVideo);
});

test('adding a duplicate video to default collection does not readd it', () => {
  const stateBefore = VideoCollectionFactory.sample({
    videos: [VideoFactory.sample({ id: '123' })],
  });

  const action = storeVideoInDefaultCollectionAction(
    VideoFactory.sample({ id: '123' }),
  );

  const stateAfter = collectionReducer(stateBefore, action);

  expect(stateAfter.videos).toHaveLength(1);
});

test('removing a video from a default collection', () => {
  const stateBefore = VideoCollectionFactory.sample({
    videos: [
      VideoFactory.sample({ id: '123' }),
      VideoFactory.sample({ id: '124' }),
    ],
  });

  const videoToRemove = VideoFactory.sample({ id: '123' });
  const action = unstoreVideoInDefaultCollectionAction(videoToRemove);

  const stateAfter = collectionReducer(stateBefore, action);

  expect(stateAfter.videos).toHaveLength(1);
  expect(stateAfter.videos[0].id).toEqual('124');
});

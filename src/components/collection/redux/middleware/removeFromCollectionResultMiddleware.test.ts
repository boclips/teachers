import configureStore from 'redux-mock-store';
import { VideoFactory } from '../../../../../test-support/factories';
import NotificationFactory from '../../../common/NotificationFactory';
import { storeVideoInDefaultCollectionAction } from '../actions/storeVideoInDefaultCollectionAction';
import { onRemoveFromCollectionResult } from './removeFromCollectionResultMiddleware';

jest.mock('antd');
jest.mock('../../../common/NotificationFactory');

const mockStore = configureStore<{}>();

test('shows successful notification when video is removed from collection successfully', () => {
  const store = mockStore({});

  onRemoveFromCollectionResult(store, {
    video: VideoFactory.sample({
      title: 'Two lost souls',
    }),
    success: true,
  });

  expect(NotificationFactory.success).toBeCalledWith({
    message: 'Two lost souls',
    description: 'Removed from collection.',
  });

  expect(NotificationFactory.error).not.toBeCalled();
});

test('shows error notification when vidaeo is not removed from collection successfully', () => {
  const store = mockStore({});

  onRemoveFromCollectionResult(store, {
    video: VideoFactory.sample({
      title: 'Swimming in a fish bowl, year after year',
    }),
    success: false,
  });

  expect(NotificationFactory.error).toBeCalledWith({
    message: 'Swimming in a fish bowl, year after year',
    description: 'Could not remove video from collection.',
  });

  expect(NotificationFactory.success).not.toBeCalled();
});

test('error when remoivng video from collection dispathces an action to add video back to store', () => {
  const store = mockStore({});
  const video = VideoFactory.sample({
    title: 'Swimming in a fish bowl, year after year',
  });

  onRemoveFromCollectionResult(store, {
    video,
    success: false,
  });

  expect(store.getActions().length).toBeGreaterThan(0);
  expect(store.getActions()[store.getActions().length - 1]).toEqual(
    storeVideoInDefaultCollectionAction(video),
  );
});

import configureStore from 'redux-mock-store';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { fetchCollectionsAction } from '../../../../views/collection/CollectionListView';
import NotificationFactory from '../../../common/NotificationFactory';
import { onRemoveFromCollectionResult } from './removeFromCollectionResultMiddleware';

jest.mock('antd');
jest.mock('../../../common/NotificationFactory');

const mockStore = configureStore<{}>();

test('shows successful notification when video is removed from collection successfully', () => {
  const store = mockStore({});

  onRemoveFromCollectionResult(store, {
    collection: VideoCollectionFactory.sample(),
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

test('when removing video from collection dispatches an action to fetch collections', () => {
  const store = mockStore({});
  const video = VideoFactory.sample({
    title: 'Swimming in a fish bowl, year after year',
  });

  onRemoveFromCollectionResult(store, {
    collection: VideoCollectionFactory.sample(),
    video,
    success: true,
  });

  expect(store.getActions().length).toBeGreaterThan(0);
  expect(store.getActions()[store.getActions().length - 1]).toEqual(
    fetchCollectionsAction(),
  );
});

test('shows error notification when video is not removed from collection successfully', () => {
  const store = mockStore({});

  onRemoveFromCollectionResult(store, {
    collection: VideoCollectionFactory.sample(),
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

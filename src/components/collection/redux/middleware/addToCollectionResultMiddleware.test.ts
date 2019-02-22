import configureStore from 'redux-mock-store';
import { fetchCollectionsAction } from '../../../../views/collection/CollectionListView';
import NotificationFactory from '../../../common/NotificationFactory';
import {
  VideoCollectionFactory,
  VideoFactory,
} from './../../../../../test-support/factories';
import {
  ERROR_DESCRIPTION,
  onAddToCollectionResult,
  SUCCESS_DESCRIPTION,
} from './addToCollectionResultMiddleware';
jest.mock('antd');
jest.mock('../../../common/NotificationFactory');

const mockStore = configureStore<{}>();
test('shows successful notification when video is added to collection succesfully', () => {
  const store = mockStore({});

  onAddToCollectionResult(store, {
    collection: VideoCollectionFactory.sample(),
    video: VideoFactory.sample({ title: 'the title' }),
    success: true,
  });

  expect(NotificationFactory.success).toBeCalledWith({
    message: 'the title',
    description: SUCCESS_DESCRIPTION,
  });
});

test('when successful dispatches an action to fetch collections', () => {
  const store = mockStore({});
  const video = VideoFactory.sample({
    title: 'Swimming in a fish bowl, year after year',
  });

  onAddToCollectionResult(store, {
    collection: VideoCollectionFactory.sample(),
    video,
    success: true,
  });

  expect(store.getActions().length).toBeGreaterThan(0);
  expect(store.getActions()[store.getActions().length - 1]).toEqual(
    fetchCollectionsAction(),
  );
});

test('shows an error notification when video is not added to collection succesfully', () => {
  const store = mockStore({});

  onAddToCollectionResult(store, {
    collection: VideoCollectionFactory.sample(),
    video: VideoFactory.sample({ title: 'the title' }),
    success: false,
  });

  expect(NotificationFactory.error).toBeCalledWith({
    message: 'the title',
    description: ERROR_DESCRIPTION,
  });

  expect(NotificationFactory.success).not.toBeCalled();
});

import configureStore from 'redux-mock-store';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import NotificationFactory from '../../../common/NotificationFactory';
import { onRemoveFromCollectionResult } from './removeFromCollectionResultMiddleware';

jest.mock('antd');
jest.mock('../../../common/NotificationFactory');

const mockStore = configureStore<{}>();

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

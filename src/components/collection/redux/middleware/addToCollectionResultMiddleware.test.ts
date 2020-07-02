import configureStore from 'redux-mock-store';
import NotificationFactory from '../../../common/NotificationFactory';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import {
  ERROR_DESCRIPTION,
  onAddToCollectionResult,
} from './addToCollectionResultMiddleware';

jest.mock('antd');
jest.mock('../../../common/NotificationFactory');

const mockStore = configureStore<{}>();

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

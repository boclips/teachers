import Mock = jest.Mock;

jest.mock('./fetchVideo');
import configureStore from 'redux-mock-store';
import eventually from '../../../test-support/eventually';
import { VideoFactory } from '../../../test-support/factories';
import fetchVideo from './fetchVideo';
import videoDetailsMiddleware, {
  storeVideoAction,
} from './videoDetailsMiddleware';
import { fetchVideoAction } from './VideoDetailsView';

const fetchVideoMock = fetchVideo as Mock;

const mockStore = configureStore<{}>([videoDetailsMiddleware]);

test('fetches and stores a video on FETCH_VIDEO', async () => {
  const video = VideoFactory.sample();

  const store = mockStore({});

  fetchVideoMock.mockReturnValue(Promise.resolve(video));

  store.dispatch(fetchVideoAction('123'));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(storeVideoAction(video));
  });
});

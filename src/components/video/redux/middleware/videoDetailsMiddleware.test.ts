import Mock = jest.Mock;

import configureStore from 'redux-mock-store';
import eventually from 'test-support/eventually';
import { VideoFactory } from 'test-support/factories';
import fetchVideo from 'src/services/videos/fetchVideo';
import { fetchVideoAction } from '../actions/fetchVideoAction';
import { storeVideoAction } from '../actions/storeVideoAction';
import videoDetailsMiddleware from './videoDetailsMiddleware';
jest.mock('../../../../services/videos/fetchVideo');

const fetchVideoMock = fetchVideo as Mock;

const mockStore = configureStore<{}>([videoDetailsMiddleware]);

test('fetches and stores a video on FETCH_VIDEO', async () => {
  const video = VideoFactory.sample();

  const store = mockStore({ links: { entries: [], loadingState: 'success' } });

  fetchVideoMock.mockReturnValue(Promise.resolve(video));

  store.dispatch(fetchVideoAction('123'));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(storeVideoAction(video));
  });
});

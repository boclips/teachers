import configureStore from 'redux-mock-store';
import eventually from '../../../../../test-support/eventually';
import { VideoFactory } from '../../../../../test-support/factories';
import { fetchVideoAction } from '../actions/fetchVideoAction';
import { storeVideoAction } from '../actions/storeVideoAction';
import { fetchVideo } from '../../../../services/videos/fetchVideo';
import videoDetailsMiddleware from './videoDetailsMiddleware';

import Mock = jest.Mock;

jest.mock('../../../../services/videos/fetchVideo');

const fetchVideoMock = fetchVideo as Mock;

const mockStore = configureStore<{}>([videoDetailsMiddleware]);

test('fetches and stores a video on FETCH_VIDEO', async () => {
  const video = VideoFactory.sample();

  const store = mockStore({ links: { entries: [], loadingState: 'success' } });

  fetchVideoMock.mockReturnValue(Promise.resolve(video));

  store.dispatch(fetchVideoAction('123'));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      storeVideoAction({ originalId: video.id, video }),
    );
  });
});

test(`can handle receiving no video on bad request`, async () => {
  const store = mockStore({ links: { entries: [], loadingState: 'success' } });
  fetchVideoMock.mockRejectedValue({
    response: { status: 404, message: 'not found' },
  });

  store.dispatch(fetchVideoAction('invalidId'));

  await eventually(() => {
    expect(store.getActions()[0]).toEqual(fetchVideoAction('invalidId'));
    expect(store.getActions()[1]).toEqual(storeVideoAction(null));
  });
});

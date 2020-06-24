import Mock = jest.Mock;
import configureStore from 'redux-mock-store';
import { fetchVideo } from 'src/services/videos/fetchVideo';
import { VideoFactory } from 'test-support/factories';
import eventually from '../../../../../test-support/eventually';
import { fetchVideosByIdsAction } from '../../../video/redux/actions/fetchVideosByIdsAction';
import { storeVideosAction } from '../../../video/redux/actions/storeVideosAction';
import fetchVideosForCollectionMiddleware from './fetchVideosForCollectionMiddleware';

jest.mock('../../../../services/videos/fetchVideo');
const fetchVideoMock = fetchVideo as Mock;
const mockStore = configureStore<{}>([fetchVideosForCollectionMiddleware]);

test('dispatches a store action per successfully fetched video', async () => {
  const video = VideoFactory.sample();
  const store = mockStore({});
  fetchVideoMock.mockReturnValue(Promise.resolve(video));

  store.dispatch(
    fetchVideosByIdsAction({
      videos: [
        {
          value: video.id,
          links: video.links,
        },
      ],
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      storeVideosAction({ videos: [video] }),
    );
  });
});

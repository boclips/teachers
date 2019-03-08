import configureStore from 'redux-mock-store';
import eventually from '../../../../../test-support/eventually';
import { VideoFactory } from '../../../../../test-support/factories';
import { fetchVideoFromSelfLink } from '../../../../services/videos/fetchVideo';
import { fetchVideosForCollectionAction } from '../actions/fetchVideosForCollectionAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { VideoCollectionFactory } from './../../../../../test-support/factories';
import fetchVideosForCollectionMiddleware from './fetchVideosForCollectionMiddleware';
import Mock = jest.Mock;

jest.mock('../../../../services/videos/fetchVideo');
const fetchVideoMock = fetchVideoFromSelfLink as Mock;
const mockStore = configureStore<{}>([fetchVideosForCollectionMiddleware]);

test('dispatches a store action per successfully fetched video', async () => {
  const video = VideoFactory.sample();
  const collection = VideoCollectionFactory.sample();
  const store = mockStore({});
  fetchVideoMock.mockReturnValue(Promise.resolve(video));

  store.dispatch(
    fetchVideosForCollectionAction({
      videos: [
        {
          id: video.id,
          links: video.links,
        },
      ],
      collection,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      storeVideoForCollectionAction({ videos: [video], collection }),
    );
  });
});

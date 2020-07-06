import configureStore from 'redux-mock-store';
import { PageSpecFactory, VideoFactory } from 'test-support/factories';
import { VideoType } from 'src/types/Video';
import { storePromotedVideosAction } from 'src/components/video/redux/actions/storePromotedVideosAction';
import eventually from '../../../../../test-support/eventually';
import { fetchPromotedVideosAction } from '../actions/fetchPromotedVideosAction';
import fetchVideos from '../../../../services/videos/fetchVideos';
import fetchVideosMiddleware from './fetchVideosMiddleware';

import Mock = jest.Mock;

jest.mock('../../../../services/videos/fetchVideos');
const fetchVideosMock = fetchVideos as Mock;

const mockStore = configureStore<{}>(fetchVideosMiddleware);

describe('fetchVideosMiddleware', () => {
  it('fetching promoted videos will store them', async () => {
    const promotedVideos = [
      VideoFactory.sample({ id: '123' }),
      VideoFactory.sample({ id: '456' }),
    ];
    fetchVideosMock.mockReturnValue(
      Promise.resolve({
        videos: promotedVideos,
        paging: PageSpecFactory.sample(),
      }),
    );

    const store = mockStore({
      links: { entries: [], loadingState: 'success' },
    });

    store.dispatch(
      fetchPromotedVideosAction({
        filters: {
          promoted: true,
          type: [VideoType.STOCK, VideoType.INSTRUCTIONAL],
        },
        page: 1,
        size: 3,
        sortBy: 'RANDOM',
      }),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        storePromotedVideosAction({
          promotedVideos,
        }),
      );
    });
  });
});

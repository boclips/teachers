import Mock = jest.Mock;
import configureStore from 'redux-mock-store';
import { linkFetchPromotedVideosToDispatch } from 'src/views/home/HomeViewVideoList';
import { PageSpecFactory, VideoFactory } from 'test-support/factories';
import { VideoType } from 'src/types/Video';
import eventually from '../../../../../test-support/eventually';
import { fetchPromotedVideosAction } from '../actions/fetchPromotedVideosAction';
import fetchVideos from '../../../../services/videos/fetchVideos';
import fetchVideosMiddleware from './fetchVideosMiddleware';

jest.mock('../../../../services/videos/fetchVideos');
const fetchVideosMock = fetchVideos as Mock;

const mockStore = configureStore<{}>(fetchVideosMiddleware);

describe('fetchVideosMiddleware', () => {
  it('filters videos by STOCK and INSTRUCTIONAL types', async () => {
    fetchVideosMock.mockReturnValue(
      Promise.resolve({
        videos: [VideoFactory.sample()],
        paging: PageSpecFactory.sample(),
      }),
    );

    const store = mockStore({
      links: { entries: [], loadingState: 'success' },
    });

    const fetchPromotedVideos = linkFetchPromotedVideosToDispatch(
      store.dispatch,
    );

    fetchPromotedVideos();

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
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
    });
  });
});

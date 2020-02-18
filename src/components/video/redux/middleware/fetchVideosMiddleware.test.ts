import configureStore from 'redux-mock-store';
import eventually from 'test-support/eventually';
import { linkFetchPromotedVideosToDispatch } from 'src/views/home/HomeViewVideoList';
import Mock = jest.Mock;
import { PageSpecFactory, VideoFactory } from 'test-support/factories';
import fetchVideos from 'src/services/videos/fetchVideos';
import { VideoType } from 'src/types/Video';
import { fetchPromotedVideosAction } from '../actions/fetchPromotedVideosAction';
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
            isClassroom: true,
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

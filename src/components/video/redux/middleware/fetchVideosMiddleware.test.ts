import configureStore from 'redux-mock-store';
import eventually from '../../../../../test-support/eventually';
import { linkFetchPromotedVideosToDispatch } from '../../../../views/home/HomeViewVideoList';
import { fetchPromotedVideosAction } from '../actions/fetchPromotedVideosAction';
import Mock = jest.Mock;
import {
  PageSpecFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import fetchVideos from '../../../../services/videos/fetchVideos';
import { VideoType } from '../../../../types/Video';
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

    const store = mockStore({});

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

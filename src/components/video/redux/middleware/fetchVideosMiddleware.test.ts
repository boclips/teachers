import configureStore from 'redux-mock-store';
import { PageSpecFactory, VideoFactory } from 'test-support/factories';
import { storePromotedVideosAction } from 'src/components/video/redux/actions/storePromotedVideosAction';
import { SortKey } from 'boclips-api-client/dist/sub-clients/videos/model/SortKey';
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
        videoSearchRequest: {
          filters: {
            promoted: true,
            subject: ['test-subject-id'],
          },
          page: 1,
          size: 3,
          sortBy: SortKey.RANDOM,
        },
        additionalVideos: true,
      }),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        storePromotedVideosAction({
          promotedVideos,
          additionalVideos: true,
        }),
      );
    });
  });

  it('request additional promoted videos if not enough found by subjects', async () => {
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
        videoSearchRequest: {
          filters: {
            promoted: true,
            subject: ['test-subject-id'],
          },
          page: 1,
          size: 3,
          sortBy: SortKey.RANDOM,
        },
        additionalVideos: false,
      }),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        fetchPromotedVideosAction({
          videoSearchRequest: {
            filters: {
              promoted: true,
            },
            page: 1,
            size: 3,
            sortBy: SortKey.RANDOM,
          },
          additionalVideos: true,
        }),
      );
    });
  });
});

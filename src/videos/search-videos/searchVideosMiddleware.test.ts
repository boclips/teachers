import Mock = jest.Mock;

jest.mock('./searchVideos');

import configureStore, { MockStore } from 'redux-mock-store';
import eventually from '../../../test-support/eventually';
import { LinksFactory, VideoFactory } from '../../../test-support/factories';
import { searchVideosAction } from '../../layout/TopSearchBarLayout';
import { LinksState, SearchResults } from '../../State';
import searchVideos from './searchVideos';
import searchVideosMiddleware, {
  storeSearchResultsAction,
} from './searchVideosMiddleware';

const searchVideosMock = searchVideos as Mock;

const mockStore = configureStore<LinksState>([searchVideosMiddleware]);

let store: MockStore<LinksState>;

beforeEach(() => {
  store = mockStore({
    links: LinksFactory.sample(),
  });
});

describe('on successful search', () => {
  test('dispatches a store action with received videos', async () => {
    const searchResults: SearchResults = {
      videos: [
        VideoFactory.sample({ title: 'video about cats' }),
        VideoFactory.sample({ title: 'video about dogs' }),
      ],
      query: 'animals',
      searchId: 's123',
      paging: {
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 10,
      },
    };

    searchVideosMock.mockReturnValue(Promise.resolve(searchResults));

    store.dispatch(searchVideosAction({ query: 'llama', pageNumber: 1 }));

    await eventually(() =>
      expect(store.getActions()).toContainEqual(
        storeSearchResultsAction(searchResults),
      ),
    );
  });
});

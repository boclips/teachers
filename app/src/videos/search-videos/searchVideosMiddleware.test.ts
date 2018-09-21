import Mock = jest.Mock;

jest.mock('./searchVideos');

import configureStore, { MockStore } from 'redux-mock-store';
import eventually from '../../../test-support/eventually';
import { LinksFactory, VideoFactory } from '../../../test-support/factories';
import { LinksState, SearchResults } from '../../State';
import { searchVideosAction } from '../SearchLayout';
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
    };

    searchVideosMock.mockReturnValue(Promise.resolve(searchResults));

    store.dispatch(searchVideosAction('llama'));

    await eventually(() =>
      expect(store.getActions()).toContainEqual(
        storeSearchResultsAction(searchResults),
      ),
    );
  });
});

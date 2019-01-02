import { VideoFactory } from '../../test-support/factories';
import { searchVideosAction } from '../layout/TopSearchBarLayout';
import { SearchResults, SearchStateValue } from '../State';
import { storeSearchResultsAction } from './search-videos/searchVideosMiddleware';
import { searchReducer } from './searchReducer';

const defaultPaging = {
  totalElements: 0,
  totalPages: 0,
  number: 0,
  size: 10,
};

test('Clears videos and sets loading flag and query on the loading action', () => {
  const state: SearchStateValue = {
    loading: false,
    videos: [VideoFactory.sample({ title: 'my video' })],
    query: '',
    searchId: null,
    paging: defaultPaging,
  };

  const newState = searchReducer(
    state,
    searchVideosAction({ query: 'donuts', page: 1 }),
  );

  const expectedState: SearchStateValue = {
    loading: true,
    videos: [],
    query: 'donuts',
    searchId: null,
    paging: defaultPaging,
  };

  expect(newState).toEqual(expectedState);
});

test('Sets videos and clears loading flag on the store action', () => {
  const state: SearchStateValue = {
    loading: true,
    videos: [],
    query: 'pancakes',
    searchId: 'whatever',
    paging: defaultPaging,
  };

  const searchResults: SearchResults = {
    videos: [VideoFactory.sample({ title: 'dog video' })],
    searchId: 's4',
    query: 'dogs',
    paging: defaultPaging,
  };

  const newState = searchReducer(
    state,
    storeSearchResultsAction(searchResults),
  );

  const expectedState: SearchStateValue = {
    loading: false,
    videos: [VideoFactory.sample({ title: 'dog video' })],
    query: 'dogs',
    searchId: 's4',
    paging: defaultPaging,
  };

  expect(newState).toEqual(expectedState);
});

import { VideoFactory } from '../../test-support/factories';
import { SearchResults, SearchStateValue } from '../State';
import { storeSearchResultsAction } from './search-videos/searchVideosMiddleware';
import { searchVideosAction } from './search-videos/SearchView';
import { searchReducer } from './searchReducer';

test('Clears videos and sets loading flag and query on the loading action', () => {
  const state: SearchStateValue = {
    loading: false,
    videos: [VideoFactory.sample({ title: 'my video' })],
    query: '',
    searchId: null,
  };

  const newState = searchReducer(state, searchVideosAction('donuts'));

  const expectedState: SearchStateValue = {
    loading: true,
    videos: [],
    query: 'donuts',
    searchId: null,
  };

  expect(newState).toEqual(expectedState);
});

test('Sets videos and clears loading flag on the store action', () => {
  const state: SearchStateValue = {
    loading: true,
    videos: [],
    query: 'pancakes',
    searchId: 'whatever',
  };

  const searchResults: SearchResults = {
    videos: [VideoFactory.sample({ title: 'dog video' })],
    searchId: 's4',
    query: 'dogs',
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
  };

  expect(newState).toEqual(expectedState);
});

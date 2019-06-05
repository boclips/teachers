import { VideoFactory } from '../../../../../test-support/factories';
import { SearchStateValue, VideoSearchResults } from '../../../../types/State';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';
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
    paging: defaultPaging,
  };

  const newState = searchReducer(
    state,
    searchVideosAction({
      query: 'donuts',
      page: 1,
      filters: {
        includeTags: [],
        excludeTags: [],
      },
      sortBy: null,
    }),
  );

  const expectedState: SearchStateValue = {
    loading: true,
    videos: [],
    query: 'donuts',
    paging: defaultPaging,
  };

  expect(newState).toEqual(expectedState);
});

test('Sets videos and clears loading flag on the store action', () => {
  const state: SearchStateValue = {
    loading: true,
    videos: [],
    query: 'pancakes',
    paging: defaultPaging,
  };

  const searchResults: VideoSearchResults = {
    videos: [VideoFactory.sample({ title: 'dog video' })],
    query: 'dogs',
    paging: defaultPaging,
  };

  const newState = searchReducer(
    state,
    storeVideoSearchResultsAction(searchResults),
  );

  const expectedState: SearchStateValue = {
    loading: false,
    videos: [VideoFactory.sample({ title: 'dog video' })],
    query: 'dogs',
    paging: defaultPaging,
  };

  expect(newState).toEqual(expectedState);
});

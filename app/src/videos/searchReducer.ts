import { Reducer } from 'redux';
import createReducer, { actionHandler } from '../redux/createReducer';
import { SearchResults, SearchStateValue } from '../State';
import { storeSearchResultsAction } from './search-videos/searchVideosMiddleware';
import { searchVideosAction } from './SearchLayout';

const initialState: SearchStateValue = {
  videos: [],
  loading: false,
  query: '',
  searchId: null,
};

function onSearchVideosAction(_, query: string): SearchStateValue {
  return { videos: [], query, searchId: null, loading: true };
}

function onStoreSearchResultsAction(
  _: SearchStateValue,
  results: SearchResults,
): SearchStateValue {
  return { ...results, loading: false };
}

export const searchReducer: Reducer<SearchStateValue> = createReducer(
  initialState,
  actionHandler(searchVideosAction, onSearchVideosAction),
  actionHandler(storeSearchResultsAction, onStoreSearchResultsAction),
);

import { Reducer } from 'redux';
import { searchVideosAction } from '../layout/TopSearchBarLayout';
import createReducer, { actionHandler } from '../redux/createReducer';
import { SearchResults, SearchStateValue } from '../State';
import { storeSearchResultsAction } from './search-videos/searchVideosMiddleware';

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

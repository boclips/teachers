import { Reducer } from 'redux';
import { searchVideosAction } from '../layout/TopSearchBarLayout';
import PageSpec from '../PageSpec';
import createReducer, { actionHandler } from '../redux/createReducer';
import { SearchResults, SearchStateValue } from '../State';
import { storeSearchResultsAction } from './search-videos/searchVideosMiddleware';

const defaultPaging: PageSpec = {
  totalElements: 0,
  totalPages: 0,
  number: 0,
  size: 10,
};

const initialState: SearchStateValue = {
  videos: [],
  loading: false,
  query: '',
  searchId: null,
  paging: defaultPaging,
};

function onSearchVideosAction(_, query: string): SearchStateValue {
  return {
    videos: [],
    query,
    searchId: null,
    loading: true,
    paging: defaultPaging,
  };
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

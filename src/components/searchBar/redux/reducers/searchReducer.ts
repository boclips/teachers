import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import PageSpec from '../../../../types/PageSpec';
import { SearchRequest } from '../../../../types/SearchRequest';
import { SearchResults, SearchStateValue } from '../../../../types/State';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeSearchResultsAction } from '../actions/storeSearchResultsAction';

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
  paging: defaultPaging,
};

function onSearchVideosAction(
  _,
  searchRequest: SearchRequest,
): SearchStateValue {
  return {
    videos: [],
    query: searchRequest.query,
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

import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import PageSpec from '../../../../types/PageSpec';
import { SearchStateValue, VideoSearchResults } from '../../../../types/State';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';

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
  searchRequest: VideoSearchRequest,
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
  results: VideoSearchResults,
): SearchStateValue {
  return { ...results, loading: false };
}

export const searchReducer: Reducer<SearchStateValue> = createReducer(
  initialState,
  actionHandler(searchVideosAction, onSearchVideosAction),
  actionHandler(storeVideoSearchResultsAction, onStoreSearchResultsAction),
);

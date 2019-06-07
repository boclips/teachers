import { combineReducers, Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import PageSpec from '../../../../types/PageSpec';
import {
  CollectionSearchResults,
  CollectionSearchStateValue,
  SearchStateValue,
  VideoSearchResults,
  VideoSearchStateValue,
} from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { storeVideoForCollectionAction } from '../../../collection/redux/actions/storeVideoForCollectionAction';
import { updateMatchingCollectionWithVideos } from '../../../collection/redux/reducers/storeCollectionsReducer';
import { searchCollectionsAction } from '../actions/searchCollectionsActions';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';

const defaultPaging: PageSpec = {
  totalElements: 0,
  totalPages: 0,
  number: 0,
  size: 10,
};

const initialState: VideoSearchStateValue = {
  videos: [],
  loading: false,
  query: '',
  paging: defaultPaging,
};

function onSearchVideosAction(
  _,
  searchRequest: VideoSearchRequest,
): VideoSearchStateValue {
  return {
    videos: [],
    query: searchRequest.query,
    loading: true,
    paging: defaultPaging,
  };
}

function onStoreVideoSearchResultsAction(
  _: VideoSearchStateValue,
  results: VideoSearchResults,
): VideoSearchStateValue {
  return { ...results, loading: false };
}

function onSearchCollectionsAction(
  _,
  searchRequest: CollectionSearchRequest,
): CollectionSearchStateValue {
  return {
    collections: [],
    query: searchRequest.query,
    loading: true,
  };
}

function onStoreCollectionSearchResultsAction(
  _: CollectionSearchStateValue,
  results: CollectionSearchResults,
): CollectionSearchStateValue {
  return { ...results, loading: false };
}

function onStoreVideosForSearchCollection(
  state: CollectionSearchStateValue,
  request: {
    videos: Video[];
    collection: VideoCollection;
  },
): CollectionSearchStateValue {
  if (!state || !state.collections) {
    return state;
  }

  const collectionItems = updateMatchingCollectionWithVideos(
    request,
    state.collections,
  );

  return {
    ...state,
    collections: collectionItems,
  };
}

export const videoSearchReducer: Reducer<VideoSearchStateValue> = createReducer(
  initialState,
  actionHandler(searchVideosAction, onSearchVideosAction),
  actionHandler(storeVideoSearchResultsAction, onStoreVideoSearchResultsAction),
);

export const collectionSearchReducer: Reducer<
  CollectionSearchStateValue
> = createReducer(
  initialState,
  actionHandler(searchCollectionsAction, onSearchCollectionsAction),
  actionHandler(
    storeCollectionSearchResultsAction,
    onStoreCollectionSearchResultsAction,
  ),
  actionHandler(
    storeVideoForCollectionAction,
    onStoreVideosForSearchCollection,
  ),
);

export const searchReducer: Reducer<SearchStateValue> = combineReducers({
  videoSearch: videoSearchReducer,
  collectionSearch: collectionSearchReducer,
});

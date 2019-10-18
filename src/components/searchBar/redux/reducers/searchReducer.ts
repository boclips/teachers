import { combineReducers, Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import PageSpec from '../../../../types/PageSpec';
import {
  CollectionSearchResults,
  CollectionSearchStateValue,
  getIndexOfCollection,
  SearchStateValue,
  VideoSearchResults,
  VideoSearchStateValue,
} from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { onCollectionBookmarkedAction } from '../../../collection/redux/actions/onCollectionBookmarkedAction';
import { onCollectionUnbookmarkedAction } from '../../../collection/redux/actions/onCollectionUnbookmarkedAction';
import { storeVideosForCollectionAction } from '../../../collection/redux/actions/storeVideosForCollectionAction';
import { updateMatchingCollectionWithVideos } from '../../../collection/redux/reducers/storeCollectionsReducer';
import { storeVideoForCollectionAction } from '../../../video/redux/actions/storeVideoForCollectionAction';
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

export function replaceVideo(originalVideos: Video[], video: Video): Video[] {
  const videos = [...originalVideos];
  const index = videos.findIndex(v => v.id === video.id);
  if (index > -1) {
    videos[index] = video;
  }
  return videos;
}

function onStoreVideoAction(
  state: VideoSearchStateValue,
  video: Video,
): VideoSearchStateValue {
  if (!state || !state.videos) {
    return state;
  }

  return {
    ...state,
    videos: replaceVideo(state.videos, video),
  };
}

function onCollectionBookmarkUpdate(
  state: CollectionSearchStateValue,
  updatedCollection: VideoCollection,
): CollectionSearchStateValue {
  if (state.collections === undefined) {
    return state;
  }

  const indexOfCollectionToUpdate = getIndexOfCollection(
    state.collections,
    updatedCollection.id,
  );

  if (indexOfCollectionToUpdate < 0) {
    return state;
  }

  const newCollections = [...state.collections];
  const originalCollection = newCollections[indexOfCollectionToUpdate];

  const collectionToUpdate = {
    ...updatedCollection,
    videos: originalCollection.videos,
  };

  newCollections[indexOfCollectionToUpdate] = collectionToUpdate;

  return {
    ...state,
    collections: newCollections,
  };
}

export const videoSearchReducer: Reducer<VideoSearchStateValue> = createReducer(
  initialState,
  actionHandler(searchVideosAction, onSearchVideosAction),
  actionHandler(storeVideoSearchResultsAction, onStoreVideoSearchResultsAction),
  actionHandler(storeVideoForCollectionAction, onStoreVideoAction),
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
    storeVideosForCollectionAction,
    onStoreVideosForSearchCollection,
  ),
  actionHandler(onCollectionUnbookmarkedAction, onCollectionBookmarkUpdate),
  actionHandler(onCollectionBookmarkedAction, onCollectionBookmarkUpdate),
);

export const searchReducer: Reducer<SearchStateValue> = combineReducers({
  videoSearch: videoSearchReducer,
  collectionSearch: collectionSearchReducer,
});

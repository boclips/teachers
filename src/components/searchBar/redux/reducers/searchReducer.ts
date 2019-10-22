import {
  actionHandler,
  ActionHandler,
} from '../../../../app/redux/createReducer';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import PageSpec from '../../../../types/PageSpec';
import State, {
  CollectionsSearchResult,
  SearchStateValue,
  VideoSearchResults,
} from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { collectionsById } from '../../../collection/redux/reducers/storeCollectionsReducer';
import { storeVideoAction } from '../../../video/redux/actions/storeVideoAction';
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

export const initialSearchState: SearchStateValue = {
  videoSearch: { videos: [], loading: false, query: '', paging: defaultPaging },
  collectionSearch: {
    collectionIds: [],
    loading: false,
    query: '',
  },
};

function onSearchVideosAction(
  state: State,
  searchRequest: VideoSearchRequest,
): State {
  return {
    ...state,
    search: {
      ...state.search,
      videoSearch: {
        videos: [],
        query: searchRequest.query,
        loading: true,
        paging: defaultPaging,
      },
    },
  };
}

function onStoreVideoSearchResultsAction(
  state: State,
  results: VideoSearchResults,
): State {
  return {
    ...state,
    search: {
      ...state.search,
      videoSearch: {
        ...results,
        loading: false,
      },
    },
  };
}

function onSearchCollectionsAction(
  state: State,
  searchRequest: CollectionSearchRequest,
): State {
  return {
    ...state,
    search: {
      ...state.search,
      collectionSearch: {
        collectionIds: [],
        query: searchRequest.query,
        loading: true,
      },
    },
  };
}

function onStoreCollectionSearchResultsAction(
  state: State,
  results: CollectionsSearchResult,
): State {
  return {
    ...state,
    search: {
      ...state.search,
      collectionSearch: {
        collectionIds: results.collections.map(it => it.id),
        query: results.query,
        loading: false,
      },
    },
    collections: {
      ...state.collections,
      byId: {
        ...state.collections.byId,
        ...collectionsById(results.collections),
      },
    },
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

function onStoreVideoAction(state: State, video: Video): State {
  const videoState = state.search.videoSearch;

  if (!videoState || !videoState.videos) {
    return state;
  }

  return {
    ...state,
    search: {
      ...state.search,
      videoSearch: {
        ...videoState,
        videos: replaceVideo(videoState.videos, video),
      },
    },
  };
}

export const videoSearchHandlers: Array<ActionHandler<State, any>> = [
  actionHandler(searchVideosAction, onSearchVideosAction),
  actionHandler(storeVideoSearchResultsAction, onStoreVideoSearchResultsAction),
  actionHandler(storeVideoAction, onStoreVideoAction),
];

export const collectionSearchHandlers: Array<ActionHandler<State, any>> = [
  actionHandler(searchCollectionsAction, onSearchCollectionsAction),
  actionHandler(
    storeCollectionSearchResultsAction,
    onStoreCollectionSearchResultsAction,
  ),
];

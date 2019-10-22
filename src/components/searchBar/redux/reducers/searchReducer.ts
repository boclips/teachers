import {
  actionHandler,
  ActionHandler,
} from '../../../../app/redux/createReducer';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import PageSpec from '../../../../types/PageSpec';
import State, {
  CollectionSearchResults,
  getIndexOfCollection,
  SearchStateValue,
  VideoSearchResults,
} from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { onCollectionBookmarkedAction } from '../../../collection/redux/actions/onCollectionBookmarkedAction';
import { onCollectionUnbookmarkedAction } from '../../../collection/redux/actions/onCollectionUnbookmarkedAction';
import { storeVideosForCollectionAction } from '../../../collection/redux/actions/storeVideosForCollectionAction';
import { updateMatchingCollectionWithVideos } from '../../../collection/redux/reducers/storeCollectionsReducer';
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
    collections: [],
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
        collections: [],
        query: searchRequest.query,
        loading: true,
      },
    },
  };
}

function onStoreCollectionSearchResultsAction(
  state: State,
  results: CollectionSearchResults,
): State {
  return {
    ...state,
    search: {
      ...state.search,
      collectionSearch: { ...results, loading: false },
    },
  };
}

function onStoreVideosForSearchCollection(
  state: State,
  request: {
    videos: Video[];
    collection: VideoCollection;
  },
): State {
  const collectionsState = state.search.collectionSearch;
  if (!collectionsState || !collectionsState.collections) {
    return state;
  }

  const collectionItems = updateMatchingCollectionWithVideos(
    request,
    collectionsState.collections,
  );

  return {
    ...state,
    search: {
      ...state.search,
      collectionSearch: {
        ...collectionsState,
        collections: collectionItems,
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

function onCollectionBookmarkUpdate(
  state: State,
  updatedCollection: VideoCollection,
): State {
  const collectionState = state.search.collectionSearch;
  if (collectionState.collections === undefined) {
    return state;
  }

  const indexOfCollectionToUpdate = getIndexOfCollection(
    collectionState.collections.map(c => c.id),
    updatedCollection.id,
  );

  if (indexOfCollectionToUpdate < 0) {
    return state;
  }

  const newCollections = [...collectionState.collections];
  const originalCollection = newCollections[indexOfCollectionToUpdate];

  const collectionToUpdate = {
    ...updatedCollection,
    videos: originalCollection.videos,
  };

  newCollections[indexOfCollectionToUpdate] = collectionToUpdate;

  return {
    ...state,
    search: {
      ...state.search,
      collectionSearch: {
        ...collectionState,
        collections: newCollections,
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
  actionHandler(
    storeVideosForCollectionAction,
    onStoreVideosForSearchCollection,
  ),
  actionHandler(onCollectionUnbookmarkedAction, onCollectionBookmarkUpdate),
  actionHandler(onCollectionBookmarkedAction, onCollectionBookmarkUpdate),
];

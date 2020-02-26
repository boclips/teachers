import produce from 'immer';
import {
  actionHandler,
  ActionHandler,
} from '../../../../app/redux/createReducer';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import PageSpec from '../../../../types/PageSpec';
import {
  CollectionSearchResult,
  VideoSearchResult,
} from '../../../../types/SearchResults';
import State, { SearchStateValue } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { organizeById } from '../../../../utils/entityMap';
import { getCollectionsByIds } from '../../../collection/redux/reducers/collectionEntitiesReducer';
import { getVideosByIds } from '../../../video/redux/reducers/videoReducer';
import { searchCollectionsAction } from '../actions/searchCollectionsActions';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';
import { VideoMap } from './../../../../types/State';

const defaultPaging: PageSpec = {
  totalElements: 0,
  totalPages: 0,
  number: 0,
  size: 10,
};

export const initialSearchState: SearchStateValue = {
  videoSearch: {
    videoIds: [],
    loading: false,
    query: '',
    paging: defaultPaging,
  },
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
        videoIds: [],
        query: searchRequest.query,
        loading: true,
        paging: defaultPaging,
      },
    },
  };
}

function onStoreVideoSearchResultsAction(
  state: State,
  results: VideoSearchResult,
): State {
  return produce(state, draftState => {
    const newVideos: VideoMap = organizeById(results.videos);

    draftState.entities.videos.byId = {
      ...draftState.entities.videos.byId,
      ...newVideos,
    };

    draftState.search.videoSearch = {
      videoIds: results.videos.map(it => it.id),
      loading: false,
      query: results.query,
      paging: results.paging,
    };
  });
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
  results: CollectionSearchResult,
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
    entities: {
      ...state.entities,
      collections: {
        ...state.entities.collections,
        byId: {
          ...state.entities.collections.byId,
          ...organizeById(results.collections),
        },
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

export const videoSearchHandlers: Array<ActionHandler<State, any>> = [
  actionHandler(searchVideosAction, onSearchVideosAction),
  actionHandler(storeVideoSearchResultsAction, onStoreVideoSearchResultsAction),
];

export const collectionSearchHandlers: Array<ActionHandler<State, any>> = [
  actionHandler(searchCollectionsAction, onSearchCollectionsAction),
  actionHandler(
    storeCollectionSearchResultsAction,
    onStoreCollectionSearchResultsAction,
  ),
];

export const getVideosFromSearchResult = (state: State): Video[] =>
  getVideosByIds(state, state.search.videoSearch.videoIds);

export const getCollectionsFromSearchResult = (
  state: State,
): VideoCollection[] =>
  getCollectionsByIds(state, state.search.collectionSearch.collectionIds);

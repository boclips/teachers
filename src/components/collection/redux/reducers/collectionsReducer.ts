import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { CollectionsStateValue } from '../../../../types/State';
import { Video, VideoId } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addToCollectionAction } from '../actions/addToCollectionAction';
import { addToCollectionResultAction } from '../actions/addToCollectionResultAction';
import { createCollectionAction } from '../actions/createCollectionAction';
import { createCollectionResultAction } from '../actions/createCollectionResultAction';
import { onCollectionEditedAction } from '../actions/onCollectionEditedAction';
import { onCollectionRemovedAction } from '../actions/onCollectionRemovedAction';
import { removeFromCollectionAction } from '../actions/removeFromCollectionAction';
import { removeFromCollectionResultAction } from '../actions/removeFromCollectionResultAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';
import { VideoMap } from './../../../../types/VideoCollection';

const initialState: CollectionsStateValue = {
  userCollections: [],
  collectionDetails: null,
  loading: true,
  updating: false,
};

const onStoreCollectionsAction = (
  state: CollectionsStateValue,
  userCollections: VideoCollection[],
): CollectionsStateValue => {
  return {
    ...state,
    userCollections,
    loading: false,
    updating: false,
  };
};

const onStoreCollectionAction = (
  state: CollectionsStateValue,
  collectionDetails: VideoCollection,
): CollectionsStateValue => {
  return { ...state, collectionDetails, loading: false, updating: false };
};

function getIndexOfCollection(
  state: CollectionsStateValue,
  collection: VideoCollection,
) {
  const indexOfCollection = state.userCollections.findIndex(
    col => col.id === collection.id,
  );
  return indexOfCollection;
}

const onAddVideoAction = (
  state: CollectionsStateValue,
  request: { video: Video; collection: VideoCollection },
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(state, request.collection);
  const videos = state.userCollections[indexOfCollection].videos;
  const videoIds = state.userCollections[indexOfCollection].videoIds;

  const alreadyHaveVideoId =
    videoIds.find(v => v.id === request.video.id) != null;
  const alreadyHaveVideo = videos[request.video.id];

  if (alreadyHaveVideo && alreadyHaveVideoId) {
    return state;
  }

  const videoId = {
    id: request.video.id,
    links: request.video.links,
  };

  const userCollections = [...state.userCollections];
  userCollections[indexOfCollection] = {
    ...userCollections[indexOfCollection],
    videos: {
      ...videos,
      [request.video.id]: request.video,
    },
    videoIds: getUpdateVideoIds(videoIds, videoId, alreadyHaveVideoId),
  };
  return { ...state, userCollections, updating: true };
};

const getUpdateVideoIds = (
  videoIds: VideoId[],
  videoId: VideoId,
  alreadyHaveVideoId: boolean,
): VideoId[] => {
  return alreadyHaveVideoId ? [...videoIds] : [...videoIds, videoId];
};

const onRemoveVideoAction = (
  state: CollectionsStateValue,
  request: { video: Video; collection: VideoCollection },
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(state, request.collection);
  const userCollections = [...state.userCollections];

  const collection = userCollections[indexOfCollection];

  userCollections[indexOfCollection] = {
    ...userCollections[indexOfCollection],
    videos: removeVideo(request.video.id, collection.videos),
    videoIds: collection.videoIds.filter(v => v.id !== request.video.id),
  };

  return { ...state, userCollections, updating: true };
};

const removeVideo = (videoIdToRemove: string, videos: VideoMap): VideoMap => {
  const { [videoIdToRemove]: _, ...updatedVideos } = videos;
  return updatedVideos;
};

const collectionUpdated = (
  state: CollectionsStateValue,
  _: UpdateCollectionResult,
): CollectionsStateValue => {
  return { ...state, updating: false };
};

const onCreateCollection = (
  state: CollectionsStateValue,
): CollectionsStateValue => {
  return { ...state, updating: true };
};

const onStoreVideosForCollectionAction = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  state = reduceStoreVideoForUserCollections(state, request);
  return reduceStoreVideoForCollectionDetails(state, request);
};

function getVideoMapToUpdate(request: {
  videos: Video[];
  collection: VideoCollection;
}) {
  return request.videos.reduce((map, video) => {
    map[video.id] = video;
    return map;
  }, {});
}

function videosAlreadyLoaded(
  request: { videos: Video[]; collection: VideoCollection },
  videos,
) {
  return request.videos.map(v => v.id).every(id => videos[id] !== undefined);
}

const reduceStoreVideoForUserCollections = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(state, request.collection);
  if (indexOfCollection < 0) {
    return state;
  }
  const userCollections = [...state.userCollections];
  const videos = state.userCollections[indexOfCollection].videos;

  if (videosAlreadyLoaded(request, videos)) {
    return state;
  }

  const videoMapToUpdate: VideoMap = getVideoMapToUpdate(request);

  userCollections[indexOfCollection] = {
    ...userCollections[indexOfCollection],
    videos: {
      ...videos,
      ...videoMapToUpdate,
    },
  };

  return { ...state, updating: true, userCollections };
};

const reduceStoreVideoForCollectionDetails = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  if (
    !state.collectionDetails ||
    state.collectionDetails.id !== request.collection.id
  ) {
    return state;
  }
  const videos = state.collectionDetails.videos;

  if (videosAlreadyLoaded(request, videos)) {
    return state;
  }

  const videoMapToUpdate: VideoMap = getVideoMapToUpdate(request);

  const collectionDetails = {
    ...state.collectionDetails,
    videos: {
      ...videos,
      ...videoMapToUpdate,
    },
  };

  return { ...state, updating: true, collectionDetails };
};

const onCollectionRemoved = (
  state: CollectionsStateValue,
  removedCollection: VideoCollection,
): CollectionsStateValue => {
  return {
    ...state,
    updating: false,
    userCollections: state.userCollections.filter(
      collection => collection.id !== removedCollection.id,
    ),
  };
};

const onCollectionEdited = (
  state: CollectionsStateValue,
  editedCollection: VideoCollection,
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(state, editedCollection);

  const userCollections = [...state.userCollections];
  let collectionDetails = state.collectionDetails;

  if (indexOfCollection > -1) {
    userCollections[indexOfCollection] = {
      ...userCollections[indexOfCollection],
      ...editedCollection,
    };
  }

  if (editedCollection.id === state.collectionDetails.id) {
    collectionDetails = { ...editedCollection };
  }

  return {
    ...state,
    userCollections,
    collectionDetails,
  };
};

export const collectionsReducer: Reducer<CollectionsStateValue> = createReducer(
  initialState,
  actionHandler(storeCollectionsAction, onStoreCollectionsAction),
  actionHandler(storeCollectionAction, onStoreCollectionAction),
  actionHandler(addToCollectionAction, onAddVideoAction),
  actionHandler(removeFromCollectionAction, onRemoveVideoAction),
  actionHandler(createCollectionAction, onCreateCollection),

  actionHandler(removeFromCollectionResultAction, collectionUpdated),
  actionHandler(addToCollectionResultAction, collectionUpdated),
  actionHandler(createCollectionResultAction, collectionUpdated),
  actionHandler(onCollectionRemovedAction, onCollectionRemoved),
  actionHandler(
    storeVideoForCollectionAction,
    onStoreVideosForCollectionAction,
  ),
  actionHandler(onCollectionEditedAction, onCollectionEdited),
);

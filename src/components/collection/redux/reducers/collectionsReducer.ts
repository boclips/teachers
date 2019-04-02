import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import {
  CollectionsStateValue,
  getIndexOfCollection,
  Scrollable,
} from '../../../../types/State';
import { Video, VideoId } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addToCollectionAction } from '../actions/addToCollectionAction';
import { addToCollectionResultAction } from '../actions/addToCollectionResultAction';
import { appendPublicCollectionsAction } from '../actions/appendPublicCollectionsAction';
import { createCollectionAction } from '../actions/createCollectionAction';
import { createCollectionResultAction } from '../actions/createCollectionResultAction';
import { editCollectionAction } from '../actions/editCollectionAction';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { fetchCollectionsAction } from '../actions/fetchCollectionsAction';
import { fetchPublicCollectionsAction } from '../actions/fetchPublicCollectionsAction';
import { onCollectionEditedAction } from '../actions/onCollectionEditedAction';
import { onCollectionRemovedAction } from '../actions/onCollectionRemovedAction';
import { removeFromCollectionAction } from '../actions/removeFromCollectionAction';
import { removeFromCollectionResultAction } from '../actions/removeFromCollectionResultAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storePublicCollectionsAction } from '../actions/storePublicCollectionsAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';
import { VideoMap } from './../../../../types/VideoCollection';

const initialState: CollectionsStateValue = {
  myCollections: [],
  publicCollections: undefined,
  publicCollectionDetails: undefined,
  loading: true,
  updating: false,
};

const onStoreCollectionsAction = (
  state: CollectionsStateValue,
  myCollections: VideoCollection[],
): CollectionsStateValue => {
  return {
    ...state,
    myCollections,
    loading: false,
    updating: false,
  };
};

const onStorePublicCollectionsAction = (
  state: CollectionsStateValue,
  publicCollections: Scrollable<VideoCollection>,
): CollectionsStateValue => {
  return {
    ...state,
    publicCollections,
    loading: false,
    updating: false,
  };
};

const onAppendPublicCollectionsAction = (
  state: CollectionsStateValue,
  publicCollections: Scrollable<VideoCollection>,
): CollectionsStateValue => {
  publicCollections = {
    ...state.publicCollections,
    items: [...state.publicCollections.items, ...publicCollections.items],
    links: publicCollections.links,
  };
  return {
    ...state,
    publicCollections,
    loading: false,
    updating: false,
  };
};

const loadingCollections = (
  state: CollectionsStateValue,
): CollectionsStateValue => {
  return {
    ...state,
    loading: true,
  };
};

const onStoreCollectionAction = (
  state: CollectionsStateValue,
  collectionDetails: VideoCollection,
): CollectionsStateValue => {
  return {
    ...state,
    publicCollectionDetails: collectionDetails,
    loading: false,
    updating: false,
  };
};

const onAddVideoAction = (
  state: CollectionsStateValue,
  request: { video: Video; collection: VideoCollection },
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(
    state.myCollections,
    request.collection.id,
  );
  const myCollections = [...state.myCollections];

  if (indexOfCollection > -1) {
    const videos = state.myCollections[indexOfCollection].videos;
    const videoIds = state.myCollections[indexOfCollection].videoIds;

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

    myCollections[indexOfCollection] = {
      ...myCollections[indexOfCollection],
      videos: {
        ...videos,
        [request.video.id]: request.video,
      },
      videoIds: getUpdateVideoIds(videoIds, videoId, alreadyHaveVideoId),
    };
  }

  return { ...state, myCollections, updating: true };
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
  const myCollections = [...state.myCollections];
  const indexOfCollection = getIndexOfCollection(
    state.myCollections,
    request.collection.id,
  );

  if (indexOfCollection > -1) {
    const collection = myCollections[indexOfCollection];

    myCollections[indexOfCollection] = {
      ...myCollections[indexOfCollection],
      videos: removeVideo(request.video.id, collection.videos),
      videoIds: collection.videoIds.filter(v => v.id !== request.video.id),
    };
  }

  return { ...state, myCollections, updating: true };
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

const onEditCollection = (
  state: CollectionsStateValue,
): CollectionsStateValue => {
  return { ...state, updating: true };
};

const onStoreVideosForCollectionAction = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  state = reduceStoreVideoForMyCollections(state, request);
  state = reduceStoreVideoForPublicCollections(state, request);
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

const reduceStoreVideoForMyCollections = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(
    state.myCollections,
    request.collection.id,
  );
  if (indexOfCollection < 0) {
    return state;
  }
  const myCollections = [...state.myCollections];
  const videos = state.myCollections[indexOfCollection].videos;

  if (videosAlreadyLoaded(request, videos)) {
    return state;
  }

  const videoMapToUpdate: VideoMap = getVideoMapToUpdate(request);

  myCollections[indexOfCollection] = {
    ...myCollections[indexOfCollection],
    videos: {
      ...videos,
      ...videoMapToUpdate,
    },
  };

  return { ...state, myCollections };
};

const reduceStoreVideoForPublicCollections = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  if (!state.publicCollections) {
    return state;
  }
  const indexOfCollection = getIndexOfCollection(
    state.publicCollections.items,
    request.collection.id,
  );
  if (indexOfCollection < 0) {
    return state;
  }
  const publicCollectionsItems = [...state.publicCollections.items];
  const videos = state.publicCollections.items[indexOfCollection].videos;

  if (videosAlreadyLoaded(request, videos)) {
    return state;
  }

  const videoMapToUpdate: VideoMap = getVideoMapToUpdate(request);

  publicCollectionsItems[indexOfCollection] = {
    ...publicCollectionsItems[indexOfCollection],
    videos: {
      ...videos,
      ...videoMapToUpdate,
    },
  };

  return {
    ...state,
    publicCollections: {
      ...state.publicCollections,
      items: publicCollectionsItems,
    },
  };
};

const reduceStoreVideoForCollectionDetails = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  if (
    !state.publicCollectionDetails ||
    state.publicCollectionDetails.id !== request.collection.id
  ) {
    return state;
  }
  const videos = state.publicCollectionDetails.videos;

  if (videosAlreadyLoaded(request, videos)) {
    return state;
  }

  const videoMapToUpdate: VideoMap = getVideoMapToUpdate(request);

  const collectionDetails = {
    ...state.publicCollectionDetails,
    videos: {
      ...videos,
      ...videoMapToUpdate,
    },
  };

  return {
    ...state,
    publicCollectionDetails: collectionDetails,
  };
};

const onCollectionRemoved = (
  state: CollectionsStateValue,
  removedCollection: VideoCollection,
): CollectionsStateValue => {
  return {
    ...state,
    updating: false,
    myCollections: state.myCollections.filter(
      collection => collection.id !== removedCollection.id,
    ),
  };
};

const onCollectionEdited = (
  state: CollectionsStateValue,
  editedCollection: VideoCollection,
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(
    state.myCollections,
    editedCollection.id,
  );

  const myCollections = [...state.myCollections];

  if (indexOfCollection > -1) {
    myCollections[indexOfCollection] = {
      ...myCollections[indexOfCollection],
      ...editedCollection,
    };
  }

  return {
    ...state,
    updating: false,
    myCollections,
  };
};

export const collectionsReducer: Reducer<CollectionsStateValue> = createReducer(
  initialState,
  actionHandler(storeCollectionsAction, onStoreCollectionsAction),
  actionHandler(storePublicCollectionsAction, onStorePublicCollectionsAction),
  actionHandler(appendPublicCollectionsAction, onAppendPublicCollectionsAction),
  actionHandler(storeCollectionAction, onStoreCollectionAction),
  actionHandler(addToCollectionAction, onAddVideoAction),
  actionHandler(removeFromCollectionAction, onRemoveVideoAction),
  actionHandler(createCollectionAction, onCreateCollection),
  actionHandler(editCollectionAction, onEditCollection),
  actionHandler(fetchCollectionAction, loadingCollections),
  actionHandler(fetchCollectionsAction, loadingCollections),
  actionHandler(fetchPublicCollectionsAction, loadingCollections),

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

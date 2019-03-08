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
import { onCollectionRemovedAction } from '../actions/onCollectionRemovedAction';
import { removeFromCollectionAction } from '../actions/removeFromCollectionAction';
import { removeFromCollectionResultAction } from '../actions/removeFromCollectionResultAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';
import { VideoMap } from './../../../../types/VideoCollection';

const initialState: CollectionsStateValue = {
  items: [],
  loading: true,
  updating: false,
};

const onStoreCollectionsAction = (
  _: CollectionsStateValue,
  videoCollections: VideoCollection[],
): CollectionsStateValue => {
  return { items: videoCollections, loading: false, updating: false };
};

function getIndexOfCollection(
  state: CollectionsStateValue,
  collection: VideoCollection,
) {
  const indexOfCollection = state.items.findIndex(
    col => col.id === collection.id,
  );
  return indexOfCollection;
}

const onAddVideoAction = (
  state: CollectionsStateValue,
  request: { video: Video; collection: VideoCollection },
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(state, request.collection);
  const videos = state.items[indexOfCollection].videos;
  const videoIds = state.items[indexOfCollection].videoIds;

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

  const items = [...state.items];
  items[indexOfCollection] = {
    ...items[indexOfCollection],
    videos: {
      ...videos,
      [request.video.id]: request.video,
    },
    videoIds: getUpdateVideoIds(videoIds, videoId, alreadyHaveVideoId),
  };
  return { ...state, items, updating: true };
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
  const items = [...state.items];

  const collection = items[indexOfCollection];

  items[indexOfCollection] = {
    ...items[indexOfCollection],
    videos: removeVideo(request.video.id, collection.videos),
    videoIds: collection.videoIds.filter(v => v.id !== request.video.id),
  };

  return { ...state, items, updating: true };
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
  const indexOfCollection = getIndexOfCollection(state, request.collection);
  const items = [...state.items];

  const videos = state.items[indexOfCollection].videos;

  if (request.videos.map(v => v.id).every(id => videos[id] !== undefined)) {
    return state;
  }

  const videoMapToUpdate: VideoMap = request.videos.reduce((map, video) => {
    map[video.id] = video;
    return map;
  }, {});

  items[indexOfCollection] = {
    ...items[indexOfCollection],
    videos: {
      ...videos,
      ...videoMapToUpdate,
    },
  };

  return { ...state, updating: true, items };
};

const onCollectionRemoved = (
  state: CollectionsStateValue,
  removedCollection: VideoCollection,
): CollectionsStateValue => {
  return {
    updating: false,
    ...state,
    items: state.items.filter(
      collection => collection.id !== removedCollection.id,
    ),
  };
};

export const collectionsReducer: Reducer<CollectionsStateValue> = createReducer(
  initialState,
  actionHandler(storeCollectionsAction, onStoreCollectionsAction),
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
);

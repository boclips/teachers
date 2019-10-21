import { CollectionsStateValue } from '../../../../types/State';
import { Video, VideoId } from '../../../../types/Video';
import { VideoCollection, VideoMap } from '../../../../types/VideoCollection';

export const onAddVideoToMyCollectionAction = (
  state: CollectionsStateValue,
  request: { video: Video; collection: VideoCollection },
): CollectionsStateValue => {
  const collection = state.collections[request.collection.id];

  if (collection == null) {
    return state;
  }

  const videos = collection.videos;
  const videoIds = collection.videoIds;

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

  const updatedCollection = {
    ...collection,
    videos: {
      ...videos,
      [request.video.id]: request.video,
    },
    videoIds: getUpdateVideoIds(videoIds, videoId, alreadyHaveVideoId),
  };

  return {
    ...state,
    collections: {
      ...state.collections,
      [updatedCollection.id]: updatedCollection,
    },
    updating: true,
  };
};

const getUpdateVideoIds = (
  videoIds: VideoId[],
  videoId: VideoId,
  alreadyHaveVideoId: boolean,
): VideoId[] => {
  return alreadyHaveVideoId ? [...videoIds] : [...videoIds, videoId];
};

export const onRemoveVideoFromMyCollectionAction = (
  state: CollectionsStateValue,
  request: { video: Video; collection: VideoCollection },
): CollectionsStateValue => {
  const collection = state.collections[request.collection.id];

  if (collection == null) {
    return state;
  }

  const updatedCollection = {
    ...collection,
    videos: removeVideo(request.video.id, collection.videos),
    videoIds: collection.videoIds.filter(v => v.id !== request.video.id),
  };

  return {
    ...state,
    collections: {
      ...state.collections,
      [updatedCollection.id]: updatedCollection,
    },
    updating: true,
  };
};

export const onMyCollectionRemoved = (
  state: CollectionsStateValue,
  removedCollection: VideoCollection,
): CollectionsStateValue => {
  return {
    ...state,
    updating: false,
    myCollections: {
      ...state.myCollections,
      items: state.myCollections.items.filter(
        collectionId => collectionId !== removedCollection.id,
      ),
    },
  };
};

export const onMyCollectionEdited = (
  state: CollectionsStateValue,
  editedCollection: VideoCollection,
): CollectionsStateValue => {
  state = onUpdateCollection(state, editedCollection);

  return {
    ...state,
    updating: false,
  };
};

const onUpdateCollection = (
  state: CollectionsStateValue,
  updatedCollection: VideoCollection,
) => {
  return {
    ...state,
    collections: {
      ...state.collections,
      [updatedCollection.id]: updatedCollection,
    },
  };
};

const removeVideo = (videoIdToRemove: string, videos: VideoMap): VideoMap => {
  const { [videoIdToRemove]: _, ...updatedVideos } = videos;
  return updatedVideos;
};

import {
  CollectionsStateValue,
  getIndexOfCollection,
} from '../../../../types/State';
import { Video, VideoId } from '../../../../types/Video';
import { VideoCollection, VideoMap } from '../../../../types/VideoCollection';

export const onAddVideoToMyCollectionAction = (
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

export const onRemoveVideoFromMyCollectionAction = (
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

export const onMyCollectionRemoved = (
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

export const onMyCollectionEdited = (
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

const removeVideo = (videoIdToRemove: string, videos: VideoMap): VideoMap => {
  const { [videoIdToRemove]: _, ...updatedVideos } = videos;
  return updatedVideos;
};

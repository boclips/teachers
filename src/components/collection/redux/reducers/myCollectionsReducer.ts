import { produce } from 'immer';
import State from '../../../../types/State';
import { Video, VideoId } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onAddVideoToMyCollectionAction = (
  state: State,
  request: { video: Video; collection: VideoCollection },
): State => {
  const collection = state.entities.collections.byId[request.collection.id];

  if (collection == null) {
    return state;
  }

  const videosById = state.entities.videos.byId;
  const videoIds = collection.videoIds;

  const alreadyHaveVideoId =
    videoIds.find(v => v.value === request.video.id) != null;
  const alreadyHaveVideo = videosById[request.video.id];

  if (alreadyHaveVideo && alreadyHaveVideoId) {
    return state;
  }

  const videoId: VideoId = {
    value: request.video.id,
    links: request.video.links,
  };

  const updatedCollection = {
    ...collection,
    videos: {
      ...videosById,
      [request.video.id]: request.video,
    },
    videoIds: getUpdateVideoIds(videoIds, videoId, alreadyHaveVideoId),
  };

  return produce(state, draftState => {
    draftState.entities.collections.byId[
      updatedCollection.id
    ] = updatedCollection;

    draftState.collections.updating = true;
  });
};

const getUpdateVideoIds = (
  videoIds: VideoId[],
  videoId: VideoId,
  alreadyHaveVideoId: boolean,
): VideoId[] => {
  return alreadyHaveVideoId ? [...videoIds] : [...videoIds, videoId];
};

export const onRemoveVideoFromMyCollectionAction = (
  state: State,
  request: { video: Video; collection: VideoCollection },
): State => {
  const collection = state.entities.collections.byId[request.collection.id];

  if (collection == null) {
    return state;
  }

  const updatedCollection = {
    ...collection,
    videos: removeVideo(
      request.video.id,
      collection.videoIds.map(it => it.value),
    ),
    videoIds: collection.videoIds.filter(v => v.value !== request.video.id),
  };

  return produce(state, draftState => {
    draftState.entities.collections.byId[
      updatedCollection.id
    ] = updatedCollection;

    draftState.collections.updating = true;
  });
};

export const onMyCollectionRemoved = (
  state: State,
  removedCollection: VideoCollection,
): State =>
  produce(state, draftState => {
    const myCollections = draftState.collections.myCollections.items;
    myCollections.splice(
      myCollections.findIndex(id => id === removedCollection.id),
    );

    draftState.collections.updating = false;
  });

export const onMyCollectionEdited = (
  state: State,
  editedCollection: VideoCollection,
): State => {
  state = onUpdateCollection(state, editedCollection);

  return {
    ...state,
    collections: {
      ...state.collections,
      updating: false,
    },
  };
};

const onUpdateCollection = (
  state: State,
  updatedCollection: VideoCollection,
): State =>
  produce(state, draftState => {
    draftState.entities.collections.byId[
      updatedCollection.id
    ] = updatedCollection;
  });

const removeVideo = (videoIdToRemove: string, videoIds: string[]): string[] => {
  return videoIds.filter(it => videoIdToRemove !== it);
};

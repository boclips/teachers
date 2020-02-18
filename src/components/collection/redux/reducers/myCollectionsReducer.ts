import { produce } from 'immer';
import State from 'src/types/State';
import { Video, VideoId } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';

export const onAddVideoToMyCollectionAction = (
  state: State,
  request: { video: Video; collection: VideoCollection },
): State => {
  const collection = state.entities.collections.byId[request.collection.id];

  if (collection == null) {
    return state;
  }

  const alreadyHaveVideoId =
    collection.videoIds.find(id => id.value === request.video.id) != null;

  if (alreadyHaveVideoId) {
    return state;
  }

  const videoId: VideoId = {
    value: request.video.id,
    links: request.video.links,
  };

  return produce(state, draftState => {
    draftState.entities.collections.byId[collection.id].videoIds.push(videoId);
    draftState.collections.updating = true;
  });
};

export const onRemoveVideoFromMyCollectionAction = (
  state: State,
  request: { video: Video; collection: VideoCollection },
): State => {
  const collection = state.entities.collections.byId[request.collection.id];

  if (collection == null) {
    return state;
  }

  return produce(state, draftState => {
    const draftCollection = draftState.entities.collections.byId[collection.id];
    draftCollection.videoIds = draftCollection.videoIds.filter(
      id => id.value !== request.video.id,
    );

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
      1,
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

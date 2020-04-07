import { produce } from 'immer';
import State, { CollectionMap } from '../../../../types/State';
import { Video, VideoId } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onClearDiscoverCollections = (state: State, _: any): State => ({
  ...state,
  collections: {
    ...state.collections,
    discoverCollections: {
      items: [],
      links: undefined,
    },
  },
});

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

    const myResources = draftState.collections.myResources.items;
    myResources.splice(
      myResources.findIndex(id => id === removedCollection.id),
      1,
    );

    draftState.collections.updating = false;
  });

export const onCollectionEdited = (
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

export const onCollectionUnbookmarked = (
  state: State,
  unbookmarkedCollection: VideoCollection,
): State =>
  produce(state, draftState => {
    draftState.entities.collections.byId = updateCollections(
      state.entities.collections,
      unbookmarkedCollection,
    );

    const myResources = draftState.collections.myResources;
    if (myResources) {
      const collections = myResources.items || [];
      collections.splice(
        collections.findIndex(id => id === unbookmarkedCollection.id),
        1,
      );
    }
  });

export const onCollectionBookmarked = (
  state: State,
  bookmarkedCollection: VideoCollection,
): State =>
  produce(state, draftState => {
    draftState.entities.collections.byId = updateCollections(
      state.entities.collections,
      bookmarkedCollection,
    );

    const myResources = draftState.collections.myResources;
    if (myResources) {
      myResources.items = myResources.items || [];
      myResources.items.push(bookmarkedCollection.id);
    }
  });

const updateCollections = (
  state: { byId: CollectionMap },
  collection: VideoCollection,
) => ({
  ...state.byId,
  [collection.id]: {
    ...state.byId[collection.id],
    ...{
      updatedAt: collection.updatedAt,
      links: collection.links,
    },
  },
});

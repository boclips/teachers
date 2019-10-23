import produce from 'immer';
import State from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection, VideoMap } from '../../../../types/VideoCollection';
import { StoreCollectionsRequest } from '../actions/storeCollectionsAction';

export const collectionsById = (collections: VideoCollection[]) =>
  collections.reduce((result, collection) => {
    result[collection.id] = collection;
    return result;
  }, {});

export const onStoreCollectionsAction = (
  state: State,
  request: StoreCollectionsRequest,
): State =>
  produce(state, draftState => {
    draftState.collections[request.key] = {
      items: request.collections.items.map(c => c.id),
      links: request.collections.links,
    };

    request.collections.items.map(
      c => (draftState.entities.collections.byId[c.id] = c),
    );

    draftState.collections.updating = false;
    draftState.collections.loading = false;
  });

export const onStoreCollectionAction = (
  state: State,
  collection?: VideoCollection,
): State => {
  if (collection == null) {
    return {
      ...state,
      collections: {
        ...state.collections,
        loading: false,
        updating: false,
        collectionIdBeingViewed: null,
      },
    };
  }

  return produce(state, draftState => {
    draftState.collections.collectionIdBeingViewed = collection.id;
    draftState.entities.collections.byId[collection.id] = collection;
    draftState.collections.loading = false;
    draftState.collections.updating = false;
  });
};

function replaceVideoMap(videoMap, video: Video) {
  if (videoMap[video.id]) {
    const output = { ...videoMap };
    output[video.id] = video;
    return output;
  }

  return videoMap;
}

export const onStoreVideoForCollectionAction = (
  state: State,
  video: Video,
): State => {
  if (!state.collections.collectionIdBeingViewed) {
    return state;
  }

  const collectionBeingViewed =
    state.entities.collections.byId[state.collections.collectionIdBeingViewed];

  if (!collectionBeingViewed || !collectionBeingViewed.videos) {
    return state;
  }

  const updateCollection = {
    ...collectionBeingViewed,
    videos: replaceVideoMap(collectionBeingViewed.videos, video),
  };

  return produce(state, draftState => {
    draftState.entities.collections.byId[
      collectionBeingViewed.id
    ] = updateCollection;
  });
};

export const onStoreVideosForCollectionAction = (
  state: State,
  request: { videos: Video[]; collection: VideoCollection },
): State => {
  const collectionDetails = addVideosToCollection(request);

  return produce(state, draftState => {
    draftState.entities.collections.byId[
      collectionDetails.id
    ] = collectionDetails;
  });
};

export const onStoreCollectionBeingViewedAction = (
  state: State,
  request: { id: string },
): State => ({
  ...state,
  collections: {
    ...state.collections,
    collectionIdBeingViewed: request.id,
  },
});

export const updateMatchingCollectionWithVideo = (
  video: Video,
  collections: Readonly<VideoCollection[]>,
): VideoCollection[] => {
  const collectionItems = [...collections];
  return collectionItems.map(c => ({
    ...c,
    videos: replaceVideoMap(c.videos, video),
  }));
};

const addVideosToCollection = (request: {
  videos: Video[];
  collection: VideoCollection;
}): VideoCollection => {
  const videos = request.collection.videos;

  if (videosAlreadyLoaded(request, videos)) {
    return request.collection;
  }

  const videoMapToUpdate: VideoMap = getVideoMapToUpdate(request);

  return {
    ...request.collection,
    videos: {
      ...videos,
      ...videoMapToUpdate,
    },
  };
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

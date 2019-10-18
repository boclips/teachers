import {
  CollectionsStateValue,
  getIndexOfCollection,
} from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection, VideoMap } from '../../../../types/VideoCollection';
import { StoreCollectionsRequest } from '../actions/storeCollectionsAction';

export const onStoreCollectionsAction = (
  state: CollectionsStateValue,
  request: StoreCollectionsRequest,
): CollectionsStateValue => {
  const normalizedCollections = request.collections.items.reduce(
    (collections, collection) => {
      collections[collection.id] = collection;
      return collections;
    },
    {},
  );

  return {
    ...state,
    collections: {
      ...state.collections,
      ...normalizedCollections,
    },
    [request.key]: request.collections,
    loading: false,
    updating: false,
  };
};

export const onStoreCollectionAction = (
  state: CollectionsStateValue,
  collection?: VideoCollection,
): CollectionsStateValue => {
  if (collection == null) {
    return {
      ...state,
      loading: false,
      updating: false,
      collectionBeingViewedIds: null,
    };
  }

  return {
    ...state,
    collectionBeingViewedIds: collection.id,
    collections: {
      ...state.collections,
      [collection.id]: collection,
    },
    loading: false,
    updating: false,
  };
};

export const onUpdateCollection = (
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

function replaceVideoMap(videoMap, video: Video) {
  if (videoMap[video.id]) {
    const output = { ...videoMap };
    output[video.id] = video;
    return output;
  }

  return videoMap;
}

export const onStoreVideoForCollectionAction = (
  state: CollectionsStateValue,
  video: Video,
): CollectionsStateValue => {
  const collectionBeingViewed =
    state.collections[state.collectionBeingViewedIds];

  if (!collectionBeingViewed || !collectionBeingViewed.videos) {
    return state;
  }

  const updateCollection = {
    ...collectionBeingViewed,
    videos: replaceVideoMap(collectionBeingViewed.videos, video),
  };

  return {
    ...state,
    collections: {
      ...state.collections,
      [collectionBeingViewed.id]: updateCollection,
    },
  };
};

export const onStoreVideosForCollectionAction = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  const collectionDetails = addVideosToCollection(request);

  return {
    ...state,
    collections: {
      ...state.collections,
      [collectionDetails.id]: collectionDetails,
    },
  };
};

export const updateMatchingCollectionWithVideos = (
  request: {
    videos: Video[];
    collection: VideoCollection;
  },
  collections: Readonly<VideoCollection[]>,
): VideoCollection[] => {
  const collectionItems = [...collections];

  const indexOfCollectionToUpdate = getIndexOfCollection(
    collectionItems.map(collection => collection.id),
    request.collection.id,
  );

  if (indexOfCollectionToUpdate < 0) {
    return collectionItems;
  }

  const updatedCollection = addVideosToCollection(request);

  collectionItems[indexOfCollectionToUpdate] = updatedCollection;

  return collectionItems;
};

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

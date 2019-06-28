import {
  CollectionsStateValue,
  getIndexOfCollection,
} from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection, VideoMap } from '../../../../types/VideoCollection';
import { StoreCollectionsRequest } from '../actions/storeCollectionsAction';
import { CollectionKey } from './../../../../types/CollectionKey';

const collectionKeys: CollectionKey[] = [
  'myCollections',
  'bookmarkedCollections',
  'publicCollections',
  'discoverCollections',
];

export const onStoreCollectionsAction = (
  state: CollectionsStateValue,
  request: StoreCollectionsRequest,
): CollectionsStateValue => {
  return {
    ...state,
    [request.key]: request.collections,
    loading: false,
    updating: false,
  };
};

export const onStoreCollectionAction = (
  state: CollectionsStateValue,
  collectionDetails: VideoCollection,
): CollectionsStateValue => {
  return {
    ...state,
    collectionBeingViewed: collectionDetails,
    loading: false,
    updating: false,
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
  state = collectionKeys.reduce<CollectionsStateValue>(
    (currentState, key) =>
      reduceStoreVideoForPageableCollections(currentState, key, video),
    state,
  );
  return reduceStoreVideoForCollectionDetails(state, video);
};

export const onStoreVideosForCollectionAction = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  state = collectionKeys.reduce<CollectionsStateValue>(
    (currentState, key) =>
      reduceStoreVideosForPageableCollections(currentState, key, request),
    state,
  );
  return reduceStoreVideosForCollectionDetails(state, request);
};

const reduceStoreVideosForPageableCollections = (
  state: CollectionsStateValue,
  key: CollectionKey,
  request: {
    videos: Video[];
    collection: VideoCollection;
  },
): CollectionsStateValue => {
  if (!state[key] || !state[key].items) {
    return state;
  }

  const collectionItems = updateMatchingCollectionWithVideos(
    request,
    state[key].items,
  );

  return {
    ...state,
    [key]: {
      ...state[key],
      items: collectionItems,
    },
  };
};

const reduceStoreVideoForPageableCollections = (
  state: CollectionsStateValue,
  key: CollectionKey,
  video: Video,
): CollectionsStateValue => {
  if (!state[key] || !state[key].items) {
    return state;
  }

  const collectionItems = updateMatchingCollectionWithVideo(
    video,
    state[key].items,
  );

  return {
    ...state,
    [key]: {
      ...state[key],
      items: collectionItems,
    },
  };
};

const reduceStoreVideosForCollectionDetails = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  if (
    !state.collectionBeingViewed ||
    state.collectionBeingViewed.id !== request.collection.id
  ) {
    return state;
  }

  const collectionDetails = addVideosToCollection(request);

  return {
    ...state,
    collectionBeingViewed: collectionDetails,
  };
};

const reduceStoreVideoForCollectionDetails = (
  state: CollectionsStateValue,
  video: Video,
): CollectionsStateValue => {
  if (!state.collectionBeingViewed || !state.collectionBeingViewed.videos) {
    return state;
  }
  return {
    ...state,
    collectionBeingViewed: {
      ...state.collectionBeingViewed,
      videos: replaceVideoMap(state.collectionBeingViewed.videos, video),
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
    collectionItems,
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

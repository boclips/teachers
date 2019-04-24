import {
  CollectionsStateValue,
  getIndexOfCollection,
} from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection, VideoMap } from '../../../../types/VideoCollection';
import { StoreCollectionsRequest } from '../actions/storeCollectionsAction';
import { ReadOnlyCollectionKey } from './../../../../types/CollectionKey';

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

export const onStoreVideosForCollectionAction = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  state = reduceStoreVideoForMyCollections(state, request);
  state = reduceStoreVideoForPageableCollections(
    state,
    'bookmarkedCollections',
    request,
  );
  state = reduceStoreVideoForPageableCollections(
    state,
    'publicCollections',
    request,
  );
  return reduceStoreVideoForCollectionDetails(state, request);
};

const reduceStoreVideoForMyCollections = (
  state: CollectionsStateValue,
  request: { videos: Video[]; collection: VideoCollection },
): CollectionsStateValue => {
  const myCollections = updateMatchingCollectionWithVideos(
    request,
    state.myCollections,
  );

  return { ...state, myCollections };
};

const reduceStoreVideoForPageableCollections = (
  state: CollectionsStateValue,
  key: ReadOnlyCollectionKey,
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

const reduceStoreVideoForCollectionDetails = (
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

const updateMatchingCollectionWithVideos = (
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

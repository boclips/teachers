import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import {
  CollectionsStateValue,
  getIndexOfCollection,
  Pageable,
} from '../../../../types/State';
import { Video, VideoId } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addToCollectionAction } from '../actions/addToCollectionAction';
import { addToCollectionResultAction } from '../actions/addToCollectionResultAction';
import { appendBookmarkedCollectionsAction } from '../actions/appendBookmarkedCollectionsAction';
import { appendPublicCollectionsAction } from '../actions/appendPublicCollectionsAction';
import { createCollectionAction } from '../actions/createCollectionAction';
import { createCollectionResultAction } from '../actions/createCollectionResultAction';
import { editCollectionAction } from '../actions/editCollectionAction';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { fetchCollectionsAction } from '../actions/fetchCollectionsAction';
import { fetchPublicCollectionsAction } from '../actions/fetchPublicCollectionsAction';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { onCollectionEditedAction } from '../actions/onCollectionEditedAction';
import { onCollectionRemovedAction } from '../actions/onCollectionRemovedAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import { removeFromCollectionAction } from '../actions/removeFromCollectionAction';
import { removeFromCollectionResultAction } from '../actions/removeFromCollectionResultAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';
import { VideoMap } from './../../../../types/VideoCollection';
import {
  onStoreCollectionAction,
  onStoreCollectionsAction,
  onStoreVideosForCollectionAction,
} from './storeCollectionsReducer';

const initialState: CollectionsStateValue = {
  myCollections: [],
  publicCollections: undefined,
  bookmarkedCollections: undefined,
  publicCollectionDetails: undefined,
  loading: true,
  updating: false,
};

const onAppendPublicCollectionsAction = (
  state: CollectionsStateValue,
  publicCollections: Pageable<VideoCollection>,
): CollectionsStateValue => {
  publicCollections = {
    ...state.publicCollections,
    items: [...state.publicCollections.items, ...publicCollections.items],
    links: publicCollections.links,
  };
  return {
    ...state,
    publicCollections,
    loading: false,
    updating: false,
  };
};

const onAppendBookmarkedCollectionsAction = (
  state: CollectionsStateValue,
  bookmarkedCollections: Pageable<VideoCollection>,
): CollectionsStateValue => {
  bookmarkedCollections = {
    ...state.bookmarkedCollections,
    items: [
      ...state.bookmarkedCollections.items,
      ...bookmarkedCollections.items,
    ],
    links: bookmarkedCollections.links,
  };
  return {
    ...state,
    bookmarkedCollections,
    loading: false,
    updating: false,
  };
};

const loadingCollections = (
  state: CollectionsStateValue,
): CollectionsStateValue => {
  return {
    ...state,
    loading: true,
  };
};

const onAddVideoAction = (
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

const onRemoveVideoAction = (
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

const collectionUpdating = (
  state: CollectionsStateValue,
): CollectionsStateValue => {
  return { ...state, updating: true };
};

const onCollectionRemoved = (
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

const removeUnbookmarkedCollection = (
  state: CollectionsStateValue,
  unbookmarkedCollection: VideoCollection,
): CollectionsStateValue => {
  return {
    ...state,
    bookmarkedCollections: {
      ...state.bookmarkedCollections,
      items:
        state.bookmarkedCollections &&
        state.bookmarkedCollections.items.filter(
          collection => collection.id !== unbookmarkedCollection.id,
        ),
    },
  };
};

const addBookmarkedCollection = (
  state: CollectionsStateValue,
  bookmarkedCollection: VideoCollection,
): CollectionsStateValue => {
  return {
    ...state,
    bookmarkedCollections: state.bookmarkedCollections && {
      ...state.bookmarkedCollections,
      items: [
        ...(state.bookmarkedCollections.items || []), // TODO: use default?
        bookmarkedCollection,
      ],
    },
  };
};

const updatePublicCollection = (
  state: CollectionsStateValue,
  updatedCollection: VideoCollection,
): CollectionsStateValue => {
  if (!state.publicCollections) {
    return state;
  }

  const indexOfCollection = getIndexOfCollection(
    state.publicCollections && state.publicCollections.items,
    updatedCollection.id,
  );

  const publicCollections = [...state.publicCollections.items];

  if (indexOfCollection > -1) {
    publicCollections[indexOfCollection] = {
      ...updatedCollection,
      videos: publicCollections[indexOfCollection].videos,
    };
  }

  return {
    ...state,
    publicCollections: { ...state.publicCollections, items: publicCollections },
  };
};

const onCollectionUnbookmarked = (
  state: CollectionsStateValue,
  updatedCollection: VideoCollection,
): CollectionsStateValue => {
  state = removeUnbookmarkedCollection(state, updatedCollection);
  state = updatePublicCollection(state, updatedCollection);
  return state;
};

const onCollectionBookmarked = (
  state: CollectionsStateValue,
  updatedCollection: VideoCollection,
): CollectionsStateValue => {
  state = addBookmarkedCollection(state, updatedCollection);
  state = updatePublicCollection(state, updatedCollection);
  return state;
};

const onCollectionEdited = (
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

export const collectionsReducer: Reducer<CollectionsStateValue> = createReducer(
  initialState,
  actionHandler(appendPublicCollectionsAction, onAppendPublicCollectionsAction),
  actionHandler(addToCollectionAction, onAddVideoAction),
  actionHandler(removeFromCollectionAction, onRemoveVideoAction),
  actionHandler(createCollectionAction, collectionUpdating),
  actionHandler(editCollectionAction, collectionUpdating),
  actionHandler(fetchCollectionAction, loadingCollections),
  actionHandler(fetchCollectionsAction, loadingCollections),
  actionHandler(fetchPublicCollectionsAction, loadingCollections),

  actionHandler(removeFromCollectionResultAction, collectionUpdated),
  actionHandler(addToCollectionResultAction, collectionUpdated),
  actionHandler(createCollectionResultAction, collectionUpdated),
  actionHandler(onCollectionRemovedAction, onCollectionRemoved),
  actionHandler(onCollectionEditedAction, onCollectionEdited),
  actionHandler(
    appendBookmarkedCollectionsAction,
    onAppendBookmarkedCollectionsAction,
  ),
  actionHandler(onCollectionUnbookmarkedAction, onCollectionUnbookmarked),
  actionHandler(onCollectionBookmarkedAction, onCollectionBookmarked),
  actionHandler(storeCollectionsAction, onStoreCollectionsAction),
  actionHandler(storeCollectionAction, onStoreCollectionAction),
  actionHandler(
    storeVideoForCollectionAction,
    onStoreVideosForCollectionAction,
  ),
);

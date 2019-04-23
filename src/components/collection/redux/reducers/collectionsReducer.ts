import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import {
  CollectionsStateValue,
  getIndexOfCollection,
} from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addVideoToMyCollectionAction } from '../actions/addToMyCollectionAction';
import { appendBookmarkedCollectionsAction } from '../actions/appendBookmarkedCollectionsAction';
import { appendPublicCollectionsAction } from '../actions/appendPublicCollectionsAction';
import { createCollectionAction } from '../actions/createCollectionAction';
import { editCollectionAction } from '../actions/editCollectionAction';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { fetchMyCollectionsAction } from '../actions/fetchMyCollectionsAction';
import { fetchPublicCollectionsAction } from '../actions/fetchPublicCollectionsAction';
import { onAddToCollectionAction } from '../actions/onAddToCollectionAction';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import { onCreateCollectionAction } from '../actions/onCreateCollectionAction';
import { onMyCollectionEditedAction } from '../actions/onMyCollectionEditedAction';
import { onMyCollectionRemovedAction } from '../actions/onMyCollectionRemovedAction';
import { onRemoveFromCollectionAction } from '../actions/onRemoveFromCollectionAction';
import { removeVideoFromMyCollectionAction } from '../actions/removeFromMyCollectionAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';
import { AppendCollectionRequest } from './../actions/appendPublicCollectionsAction';
import {
  onAddVideoToMyCollectionAction,
  onMyCollectionEdited,
  onMyCollectionRemoved,
  onRemoveVideoFromMyCollectionAction,
} from './myCollectionsReducer';
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

const onAppendPageableCollectionsAction = (
  state: CollectionsStateValue,
  request: AppendCollectionRequest,
): CollectionsStateValue => {
  const collectionKey = request.key;

  const collection = {
    ...state[collectionKey],
    items: [...state[collectionKey].items, ...request.collections.items],
    links: request.collections.links,
  };

  return {
    ...state,
    [collectionKey]: collection,
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

export const collectionsReducer: Reducer<CollectionsStateValue> = createReducer(
  initialState,
  actionHandler(addVideoToMyCollectionAction, onAddVideoToMyCollectionAction),
  actionHandler(
    removeVideoFromMyCollectionAction,
    onRemoveVideoFromMyCollectionAction,
  ),
  actionHandler(onMyCollectionRemovedAction, onMyCollectionRemoved),
  actionHandler(onMyCollectionEditedAction, onMyCollectionEdited),
  actionHandler(createCollectionAction, collectionUpdating),
  actionHandler(editCollectionAction, collectionUpdating),
  actionHandler(fetchCollectionAction, loadingCollections),
  actionHandler(fetchMyCollectionsAction, loadingCollections),
  actionHandler(fetchPublicCollectionsAction, loadingCollections),
  actionHandler(onRemoveFromCollectionAction, collectionUpdated),
  actionHandler(onAddToCollectionAction, collectionUpdated),
  actionHandler(onCreateCollectionAction, collectionUpdated),
  actionHandler(
    appendPublicCollectionsAction,
    onAppendPageableCollectionsAction,
  ),
  actionHandler(
    appendBookmarkedCollectionsAction,
    onAppendPageableCollectionsAction,
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

import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { CollectionsStateValue } from '../../../../types/State';
import { storeVideoForCollectionAction } from '../../../video/redux/actions/storeVideoForCollectionAction';
import { addVideoToMyCollectionAction } from '../actions/addToMyCollectionAction';
import {
  appendBookmarkedCollectionsAction,
  appendDiscoverCollectionsAction,
  appendMyCollectionsAction,
  appendPublicCollectionsAction,
} from '../actions/appendReadOnlyCollectionsAction';
import { createCollectionAction } from '../actions/createCollectionAction';
import { editCollectionAction } from '../actions/editCollectionAction';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { fetchMyCollectionsAction } from '../actions/fetchMyCollectionsAction';
import { fetchPageableCollectionsAction } from '../actions/fetchPageableCollectionsAction';
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
import { storeVideosForCollectionAction } from '../actions/storeVideosForCollectionAction';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';
import {
  onCollectionBookmarked,
  onCollectionUnbookmarked,
} from './bookmarkCollectionsReducer';
import {
  onAddVideoToMyCollectionAction,
  onMyCollectionEdited,
  onMyCollectionRemoved,
  onRemoveVideoFromMyCollectionAction,
} from './myCollectionsReducer';
import { onAppendPageableCollectionsAction } from './pageableCollectionsReducer';
import {
  onStoreCollectionAction,
  onStoreCollectionsAction,
  onStoreVideoForCollectionAction,
  onStoreVideosForCollectionAction,
} from './storeCollectionsReducer';

const initialState: CollectionsStateValue = {
  byId: undefined,
  myCollections: undefined,
  publicCollections: undefined,
  discoverCollections: undefined,
  bookmarkedCollections: undefined,
  collectionIdBeingViewed: undefined,
  loading: true,
  updating: false,
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
  actionHandler(fetchPageableCollectionsAction, loadingCollections),
  actionHandler(onRemoveFromCollectionAction, collectionUpdated),
  actionHandler(onAddToCollectionAction, collectionUpdated),
  actionHandler(onCreateCollectionAction, collectionUpdated),
  actionHandler(
    appendDiscoverCollectionsAction,
    onAppendPageableCollectionsAction,
  ),
  actionHandler(
    appendPublicCollectionsAction,
    onAppendPageableCollectionsAction,
  ),
  actionHandler(
    appendBookmarkedCollectionsAction,
    onAppendPageableCollectionsAction,
  ),
  actionHandler(appendMyCollectionsAction, onAppendPageableCollectionsAction),
  actionHandler(onCollectionUnbookmarkedAction, onCollectionUnbookmarked),
  actionHandler(onCollectionBookmarkedAction, onCollectionBookmarked),
  actionHandler(storeCollectionsAction, onStoreCollectionsAction),
  actionHandler(storeCollectionAction, onStoreCollectionAction),
  actionHandler(storeVideoForCollectionAction, onStoreVideoForCollectionAction),
  actionHandler(
    storeVideosForCollectionAction,
    onStoreVideosForCollectionAction,
  ),
);

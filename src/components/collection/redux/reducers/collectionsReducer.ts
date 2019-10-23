import {
  actionHandler,
  ActionHandler,
} from '../../../../app/redux/createReducer';
import State, { CollectionsStateValue } from '../../../../types/State';
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
import { storeCollectionBeingViewedAction } from '../actions/storeCollectionBeingViewedAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
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
  onStoreCollectionBeingViewedAction,
  onStoreCollectionsAction,
} from './storeCollectionsReducer';

export const initialCollectionsState: CollectionsStateValue = {
  myCollections: undefined,
  publicCollections: undefined,
  discoverCollections: undefined,
  bookmarkedCollections: undefined,
  collectionIdBeingViewed: undefined,
  loading: true,
  updating: false,
};

const loadingCollections = (state: State): State => ({
  ...state,
  collections: {
    ...state.collections,
    loading: true,
  },
});

const collectionUpdated = (state: State, _: UpdateCollectionResult): State => ({
  ...state,
  collections: {
    ...state.collections,
    updating: false,
  },
});

const collectionUpdating = (state: State): State => ({
  ...state,
  collections: {
    ...state.collections,
    updating: true,
  },
});

export const collectionHandlers: Array<ActionHandler<State, any>> = [
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
  actionHandler(
    storeCollectionBeingViewedAction,
    onStoreCollectionBeingViewedAction,
  ),
];

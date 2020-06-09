import { clearDiscoverCollectionsAction } from 'src/components/collection/redux/actions/clearDiscoverCollectionsAction';
import {
  actionHandler,
  ActionHandler,
} from '../../../../app/redux/createReducer';
import State, { CollectionsStateValue } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addVideoToMyCollectionAction } from '../actions/addToMyCollectionAction';
import {
  appendBookmarkedCollectionsAction,
  appendDiscoverCollectionsAction,
  appendMyCollectionsAction,
} from '../actions/appendReadOnlyCollectionsAction';
import { createCollectionAction } from '../actions/createCollectionAction';
import { editCollectionAction } from '../actions/editCollectionAction';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { fetchCollectionsAction } from '../actions/fetchCollectionsAction';
import { fetchPageableCollectionsAction } from '../actions/fetchPageableCollectionsAction';
import { onAddToCollectionAction } from '../actions/onAddToCollectionAction';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import { onCreateCollectionAction } from '../actions/onCreateCollectionAction';
import { onCollectionEditedAction } from '../actions/onCollectionEditedAction';
import { onMyCollectionRemovedAction } from '../actions/onMyCollectionRemovedAction';
import { onRemoveFromCollectionAction } from '../actions/onRemoveFromCollectionAction';
import { removeVideoFromMyCollectionAction } from '../actions/removeFromMyCollectionAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { storeCollectionBeingViewedAction } from '../actions/storeCollectionBeingViewedAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';
import {
  onAddVideoToMyCollectionAction,
  onClearDiscoverCollections,
  onCollectionBookmarked,
  onCollectionEdited,
  onCollectionUnbookmarked,
  onMyCollectionRemoved,
  onRemoveVideoFromMyCollectionAction,
} from './collectionsReducer';
import {
  onAppendPageableCollectionsAction,
  onStoreCollectionAction,
  onStoreCollectionBeingViewedAction,
  onStoreCollectionsAction,
} from './storeCollectionsReducer';

export const initialCollectionsState: CollectionsStateValue = {
  myCollections: undefined,
  discoverCollections: undefined,
  promotedCollections: undefined,
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

export const collectionUpdated = (
  state: State,
  update: UpdateCollectionResult,
): State => {
  const orderedResources = state.collections.myResources
    ? [...state.collections.myResources.items].sort((a: string, _: string) =>
        a === update.collection.id ? -1 : 1,
      )
    : undefined;

  const myResourcesOrdered = {
    ...state.collections.myResources,
    items: orderedResources,
  };

  return {
    ...state,
    collections: {
      ...state.collections,
      myResources: myResourcesOrdered,
      updating: false,
    },
  };
};

const collectionUpdating = (state: State): State => ({
  ...state,
  collections: {
    ...state.collections,
    updating: true,
  },
});

export const collectionHandlers: Array<ActionHandler<State, any>> = [
  actionHandler(addVideoToMyCollectionAction, onAddVideoToMyCollectionAction),
  actionHandler(clearDiscoverCollectionsAction, onClearDiscoverCollections),
  actionHandler(
    removeVideoFromMyCollectionAction,
    onRemoveVideoFromMyCollectionAction,
  ),
  actionHandler(onMyCollectionRemovedAction, onMyCollectionRemoved),
  actionHandler(onCollectionEditedAction, onCollectionEdited),
  actionHandler(createCollectionAction, collectionUpdating),
  actionHandler(editCollectionAction, collectionUpdating),
  actionHandler(fetchCollectionAction, loadingCollections),
  actionHandler(fetchCollectionsAction, loadingCollections),
  actionHandler(fetchPageableCollectionsAction, loadingCollections),
  actionHandler(onRemoveFromCollectionAction, collectionUpdated),
  actionHandler(onAddToCollectionAction, collectionUpdated),
  actionHandler(onCreateCollectionAction, collectionUpdated),
  actionHandler(
    appendDiscoverCollectionsAction,
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

export const getCollectionsByIds = (
  state: State,
  collectionIds: string[],
): VideoCollection[] =>
  collectionIds.map((id) => state.entities.collections.byId[id]);

export const getCollectionById = (
  state: State,
  collectionId: string,
): VideoCollection => {
  if (state.collections.collectionIdBeingViewed === null) {
    return null;
  }

  return state.entities.collections.byId[collectionId];
};

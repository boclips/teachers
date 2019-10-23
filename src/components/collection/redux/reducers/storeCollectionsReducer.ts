import produce from 'immer';
import State from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';
import { StoreCollectionsRequest } from '../actions/storeCollectionsAction';

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

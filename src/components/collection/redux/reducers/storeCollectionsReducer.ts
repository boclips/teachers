import produce from 'immer';
import State from 'src/types/State';
import { VideoCollection } from 'src/types/VideoCollection';
import { AppendCollectionRequest } from '../actions/appendReadOnlyCollectionsAction';
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

export const onAppendPageableCollectionsAction = (
  state: State,
  request: AppendCollectionRequest,
): State => {
  const collectionKey = request.key;

  const collectionRequestItems = request.collections.items;

  const collectionPage = {
    ...state.collections[collectionKey],
    items: [
      ...state.collections[collectionKey].items,
      ...collectionRequestItems.map(collection => collection.id),
    ],
    links: request.collections.links,
  };

  return produce(state, draftState => {
    draftState.collections[collectionKey] = collectionPage;
    request.collections.items.map(
      c => (draftState.entities.collections.byId[c.id] = c),
    );

    draftState.collections.updating = false;
    draftState.collections.loading = false;
  });
};

import { produce } from 'immer';
import State from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onCollectionUnbookmarked = (
  state: State,
  updatedCollection: VideoCollection,
): State => {
  state = removeUnbookmarkedCollection(state, updatedCollection);
  return state;
};

export const onCollectionBookmarked = (
  state: State,
  updatedCollection: VideoCollection,
): State => {
  state = addBookmarkedCollection(state, updatedCollection);
  return state;
};

const removeUnbookmarkedCollection = (
  state: State,
  unbookmarkedCollection: VideoCollection,
): State =>
  produce(state, draftState => {
    const collections = draftState.collections.bookmarkedCollections.items;
    draftState.entities.collections.byId = updateCollections(
      state.entities.collections,
      unbookmarkedCollection,
    );
    collections.splice(
      collections.findIndex(id => id === unbookmarkedCollection.id),
      1,
    );
  });

const addBookmarkedCollection = (
  state: State,
  bookmarkedCollection: VideoCollection,
): State =>
  produce(state, draftState => {
    draftState.entities.collections.byId = updateCollections(
      state.entities.collections,
      bookmarkedCollection,
    );
    draftState.collections.bookmarkedCollections.items.push(
      bookmarkedCollection.id,
    );
  });

const updateCollections = (
  state: { byId: { [key: string]: VideoCollection } }, // TODO type this with a collectionsMap
  collection: VideoCollection,
) => ({
  ...state.byId,
  [collection.id]: {
    ...state.byId[collection.id],
    ...{
      updatedAt: collection.updatedAt,
      links: collection.links,
    },
  },
});

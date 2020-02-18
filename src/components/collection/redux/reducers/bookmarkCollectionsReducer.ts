import { produce } from 'immer';
import State, { CollectionMap } from 'src/types/State';
import { VideoCollection } from 'src/types/VideoCollection';

export const onCollectionUnbookmarked = (
  state: State,
  unbookmarkedCollection: VideoCollection,
): State =>
  produce(state, draftState => {
    draftState.entities.collections.byId = updateCollections(
      state.entities.collections,
      unbookmarkedCollection,
    );

    const bookmarkedCollections = draftState.collections.bookmarkedCollections;
    if (bookmarkedCollections) {
      const collections = bookmarkedCollections.items || [];
      collections.splice(
        collections.findIndex(id => id === unbookmarkedCollection.id),
        1,
      );
    }
  });

export const onCollectionBookmarked = (
  state: State,
  bookmarkedCollection: VideoCollection,
): State =>
  produce(state, draftState => {
    draftState.entities.collections.byId = updateCollections(
      state.entities.collections,
      bookmarkedCollection,
    );

    const bookmarkedCollections = draftState.collections.bookmarkedCollections;
    if (bookmarkedCollections) {
      bookmarkedCollections.items = bookmarkedCollections.items || [];
      bookmarkedCollections.items.push(bookmarkedCollection.id);
    }
  });

const updateCollections = (
  state: { byId: CollectionMap },
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

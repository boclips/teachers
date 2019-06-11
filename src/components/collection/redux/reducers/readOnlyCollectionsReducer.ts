import {
  CollectionsStateValue,
  getIndexOfCollection,
} from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onCollectionUnbookmarked = (
  state: CollectionsStateValue,
  updatedCollection: VideoCollection,
): CollectionsStateValue => {
  state = removeUnbookmarkedCollection(state, updatedCollection);
  state = updateCachedCollections(state, updatedCollection);
  return state;
};

export const onCollectionBookmarked = (
  state: CollectionsStateValue,
  updatedCollection: VideoCollection,
): CollectionsStateValue => {
  state = addBookmarkedCollection(state, updatedCollection);
  state = updateCachedCollections(state, updatedCollection);
  return state;
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

const updateCachedCollections = (
  state: CollectionsStateValue,
  updatedCollection: VideoCollection,
): CollectionsStateValue => {
  let collectionBeingViewed = state.collectionBeingViewed;
  if (
    collectionBeingViewed &&
    collectionBeingViewed.id === updatedCollection.id
  ) {
    collectionBeingViewed = buildUpdatedCollection(
      updatedCollection,
      collectionBeingViewed,
    );
  }

  const publicCollections = updateCache(state.publicCollections);
  const discoverCollections = updateCache(state.discoverCollections);

  return {
    ...state,
    publicCollections,
    discoverCollections,
    collectionBeingViewed,
  };

  function updateCache(collections) {
    if (collections) {
      const indexOfCollection = getIndexOfCollection(
        collections && collections.items,
        updatedCollection.id,
      );

      const collectionsItems = [...collections.items];

      if (indexOfCollection > -1) {
        collectionsItems[indexOfCollection] = buildUpdatedCollection(
          updatedCollection,
          collectionsItems[indexOfCollection],
        );
      }

      return {
        ...collections,
        items: collectionsItems,
      };
    }
  }

  function buildUpdatedCollection(newCollection, originalCollection) {
    return {
      ...newCollection,
      videos: originalCollection.videos,
    };
  }
};

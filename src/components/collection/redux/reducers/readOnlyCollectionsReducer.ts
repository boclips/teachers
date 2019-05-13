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
  state = updatePublicCollection(state, updatedCollection);
  return state;
};

export const onCollectionBookmarked = (
  state: CollectionsStateValue,
  updatedCollection: VideoCollection,
): CollectionsStateValue => {
  state = addBookmarkedCollection(state, updatedCollection);
  state = updatePublicCollection(state, updatedCollection);
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

const updatePublicCollection = (
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

  let publicCollections = state.publicCollections;
  if (state.publicCollections) {
    const indexOfCollection = getIndexOfCollection(
      state.publicCollections && state.publicCollections.items,
      updatedCollection.id,
    );

    const publicCollectionsItems = [...state.publicCollections.items];

    if (indexOfCollection > -1) {
      publicCollectionsItems[indexOfCollection] = buildUpdatedCollection(
        updatedCollection,
        publicCollectionsItems[indexOfCollection],
      );
    }

    publicCollections = {
      ...state.publicCollections,
      items: publicCollectionsItems,
    };
  }

  return {
    ...state,
    publicCollections,
    collectionBeingViewed,
  };

  function buildUpdatedCollection(newCollection, originalCollection) {
    return {
      ...newCollection,
      videos: originalCollection.videos,
    };
  }
};

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

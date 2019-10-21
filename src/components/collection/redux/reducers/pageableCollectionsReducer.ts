import { CollectionsStateValue } from '../../../../types/State';

import { AppendCollectionRequest } from '../actions/appendReadOnlyCollectionsAction';

export const onAppendPageableCollectionsAction = (
  state: CollectionsStateValue,
  request: AppendCollectionRequest,
): CollectionsStateValue => {
  const collectionKey = request.key;

  const collectionRequestItems = request.collections.items;

  const collectionPage = {
    ...state[collectionKey],
    items: [
      ...state[collectionKey].items,
      ...collectionRequestItems.map(collection => collection.id),
    ],
    links: request.collections.links,
  };

  const collections = request.collections.items.reduce(
    (normalizedCollections, collection) => {
      normalizedCollections[collection.id] = collection;
      return normalizedCollections;
    },
    {},
  );

  return {
    ...state,
    [collectionKey]: collectionPage,
    byId: {
      ...state.byId,
      ...collections,
    },
    loading: false,
    updating: false,
  };
};

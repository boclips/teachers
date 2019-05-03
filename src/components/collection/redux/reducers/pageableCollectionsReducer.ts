import { CollectionsStateValue } from '../../../../types/State';

import { AppendCollectionRequest } from '../actions/appendReadOnlyCollectionsAction';

export const onAppendPageableCollectionsAction = (
  state: CollectionsStateValue,
  request: AppendCollectionRequest,
): CollectionsStateValue => {
  const collectionKey = request.key;

  const collection = {
    ...state[collectionKey],
    items: [...state[collectionKey].items, ...request.collections.items],
    links: request.collections.links,
  };

  return {
    ...state,
    [collectionKey]: collection,
    loading: false,
    updating: false,
  };
};

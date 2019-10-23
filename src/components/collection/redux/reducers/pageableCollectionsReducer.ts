import State from '../../../../types/State';

import produce from 'immer';
import { AppendCollectionRequest } from '../actions/appendReadOnlyCollectionsAction';

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

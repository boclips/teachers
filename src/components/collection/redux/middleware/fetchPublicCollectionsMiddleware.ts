import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import {
  fetchNextCollectionsPage,
  fetchPublicCollections,
} from '../../../../services/collections/fetchCollections';
import { CollectionState, LinksState } from '../../../../types/State';
import { appendPublicCollectionsAction } from '../actions/appendPublicCollectionsAction';
import { fetchNextPublicCollectionsAction } from '../actions/fetchNextPublicCollectionsAction';
import { fetchPublicCollectionsAction } from '../actions/fetchPublicCollectionsAction';
import { storePublicCollectionsAction } from '../actions/storePublicCollectionsAction';

export function onFetchCollections(store: MiddlewareAPI<any, LinksState>) {
  const links = store.getState().links;
  fetchPublicCollections(links)
    .then(collections => {
      store.dispatch(storePublicCollectionsAction(collections));
    })
    .catch(console.error);
}

export function onFetchNextCollections(
  store: MiddlewareAPI<any, CollectionState>,
) {
  const publicCollections = store.getState().collections.publicCollections;
  fetchNextCollectionsPage(publicCollections)
    .then(collections => {
      store.dispatch(appendPublicCollectionsAction(collections));
    })
    .catch(console.error);
}

export default [
  sideEffect(fetchPublicCollectionsAction, onFetchCollections),
  sideEffect(fetchNextPublicCollectionsAction, onFetchNextCollections),
];

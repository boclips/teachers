import { MiddlewareAPI } from 'redux';
import { clearDiscoverCollectionsAction } from 'src/components/collection/redux/actions/clearDiscoverCollectionsAction';
import { sideEffect } from '../../../../app/redux/actions';
import {
  fetchNextCollectionsPage,
  fetchPageableCollections,
} from '../../../../services/collections/fetchCollections';
import { ReadOnlyCollectionKey } from '../../../../types/CollectionKey';
import { CollectionState, LinksState } from '../../../../types/State';
import { appendPageableCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';
import { fetchNextPageableCollectionsAction } from '../actions/fetchNextPageableCollectionsAction';
import {
  FetchPageableCollectionRequest,
  fetchPageableCollectionsAction,
} from '../actions/fetchPageableCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { Links } from '../../../../types/Links';

export function onFetchCollections(
  store: MiddlewareAPI<any, LinksState>,
  request: FetchPageableCollectionRequest,
) {
  const links: Links = store.getState().links.entries;
  if (request.key === 'discoverCollections') {
    store.dispatch(clearDiscoverCollectionsAction());
  }

  fetchPageableCollections(links, request)
    .then((collections) => {
      store.dispatch(
        storeCollectionsAction({
          key: request.key,
          request: request.request,
          collections,
        }),
      );
    })
    .catch(console.error);
}

export function onFetchNextCollections(
  store: MiddlewareAPI<any, CollectionState>,
  request: ReadOnlyCollectionKey,
) {
  const collectionsToFetch = store.getState().collections[request];
  fetchNextCollectionsPage(collectionsToFetch)
    .then((collections) => {
      store.dispatch(
        appendPageableCollectionsAction({
          collections,
          key: request,
        }),
      );
    })
    .catch(console.error);
}

export default [
  sideEffect(fetchPageableCollectionsAction, onFetchCollections),
  sideEffect(fetchNextPageableCollectionsAction, onFetchNextCollections),
];

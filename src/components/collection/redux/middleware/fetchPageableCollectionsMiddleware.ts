import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import {
  fetchNextCollectionsPage,
  fetchPageableCollections,
} from 'src/services/collections/fetchCollections';
import { ReadOnlyCollectionKey } from 'src/types/CollectionKey';
import { CollectionState, LinksState } from 'src/types/State';
import { Links } from 'src/types/Links';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import {
  FetchPageableCollectionRequest,
  fetchPageableCollectionsAction,
} from '../actions/fetchPageableCollectionsAction';
import { fetchNextPageableCollectionsAction } from '../actions/fetchNextPageableCollectionsAction';
import { appendPageableCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';

export function onFetchCollections(
  store: MiddlewareAPI<any, LinksState>,
  request: FetchPageableCollectionRequest,
) {
  const links: Links = store.getState().links.entries;
  fetchPageableCollections(links, request)
    .then(collections => {
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
    .then(collections => {
      AnalyticsFactory.externalAnalytics().trackMoreCollectionsLoaded(request);
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

import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import {
  fetchNextCollectionsPage,
  fetchPageableCollections,
} from '../../../../services/collections/fetchCollections';
import { ReadOnlyCollectionKey } from '../../../../types/CollectionKey';
import { CollectionKey } from '../../../../types/CollectionKey';
import { CollectionState, LinksState } from '../../../../types/State';
import { appedPageableCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';
import { fetchNextPageableCollectionsAction } from '../actions/fetchNextPageableCollectionsAction';
import { fetchPageableCollectionsAction } from '../actions/fetchPageableCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';

export function onFetchCollections(
  store: MiddlewareAPI<any, LinksState>,
  request: CollectionKey,
) {
  const links = store.getState().links;
  fetchPageableCollections(links, request)
    .then(collections => {
      store.dispatch(
        storeCollectionsAction({
          key: request,
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
      AnalyticsFactory.getInstance().trackMoreCollectionsLoaded(request);
      store.dispatch(
        appedPageableCollectionsAction({
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

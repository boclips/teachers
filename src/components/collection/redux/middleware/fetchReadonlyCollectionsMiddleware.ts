import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import {
  fetchNextCollectionsPage,
  fetchReadOnlyCollections,
} from '../../../../services/collections/fetchCollections';
import { ReadOnlyCollectionKey } from '../../../../types/CollectionKey';
import { CollectionState, LinksState } from '../../../../types/State';
import { appendReadOnlyCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';
import { fetchNextPageableCollectionsAction } from '../actions/fetchNextPageableCollectionsAction';
import { fetchReadOnlyCollectionsAction } from '../actions/fetchReadOnlyCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';

export function onFetchCollections(
  store: MiddlewareAPI<any, LinksState>,
  request: ReadOnlyCollectionKey,
) {
  const links = store.getState().links;
  fetchReadOnlyCollections(links, request)
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
  const publicCollections = store.getState().collections[request];
  fetchNextCollectionsPage(publicCollections)
    .then(collections => {
      AnalyticsFactory.getInstance().trackMoreCollectionsLoaded(request);
      store.dispatch(
        appendReadOnlyCollectionsAction({
          collections,
          key: request,
        }),
      );
    })
    .catch(console.error);
}

export default [
  sideEffect(fetchReadOnlyCollectionsAction, onFetchCollections),
  sideEffect(fetchNextPageableCollectionsAction, onFetchNextCollections),
];

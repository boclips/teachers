import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import {
  fetchNextCollectionsPage,
  fetchReadOnlyCollections,
} from '../../../../services/collections/fetchCollections';
import { ReadOnlyCollectionKey } from '../../../../types/CollectionKey';
import { CollectionState, LinksState } from '../../../../types/State';
import { appendReadOnlyCollectionsAction } from '../actions/appendReadOnlyCollectionsAction';
import { fetchBookmarkedCollectionsAction } from '../actions/fetchBookmarkedCollectionsAction';
import { fetchNextBookmarkedCollectionsAction } from '../actions/fetchNextBookmarkedCollectionsAction';
import { fetchNextPublicCollectionsAction } from '../actions/fetchNextPublicCollectionsAction';
import { fetchPublicCollectionsAction } from '../actions/fetchPublicCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';

const onFetchPublicCollections = (store: MiddlewareAPI<any, LinksState>) =>
  onFetchCollections(store, 'publicCollections');

const onFetchBookmarkCollections = (store: MiddlewareAPI<any, LinksState>) =>
  onFetchCollections(store, 'bookmarkedCollections');

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

const onFetchNextPublicCollection = (
  store: MiddlewareAPI<any, CollectionState>,
) => onFetchNextCollections(store, 'publicCollections');

const onFetchNextBookmarkedCollection = (
  store: MiddlewareAPI<any, CollectionState>,
) => onFetchNextCollections(store, 'bookmarkedCollections');

export function onFetchNextCollections(
  store: MiddlewareAPI<any, CollectionState>,
  request: ReadOnlyCollectionKey,
) {
  const publicCollections = store.getState().collections[request];
  fetchNextCollectionsPage(publicCollections)
    .then(collections => {
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
  sideEffect(fetchPublicCollectionsAction, onFetchPublicCollections),
  sideEffect(fetchBookmarkedCollectionsAction, onFetchBookmarkCollections),
  sideEffect(fetchNextPublicCollectionsAction, onFetchNextPublicCollection),
  sideEffect(
    fetchNextBookmarkedCollectionsAction,
    onFetchNextBookmarkedCollection,
  ),
];

import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import {
  fetchNextCollectionsPage,
  fetchPageableCollections,
} from '../../../../services/collections/fetchCollections';
import { CollectionState, LinksState } from '../../../../types/State';
import { appendPageableCollectionsAction } from '../actions/appendPageableCollectionsAction';
import { fetchBookmarkedCollectionsAction } from '../actions/fetchBookmarkedCollectionsAction';
import { fetchNextBookmarkedCollectionsAction } from '../actions/fetchNextBookmarkedCollectionsAction';
import { fetchNextPublicCollectionsAction } from '../actions/fetchNextPublicCollectionsAction';
import { fetchPublicCollectionsAction } from '../actions/fetchPublicCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { PageableCollectionKey } from './../../../../types/CollectionKey';

const onFetchPublicCollections = (store: MiddlewareAPI<any, LinksState>) =>
  onFetchCollections(store, 'publicCollections');

const onFetchBookmarkCollections = (store: MiddlewareAPI<any, LinksState>) =>
  onFetchCollections(store, 'bookmarkedCollections');

export function onFetchCollections(
  store: MiddlewareAPI<any, LinksState>,
  request: PageableCollectionKey,
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

const onFetchNextPublicCollection = (
  store: MiddlewareAPI<any, CollectionState>,
) => onFetchNextCollections(store, 'publicCollections');

const onFetchNextBookmarkedCollection = (
  store: MiddlewareAPI<any, CollectionState>,
) => onFetchNextCollections(store, 'bookmarkedCollections');

export function onFetchNextCollections(
  store: MiddlewareAPI<any, CollectionState>,
  request: PageableCollectionKey,
) {
  const publicCollections = store.getState().collections[request];
  fetchNextCollectionsPage(publicCollections)
    .then(collections => {
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
  sideEffect(fetchPublicCollectionsAction, onFetchPublicCollections),
  sideEffect(fetchBookmarkedCollectionsAction, onFetchBookmarkCollections),
  sideEffect(fetchNextPublicCollectionsAction, onFetchNextPublicCollection),
  sideEffect(
    fetchNextBookmarkedCollectionsAction,
    onFetchNextBookmarkedCollection,
  ),
];

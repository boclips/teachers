import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import {
  fetchBookmarkedCollections,
  fetchNextCollectionsPage,
} from '../../../../services/collections/fetchCollections';
import { CollectionState, LinksState } from '../../../../types/State';
import { appendBookmarkedCollectionsAction } from '../actions/appendBookmarkedCollectionsAction';
import { fetchBookmarkedCollectionsAction } from '../actions/fetchBookmarkedCollectionsAction';
import { fetchNextBookmarkedCollectionsAction } from '../actions/fetchNextBookmarkedCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';

export function onFetchBookmarkedCollections(
  store: MiddlewareAPI<any, LinksState>,
) {
  const links = store.getState().links;
  fetchBookmarkedCollections(links)
    .then(collections => {
      store.dispatch(
        storeCollectionsAction({
          key: 'bookmarkedCollections',
          collections,
        }),
      );
    })
    .catch(console.error);
}

export function onFetchNextBookmarkedCollections(
  store: MiddlewareAPI<any, CollectionState>,
) {
  const bookmarkedCollections = store.getState().collections
    .bookmarkedCollections;
  fetchNextCollectionsPage(bookmarkedCollections)
    .then(collections => {
      store.dispatch(appendBookmarkedCollectionsAction(collections));
    })
    .catch(console.error);
}

export default [
  sideEffect(fetchBookmarkedCollectionsAction, onFetchBookmarkedCollections),
  sideEffect(
    fetchNextBookmarkedCollectionsAction,
    onFetchNextBookmarkedCollections,
  ),
];

import { MiddlewareAPI } from 'redux';
import { CollectionKey } from 'src/types/CollectionKey';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchPageableCollections } from '../../../../services/collections/fetchCollections';
import { LinksState } from '../../../../types/State';
import { fetchCollectionsAction } from '../actions/fetchCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { Links } from '../../../../types/Links';

export function onFetchCollections(
  store: MiddlewareAPI<any, LinksState>,
  key: CollectionKey,
) {
  const links: Links = store.getState().links.entries;
  fetchPageableCollections(links, { key })
    .then(collections => {
      store.dispatch(storeCollectionsAction({ collections, key }));
    })
    .catch(console.error);
}

export default sideEffect(fetchCollectionsAction, onFetchCollections);

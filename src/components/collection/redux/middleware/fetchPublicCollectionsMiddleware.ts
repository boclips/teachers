import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchPublicCollections } from '../../../../services/collections/fetchCollections';
import { LinksState } from '../../../../types/State';
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

export default sideEffect(fetchPublicCollectionsAction, onFetchCollections);

import { fetchCollectionAction } from './../../../../views/collection/CollectionView';

import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchCollection } from '../../../../services/collections/fetchCollection';
import { LinksState } from '../../../../types/State';
import { storeCollectionAction } from '../../../video/redux/actions/storeCollectionAction';

export function onFetchCollection(store: MiddlewareAPI<any, LinksState>) {
  const links = store.getState().links;
  fetchCollection(links).then(collection => {
    store.dispatch(storeCollectionAction(collection));
  });
}

export default sideEffect(fetchCollectionAction, onFetchCollection);

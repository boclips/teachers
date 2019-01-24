import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { fetchCollection } from '../../../../services/collections/fetchCollection';
import { LinksState } from '../../../../types/State';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { fetchCollectionAction } from './../../../../views/collection/CollectionView';

export function onFetchCollection(store: MiddlewareAPI<any, LinksState>) {
  const links = store.getState().links;
  fetchCollection(links).then(collection => {
    store.dispatch(storeCollectionAction(collection));
    AnalyticsFactory.getInstance().trackDefaultCollectionVisited();
  });
}

export default sideEffect(fetchCollectionAction, onFetchCollection);

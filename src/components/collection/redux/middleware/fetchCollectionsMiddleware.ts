import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { fetchUserCollections } from '../../../../services/collections/fetchCollections';
import { LinksState } from '../../../../types/State';
import { fetchCollectionsAction } from '../actions/fetchCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';

export function onFetchCollections(store: MiddlewareAPI<any, LinksState>) {
  const links = store.getState().links;
  fetchUserCollections(links)
    .then(collections => {
      store.dispatch(storeCollectionsAction(collections));
      AnalyticsFactory.getInstance().trackMyCollectionsVisited();
    })
    .catch(console.error);
}

export default sideEffect(fetchCollectionsAction, onFetchCollections);

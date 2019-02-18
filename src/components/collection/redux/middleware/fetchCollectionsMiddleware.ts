import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { fetchCollections } from '../../../../services/collections/fetchCollections';
import { LinksState } from '../../../../types/State';
import { fetchCollectionsAction } from '../../../../views/collection/CollectionListView';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';

export function onFetchCollections(store: MiddlewareAPI<any, LinksState>) {
  const links = store.getState().links;
  fetchCollections(links).then(collections => {
    store.dispatch(storeCollectionsAction(collections));
    AnalyticsFactory.getInstance().trackMyCollectionsVisited();
  });
}

export default sideEffect(fetchCollectionsAction, onFetchCollections);

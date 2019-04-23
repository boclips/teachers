import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { fetchMyCollections } from '../../../../services/collections/fetchCollections';
import { LinksState } from '../../../../types/State';
import { fetchMyCollectionsAction } from '../actions/fetchMyCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';

export function onFetchCollections(store: MiddlewareAPI<any, LinksState>) {
  const links = store.getState().links;
  fetchMyCollections(links)
    .then(collections => {
      store.dispatch(
        storeCollectionsAction({ collections, key: 'myCollections' }),
      );
      AnalyticsFactory.getInstance().trackMyCollectionsVisited();
    })
    .catch(console.error);
}

export default sideEffect(fetchMyCollectionsAction, onFetchCollections);

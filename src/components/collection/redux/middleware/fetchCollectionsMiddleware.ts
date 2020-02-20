import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { fetchPageableCollections } from '../../../../services/collections/fetchCollections';
import { LinksState } from '../../../../types/State';
import { fetchMyCollectionsAction } from '../actions/fetchMyCollectionsAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { Links } from '../../../../types/Links';

export function onFetchCollections(store: MiddlewareAPI<any, LinksState>) {
  const links: Links = store.getState().links.entries;
  fetchPageableCollections(links, { key: 'myCollections' })
    .then(collections => {
      store.dispatch(
        storeCollectionsAction({ collections, key: 'myCollections' }),
      );
      AnalyticsFactory.externalAnalytics().trackMyCollectionsVisited();
    })
    .catch(console.error);
}

export default sideEffect(fetchMyCollectionsAction, onFetchCollections);

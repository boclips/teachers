import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { fetchPageableCollections } from 'src/services/collections/fetchCollections';
import { LinksState } from 'src/types/State';
import { Links } from 'src/types/Links';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { fetchMyCollectionsAction } from '../actions/fetchMyCollectionsAction';

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

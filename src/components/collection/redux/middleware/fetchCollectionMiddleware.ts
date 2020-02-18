import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { fetchCollection } from 'src/services/collections/fetchCollection';
import { LinksState } from 'src/types/State';
import { Links } from 'src/types/Links';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';

export function onFetchCollection(
  store: MiddlewareAPI<any, LinksState>,
  collectionId: string,
) {
  const links: Links = store.getState().links.entries;
  fetchCollection(links, collectionId)
    .then(collection => {
      store.dispatch(storeCollectionAction(collection));
      AnalyticsFactory.externalAnalytics().trackCollectionVisited(collection);
    })
    .catch(e => {
      if (e && e.response && e.response.status === 404) {
        store.dispatch(storeCollectionAction(null));
      } else {
        console.error(e);
      }
    });
}

export default sideEffect(fetchCollectionAction, onFetchCollection);

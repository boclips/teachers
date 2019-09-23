import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { fetchCollection } from '../../../../services/collections/fetchCollection';
import { LinksState } from '../../../../types/State';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';

export function onFetchCollection(
  store: MiddlewareAPI<any, LinksState>,
  collectionId: string,
) {
  const links = store.getState().links;
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

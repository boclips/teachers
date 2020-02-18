import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import {
  createCollection,
  CreateCollectionRequest,
} from 'src/services/collections/createCollection';
import NotificationFactory from 'src/components/common/NotificationFactory';
import { Links } from 'src/types/Links';
import { onCreateCollectionAction } from '../actions/onCreateCollectionAction';
import { fetchMyCollectionsAction } from '../actions/fetchMyCollectionsAction';
import { createCollectionAction } from '../actions/createCollectionAction';

export function onCreateCollection(
  store: MiddlewareAPI,
  request: CreateCollectionRequest,
) {
  const links: Links = store.getState().links.entries;
  createCollection(links, request)
    .then(() => {
      store.dispatch(onCreateCollectionAction());
      store.dispatch(fetchMyCollectionsAction());
    })
    .catch(() => {
      NotificationFactory.error({ message: 'Error creating collection.' });
    });
  AnalyticsFactory.externalAnalytics().trackCollectionCreated(request);
}

export default sideEffect(createCollectionAction, onCreateCollection);

import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import {
  createCollection,
  CreateCollectionRequest,
} from '../../../../services/collections/createCollection';
import NotificationFactory from '../../../common/NotificationFactory';
import { createCollectionAction } from '../actions/createCollectionAction';
import { fetchMyCollectionsAction } from '../actions/fetchMyCollectionsAction';
import { onCreateCollectionAction } from '../actions/onCreateCollectionAction';
import { Links } from '../../../../types/Links';

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

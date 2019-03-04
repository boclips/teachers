import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import {
  createCollection,
  CreateCollectionRequest,
} from '../../../../services/collections/createCollection';
import { fetchCollectionsAction } from '../../../../views/collection/CollectionListView';
import NotificationFactory from '../../../common/NotificationFactory';
import { createCollectionAction } from '../actions/createCollectionAction';
import { createCollectionResultAction } from '../actions/createCollectionResultAction';

export function onCreateCollection(
  store: MiddlewareAPI,
  request: CreateCollectionRequest,
) {
  const links = store.getState().links;
  createCollection(links, request)
    .then(() => {
      store.dispatch(createCollectionResultAction());
      store.dispatch(fetchCollectionsAction());
    })
    .catch(() => {
      NotificationFactory.error({ description: 'Error creating collection.' });
    });
  AnalyticsFactory.getInstance().trackCollectionCreated(request);
}

export default sideEffect(createCollectionAction, onCreateCollection);

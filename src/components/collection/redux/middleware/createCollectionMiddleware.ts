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

export function onCreateCollection(
  store: MiddlewareAPI,
  request: CreateCollectionRequest,
) {
  const links = store.getState().links;
  createCollection(links, request)
    .then(() => {
      NotificationFactory.success({
        description: `Your collection "${request.title}" has been created.`,
      });
      store.dispatch(fetchCollectionsAction());
    })
    .catch(() => {
      NotificationFactory.error({ description: 'Error creating collection.' });
    });
  AnalyticsFactory.getInstance().trackCollectionCreated(request);
}

export default sideEffect(createCollectionAction, onCreateCollection);

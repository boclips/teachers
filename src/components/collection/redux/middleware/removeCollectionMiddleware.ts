import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { deleteCollection } from '../../../../services/collections/deleteCollection';
import { VideoCollection } from '../../../../types/VideoCollection';
import { fetchCollectionsAction } from '../../../../views/collection/CollectionListView';
import NotificationFactory from '../../../common/NotificationFactory';
import { deleteCollectionAction } from '../actions/deleteCollectionAction';

export function onDeleteCollection(
  store: MiddlewareAPI,
  request: VideoCollection,
) {
  deleteCollection(request)
    .then(() => {
      NotificationFactory.success({
        description: `Your collection "${request.title}" has been deleted`,
      });
      store.dispatch(fetchCollectionsAction());
    })
    .catch(() => {
      NotificationFactory.error({ description: 'Error deleting collection.' });
    });
  AnalyticsFactory.getInstance().trackCollectionRemoved(request);
}

export default sideEffect(deleteCollectionAction, onDeleteCollection);

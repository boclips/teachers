import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import {
  renameCollection,
  RenameCollectionRequest,
} from '../../../../services/collections/renameCollection';
import { fetchCollectionsAction } from '../../../../views/collection/CollectionListView';
import NotificationFactory from '../../../common/NotificationFactory';
import { renameCollectionAction } from '../actions/renameCollectionAction';

export function onRenameCollection(
  store: MiddlewareAPI,
  request: RenameCollectionRequest,
) {
  renameCollection(request)
    .then(() => {
      store.dispatch(fetchCollectionsAction());
    })
    .catch(() => {
      NotificationFactory.error({ description: 'Error renaming collection.' });
    });
  AnalyticsFactory.getInstance().trackCollectionRenamed(request);
}

export default sideEffect(renameCollectionAction, onRenameCollection);

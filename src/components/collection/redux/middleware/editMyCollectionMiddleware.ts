import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { editCollection } from '../../../../services/collections/editCollection';
import NotificationFactory from '../../../common/NotificationFactory';
import {
  editCollectionAction,
  EditCollectionRequest,
} from '../actions/editCollectionAction';
import { onMyCollectionEditedAction } from '../actions/onMyCollectionEditedAction';
import { VideoCollection } from './../../../../types/VideoCollection';

export function onEditCollection(
  store: MiddlewareAPI,
  request: EditCollectionRequest,
) {
  editCollection(request.collection, request.changes)
    .then(() => {
      const updatedCollection: VideoCollection = createUpdatedCollection(
        request,
      );

      store.dispatch(onMyCollectionEditedAction(updatedCollection));
    })
    .catch(error => {
      console.error(error);
      NotificationFactory.error({ message: 'Error renaming collection.' });
    });

  if (request.changes.title != null) {
    AnalyticsFactory.externalAnalytics().trackCollectionRenamed(request);
  }

  if (request.changes.isPublic != null) {
    AnalyticsFactory.externalAnalytics().trackCollectionVisiblityChange(
      request,
    );
  }
}

const createUpdatedCollection = ({
  collection,
  changes,
}: EditCollectionRequest) => ({
  ...collection,
  ...changes,
});

export default sideEffect(editCollectionAction, onEditCollection);

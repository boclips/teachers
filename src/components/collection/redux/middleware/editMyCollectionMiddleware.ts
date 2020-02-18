import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { editCollection } from 'src/services/collections/editCollection';
import NotificationFactory from 'src/components/common/NotificationFactory';
import { VideoCollection } from 'src/types/VideoCollection';
import { onMyCollectionEditedAction } from '../actions/onMyCollectionEditedAction';
import {
  editCollectionAction,
  EditCollectionRequest,
} from '../actions/editCollectionAction';

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

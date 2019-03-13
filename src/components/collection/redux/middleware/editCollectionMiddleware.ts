import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { editCollection } from '../../../../services/collections/editCollection';
import NotificationFactory from '../../../common/NotificationFactory';
import {
  editCollectionAction,
  EditCollectionRequest,
} from '../actions/editCollectionAction';
import { onCollectionEditedAction } from '../actions/onCollectionEditedAction';

export function onEditCollection(
  store: MiddlewareAPI,
  request: EditCollectionRequest,
) {
  editCollection(request)
    .then(() => {
      const updatedCollection = createUpdatedCollection(request);

      store.dispatch(onCollectionEditedAction(updatedCollection));
    })
    .catch(() => {
      NotificationFactory.error({ description: 'Error renaming collection.' });
    });

  if (request.title != null) {
    AnalyticsFactory.getInstance().trackCollectionRenamed(request);
  }

  if (request.isPublic != null) {
    AnalyticsFactory.getInstance().trackCollectionVisiblityChange(request);
  }
}

const createUpdatedCollection = (request: EditCollectionRequest) => ({
  ...request.originalCollection,
  title: request.title || request.originalCollection.title,
  isPublic:
    request.isPublic != null
      ? request.isPublic
      : request.originalCollection.isPublic,
});

export default sideEffect(editCollectionAction, onEditCollection);

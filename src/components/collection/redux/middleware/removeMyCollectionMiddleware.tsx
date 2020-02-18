import { push } from 'connected-react-router';
import React from 'react';
import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { deleteCollection } from 'src/services/collections/deleteCollection';
import { VideoCollection } from 'src/types/VideoCollection';
import NotificationFactory from 'src/components/common/NotificationFactory';
import { onMyCollectionRemovedAction } from '../actions/onMyCollectionRemovedAction';
import { deleteCollectionAction } from '../actions/deleteCollectionAction';

export function onDeleteCollection(
  store: MiddlewareAPI,
  request: VideoCollection,
) {
  deleteCollection(request)
    .then(() => {
      store.dispatch(push('/collections'));
    })
    .then(() => {
      NotificationFactory.success({
        message: (
          <span>
            Your collection <i>{request.title}</i> has been deleted
          </span>
        ),
      });
      store.dispatch(onMyCollectionRemovedAction(request));
    })
    .catch(() => {
      NotificationFactory.error({ message: 'Error deleting collection.' });
    });
  AnalyticsFactory.externalAnalytics().trackCollectionRemoved(request);
}

export default sideEffect(deleteCollectionAction, onDeleteCollection);

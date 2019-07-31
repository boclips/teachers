import { push } from 'connected-react-router';
import React from 'react';
import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { deleteCollection } from '../../../../services/collections/deleteCollection';
import { VideoCollection } from '../../../../types/VideoCollection';
import NotificationFactory from '../../../common/NotificationFactory';
import { deleteCollectionAction } from '../actions/deleteCollectionAction';
import { onMyCollectionRemovedAction } from '../actions/onMyCollectionRemovedAction';

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
  AnalyticsFactory.getInstance().trackCollectionRemoved(request);
}

export default sideEffect(deleteCollectionAction, onDeleteCollection);

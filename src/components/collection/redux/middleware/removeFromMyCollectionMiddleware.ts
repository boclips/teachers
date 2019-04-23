import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import removeFromCollection from '../../../../services/collections/removeFromCollection';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { onRemoveFromCollectionAction } from '../actions/onRemoveFromCollectionAction';
import { removeVideoFromMyCollectionAction } from '../actions/removeFromMyCollectionAction';

export function onRemoveFromCollection(
  store: MiddlewareAPI,
  request: { video: Video; collection: VideoCollection },
) {
  removeFromCollection(request.video, request.collection)
    .then(success => {
      store.dispatch(
        onRemoveFromCollectionAction({
          collection: request.collection,
          video: request.video,
          success,
        }),
      );
    })
    .catch(console.error);
  AnalyticsFactory.getInstance().trackVideoRemovedFromCollection(
    request.video,
    request.collection,
  );
}

export default sideEffect(
  removeVideoFromMyCollectionAction,
  onRemoveFromCollection,
);

import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import removeFromCollection from 'src/services/collections/removeFromCollection';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';
import { removeVideoFromMyCollectionAction } from '../actions/removeFromMyCollectionAction';
import { onRemoveFromCollectionAction } from '../actions/onRemoveFromCollectionAction';

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
  AnalyticsFactory.externalAnalytics().trackVideoRemovedFromCollection(
    request.video,
    request.collection,
  );
}

export default sideEffect(
  removeVideoFromMyCollectionAction,
  onRemoveFromCollection,
);

import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import addToCollection from 'src/services/collections/addToCollection';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';
import { onAddToCollectionAction } from '../actions/onAddToCollectionAction';
import { addVideoToMyCollectionAction } from '../actions/addToMyCollectionAction';

export function onAddToCollection(
  store: MiddlewareAPI,
  request: { video: Video; collection: VideoCollection },
) {
  addToCollection(request.video, request.collection)
    .then(success => {
      store.dispatch(
        onAddToCollectionAction({
          collection: request.collection,
          video: request.video,
          success,
        }),
      );
    })
    .catch(console.error);
  AnalyticsFactory.externalAnalytics().trackVideoAddedToCollection(
    request.video,
    request.collection,
  );
}

export default sideEffect(addVideoToMyCollectionAction, onAddToCollection);

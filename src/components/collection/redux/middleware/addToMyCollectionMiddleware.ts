import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import addToCollection from '../../../../services/collections/addToCollection';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addToCollectionResultAction } from '../actions/addToCollectionResultAction';
import { addVideoToMyCollectionAction } from '../actions/addToMyCollectionAction';

export function onAddToCollection(
  store: MiddlewareAPI,
  request: { video: Video; collection: VideoCollection },
) {
  addToCollection(request.video, request.collection)
    .then(success => {
      store.dispatch(
        addToCollectionResultAction({
          collection: request.collection,
          video: request.video,
          success,
        }),
      );
    })
    .catch(console.error);
  AnalyticsFactory.getInstance().trackVideoAddedToCollection(
    request.video,
    request.collection,
  );
}

export default sideEffect(addVideoToMyCollectionAction, onAddToCollection);

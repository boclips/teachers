import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import addToCollection from '../../../../services/collections/addToCollection';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addVideoToMyCollectionAction } from '../actions/addToMyCollectionAction';
import { onAddToCollectionAction } from '../actions/onAddToCollectionAction';

export function onAddToCollection(
  store: MiddlewareAPI,
  request: { video: Video; collection: VideoCollection },
) {
  addToCollection(request.video, request.collection)
    .then((success) => {
      store.dispatch(
        onAddToCollectionAction({
          collection: request.collection,
          video: request.video,
          success,
        }),
      );
    })
    .catch(console.error);
}

export default sideEffect(addVideoToMyCollectionAction, onAddToCollection);

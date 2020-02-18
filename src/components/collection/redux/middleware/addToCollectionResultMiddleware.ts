import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';
import NotificationFactory from 'src/components/common/NotificationFactory';
import { onAddToCollectionAction } from '../actions/onAddToCollectionAction';

export const ERROR_DESCRIPTION = 'could not be added to the collection';

export interface UpdateCollectionResult {
  collection: VideoCollection;
  video: Video;
  success: boolean;
}

export const onAddToCollectionResult = (
  _: MiddlewareAPI<any, {}>,
  payload: UpdateCollectionResult,
) => {
  if (!payload.success) {
    NotificationFactory.error({
      message: payload.video.title,
      description: ERROR_DESCRIPTION,
    });
  }
};

export default sideEffect(onAddToCollectionAction, onAddToCollectionResult);

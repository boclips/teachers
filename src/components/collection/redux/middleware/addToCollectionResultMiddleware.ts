import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import NotificationFactory from '../../../common/NotificationFactory';
import { addToCollectionResultAction } from '../actions/addToCollectionResultAction';

export const SUCCESS_DESCRIPTION = 'has been saved to your video collection';
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
  if (payload.success) {
    NotificationFactory.success({
      message: payload.video.title,
      description: SUCCESS_DESCRIPTION,
    });
  } else {
    NotificationFactory.error({
      message: payload.video.title,
      description: ERROR_DESCRIPTION,
    });
  }
};

export default sideEffect(addToCollectionResultAction, onAddToCollectionResult);

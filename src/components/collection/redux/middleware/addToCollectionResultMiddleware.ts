import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';
import NotificationFactory from '../../../common/NotificationFactory';
import { removeFromDefaultCollectionAction } from '../../../video/card/VideoCardButtons';
import { addToCollectionResultAction } from '../actions/addToCollectionResultAction';

export const SUCCESS_DESCRIPTION = 'has been saved to your video collection';
export const ERROR_DESCRIPTION = 'could not be added to the collection';

export interface AddToCollectionResult {
  video: Video;
  success: boolean;
}

export const onAddToCollectionResult = (
  store: MiddlewareAPI<any, {}>,
  payload: AddToCollectionResult,
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

    store.dispatch(removeFromDefaultCollectionAction(payload.video));
  }
};

export default sideEffect(addToCollectionResultAction, onAddToCollectionResult);

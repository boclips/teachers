import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import NotificationFactory from '../../../common/NotificationFactory';
import { storeVideoInDefaultCollectionAction } from '../actions/storeVideoInDefaultCollectionAction';
import { removeFromCollectionResultAction } from './../actions/removeFromCollectionResultAction';
import { UpdateCollectionResult } from './addToCollectionResultMiddleware';

export const onRemoveFromCollectionResult = (
  store: MiddlewareAPI<any, {}>,
  payload: UpdateCollectionResult,
) => {
  if (payload.success) {
    NotificationFactory.success({
      message: payload.video.title,
      description: 'Removed from collection.',
    });
  } else {
    NotificationFactory.error({
      message: payload.video.title,
      description: 'Could not remove video from collection.',
    });

    store.dispatch(storeVideoInDefaultCollectionAction(payload.video));
  }
};

export default sideEffect(
  removeFromCollectionResultAction,
  onRemoveFromCollectionResult,
);

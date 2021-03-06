import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import NotificationFactory from '../../../common/NotificationFactory';
import { onRemoveFromCollectionAction } from '../actions/onRemoveFromCollectionAction';
import { UpdateCollectionResult } from './addToCollectionResultMiddleware';

export const onRemoveFromCollectionResult = (
  _: MiddlewareAPI<any, {}>,
  payload: UpdateCollectionResult,
) => {
  if (!payload.success) {
    NotificationFactory.error({
      message: payload.video.title,
      description: 'Could not remove video from collection.',
    });
  }
};

export default sideEffect(
  onRemoveFromCollectionAction,
  onRemoveFromCollectionResult,
);

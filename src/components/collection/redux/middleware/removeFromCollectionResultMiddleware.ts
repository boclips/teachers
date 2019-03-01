import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import NotificationFactory from '../../../common/NotificationFactory';
import { removeFromCollectionResultAction } from './../actions/removeFromCollectionResultAction';
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
  removeFromCollectionResultAction,
  onRemoveFromCollectionResult,
);

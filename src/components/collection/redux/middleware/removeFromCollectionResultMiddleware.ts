import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchCollectionsAction } from '../../../../views/collection/CollectionListView';
import NotificationFactory from '../../../common/NotificationFactory';
import { removeFromCollectionResultAction } from './../actions/removeFromCollectionResultAction';
import { UpdateCollectionResult } from './addToCollectionResultMiddleware';

export const onRemoveFromCollectionResult = (
  store: MiddlewareAPI<any, {}>,
  payload: UpdateCollectionResult,
) => {
  if (payload.success) {
    store.dispatch(fetchCollectionsAction());
    NotificationFactory.success({
      message: payload.video.title,
      description: 'Removed from collection.',
    });
  } else {
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

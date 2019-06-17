import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { unbookmarkCollection } from '../../../../services/collections/unbookmarkCollection';
import { VideoCollection } from '../../../../types/VideoCollection';
import NotificationFactory from '../../../common/NotificationFactory';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';
import { unbookmarkCollectionAction } from '../actions/unbookmarkCollectionAction';

export function onUnbookmarkCollection(
  store: MiddlewareAPI,
  request: VideoCollection,
) {
  unbookmarkCollection(request)
    .then(response => {
      store.dispatch(onCollectionUnbookmarkedAction(response));
    })
    .catch(() => {
      NotificationFactory.error({
        message: 'Error unbookmarking collection.',
      });
    });
}

export default sideEffect(unbookmarkCollectionAction, onUnbookmarkCollection);

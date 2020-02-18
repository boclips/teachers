import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { unbookmarkCollection } from 'src/services/collections/unbookmarkCollection';
import { VideoCollection } from 'src/types/VideoCollection';
import NotificationFactory from 'src/components/common/NotificationFactory';
import { unbookmarkCollectionAction } from '../actions/unbookmarkCollectionAction';
import { onCollectionUnbookmarkedAction } from '../actions/onCollectionUnbookmarkedAction';

export function onUnbookmarkCollection(
  store: MiddlewareAPI,
  request: VideoCollection,
) {
  unbookmarkCollection(request)
    .then(response => {
      store.dispatch(onCollectionUnbookmarkedAction(response));
    })
    .catch(e => {
      console.log(e);
      NotificationFactory.error({
        message: 'Error unbookmarking collection.',
      });
    });
}

export default sideEffect(unbookmarkCollectionAction, onUnbookmarkCollection);

import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { bookmarkCollection } from 'src/services/collections/bookmarkCollection';
import { VideoCollection } from 'src/types/VideoCollection';
import NotificationFactory from 'src/components/common/NotificationFactory';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';
import { bookmarkCollectionAction } from '../actions/bookmarkCollectionAction';

export function onBookmarkCollection(
  store: MiddlewareAPI,
  request: VideoCollection,
) {
  bookmarkCollection(request)
    .then(response => {
      store.dispatch(onCollectionBookmarkedAction(response));
    })
    .catch(ex => {
      console.log('error:', ex);
      NotificationFactory.error({
        message: 'Error bookmarking collection.',
      });
    });
}

export default sideEffect(bookmarkCollectionAction, onBookmarkCollection);

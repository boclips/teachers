import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { bookmarkCollection } from '../../../../services/collections/bookmarkCollection';
import { VideoCollection } from '../../../../types/VideoCollection';
import NotificationFactory from '../../../common/NotificationFactory';
import { bookmarkCollectionAction } from '../actions/bookmarkCollectionAction';
import { onCollectionBookmarkedAction } from '../actions/onCollectionBookmarkedAction';

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
        description: 'Error bookmarking collection.',
      });
    });
}

export default sideEffect(bookmarkCollectionAction, onBookmarkCollection);

import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import addToCollection from '../../../../services/collections/addToCollection';
import { CollectionState } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { addToCollectionResultAction } from '../actions/addToCollectionResultAction';
import { addToDefaultCollectionAction } from '../actions/addToDefaultCollectionAction';
import { storeVideoInDefaultCollectionAction } from '../actions/storeVideoInDefaultCollectionAction';

export function onAddToCollection(
  store: MiddlewareAPI<any, CollectionState>,
  video: Video,
) {
  store.dispatch(storeVideoInDefaultCollectionAction(video));
  addToCollection(video, store.getState().videoCollection).then(success => {
    store.dispatch(
      addToCollectionResultAction({
        video,
        success,
      }),
    );
  });
  AnalyticsFactory.getInstance().trackVideoAddedToDefaultCollection(video);
}

export default sideEffect(addToDefaultCollectionAction, onAddToCollection);

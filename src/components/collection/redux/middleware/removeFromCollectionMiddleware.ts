import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import removeFromCollection from '../../../../services/collections/removeFromCollection';
import { CollectionState } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { removeFromDefaultCollectionAction } from '../actions/removeFromDefaultCollectionAction';
import { unstoreVideoInDefaultCollectionAction } from '../actions/unstoreVideoInDefaultCollectionAction';
import { removeFromCollectionResultAction } from './../actions/removeFromCollectionResultAction';

export function onRemoveFromCollection(
  store: MiddlewareAPI<any, CollectionState>,
  video: Video,
) {
  store.dispatch(unstoreVideoInDefaultCollectionAction(video));
  removeFromCollection(video, store.getState().videoCollection).then(
    success => {
      store.dispatch(
        removeFromCollectionResultAction({
          video,
          success,
        }),
      );
    },
  );
  AnalyticsFactory.getInstance().trackVideoRemovedFromDefaultCollection(video);
}

export default sideEffect(
  removeFromDefaultCollectionAction,
  onRemoveFromCollection,
);

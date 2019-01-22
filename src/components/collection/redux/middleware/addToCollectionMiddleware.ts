import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import addToCollection from '../../../../services/collections/addToCollection';
import { CollectionState } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { addToDefaultCollectionAction } from '../../../video/preview/VideoPreviewButtonsContainer';

export function onAddToCollection(
  store: MiddlewareAPI<any, CollectionState>,
  video: Video,
) {
  addToCollection(video, store.getState().videoCollection);
  AnalyticsFactory.getInstance().trackVideoAddedToDefaultCollection();
}

export default sideEffect(addToDefaultCollectionAction, onAddToCollection);

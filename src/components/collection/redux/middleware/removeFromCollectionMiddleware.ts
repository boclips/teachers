import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import removeFromCollection from '../../../../services/collections/removeFromCollection';
import { CollectionState } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { removeFromDefaultCollectionAction } from '../../../video/preview/VideoPreviewButtonsContainer';

export function onRemoveFromCollection(
  store: MiddlewareAPI<any, CollectionState>,
  video: Video,
) {
  removeFromCollection(video, store.getState().videoCollection);
}

export default sideEffect(
  removeFromDefaultCollectionAction,
  onRemoveFromCollection,
);

import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../../app/redux/actions';
import addToCollection from '../../../../../services/collections/addToCollection';
import { addToDefaultCollectionAction } from '../../../VideoCard';
import { CollectionState } from './../../../../../types/State';
import { Video } from './../../../../../types/Video';

export function onAddToCollection(
  store: MiddlewareAPI<any, CollectionState>,
  video: Video,
) {
  addToCollection(video, store.getState().videoCollection);
}

export default sideEffect(addToDefaultCollectionAction, onAddToCollection);

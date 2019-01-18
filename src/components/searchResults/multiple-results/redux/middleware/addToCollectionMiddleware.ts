import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../../app/redux/actions';
import addToCollection from '../../../../../services/collections/addToCollection';
import { CollectionState } from './../../../../../types/State';
import { Video } from './../../../../../types/Video';
import { addToDefaultCollectionAction } from './../../../../../views/searchResults/SearchResultsView';

export function onAddToCollection(
  store: MiddlewareAPI<any, CollectionState>,
  video: Video,
) {
  addToCollection(video, store.getState().videoCollection);
}

export default sideEffect(addToDefaultCollectionAction, onAddToCollection);

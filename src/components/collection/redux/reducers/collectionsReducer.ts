import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { CollectionsStateValue } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addToCollectionAction } from '../actions/addToCollectionAction';
import { addToCollectionResultAction } from '../actions/addToCollectionResultAction';
import { createCollectionAction } from '../actions/createCollectionAction';
import { createCollectionResultAction } from '../actions/createCollectionResultAction';
import { removeFromCollectionAction } from '../actions/removeFromCollectionAction';
import { removeFromCollectionResultAction } from '../actions/removeFromCollectionResultAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';

const initialState: CollectionsStateValue = {
  items: [],
  loading: true,
  updating: false,
};

const onStoreCollectionsAction = (
  _: CollectionsStateValue,
  videoCollections: VideoCollection[],
): CollectionsStateValue => {
  return { items: videoCollections, loading: false, updating: false };
};

function getIndexOfCollection(
  state: CollectionsStateValue,
  request: { video: Video; collection: VideoCollection },
) {
  const indexOfCollection = state.items.findIndex(
    col => col.id === request.collection.id,
  );
  return indexOfCollection;
}

const onAddVideoAction = (
  state: CollectionsStateValue,
  request: { video: Video; collection: VideoCollection },
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(state, request);
  const videos = state.items[indexOfCollection].videos;

  if (videos.find(v => v.id === request.video.id)) {
    return state;
  }

  const items = [...state.items];
  items[indexOfCollection] = {
    ...items[indexOfCollection],
    videos: [...items[indexOfCollection].videos, request.video],
  };
  return { ...state, items, updating: true };
};

const onRemoveVideoAction = (
  state: CollectionsStateValue,
  request: { video: Video; collection: VideoCollection },
): CollectionsStateValue => {
  const indexOfCollection = getIndexOfCollection(state, request);
  const items = [...state.items];
  items[indexOfCollection] = {
    ...items[indexOfCollection],
    videos: items[indexOfCollection].videos.filter(
      v => v.id !== request.video.id,
    ),
  };
  return { ...state, items, updating: true };
};

const collectionUpdated = (
  state: CollectionsStateValue,
  _: UpdateCollectionResult,
): CollectionsStateValue => {
  return { ...state, updating: false };
};

const onCreateCollection = (
  state: CollectionsStateValue,
): CollectionsStateValue => {
  return { ...state, updating: true };
};

export const collectionsReducer: Reducer<CollectionsStateValue> = createReducer(
  initialState,
  actionHandler(storeCollectionsAction, onStoreCollectionsAction),
  actionHandler(addToCollectionAction, onAddVideoAction),
  actionHandler(removeFromCollectionAction, onRemoveVideoAction),
  actionHandler(createCollectionAction, onCreateCollection),

  actionHandler(removeFromCollectionResultAction, collectionUpdated),
  actionHandler(addToCollectionResultAction, collectionUpdated),
  actionHandler(createCollectionResultAction, collectionUpdated),
);

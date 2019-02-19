import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { CollectionsStateValue } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';

const initialState: CollectionsStateValue = { items: [], loading: true };

const onStoreCollectionsAction = (
  _: CollectionsStateValue,
  videoCollections: VideoCollection[],
): CollectionsStateValue => {
  return { items: videoCollections, loading: false };
};

export const collectionsReducer: Reducer<CollectionsStateValue> = createReducer(
  initialState,
  actionHandler(storeCollectionsAction, onStoreCollectionsAction),
);

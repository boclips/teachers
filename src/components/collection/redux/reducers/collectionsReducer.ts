import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { VideoCollection } from '../../../../types/VideoCollection';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';

const initialState: VideoCollection[] = [];

const onStoreCollectionsAction = (
  _: VideoCollection[],
  videoCollections: VideoCollection[],
): VideoCollection[] => {
  return videoCollections;
};

export const collectionsReducer: Reducer<VideoCollection[]> = createReducer(
  initialState,
  actionHandler(storeCollectionsAction, onStoreCollectionsAction),
);

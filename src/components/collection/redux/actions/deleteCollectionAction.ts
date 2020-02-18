import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoCollection } from 'src/types/VideoCollection';

export const deleteCollectionAction = actionCreatorFactory<VideoCollection>(
  'DELETE_COLLECTION',
);

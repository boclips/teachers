import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const deleteCollectionAction = actionCreatorFactory<VideoCollection>(
  'DELETE_COLLECTION',
);

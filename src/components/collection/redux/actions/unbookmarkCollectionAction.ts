import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const unbookmarkCollectionAction = actionCreatorFactory<VideoCollection>(
  'UNBOOKMARK_COLLECTION',
);

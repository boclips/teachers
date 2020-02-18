import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoCollection } from 'src/types/VideoCollection';

export const unbookmarkCollectionAction = actionCreatorFactory<VideoCollection>(
  'UNBOOKMARK_COLLECTION',
);

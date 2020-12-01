import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onCollectionUnbookmarkedAction = actionCreatorFactory<VideoCollection>(
  'ON_COLLECTION_UNBOOKMARKED_ACTION',
);

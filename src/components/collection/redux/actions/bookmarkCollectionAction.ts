import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const bookmarkCollectionAction = actionCreatorFactory<VideoCollection>(
  'BOOKMARK_COLLECTION',
);

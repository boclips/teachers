import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoCollection } from 'src/types/VideoCollection';

export const bookmarkCollectionAction = actionCreatorFactory<VideoCollection>(
  'BOOKMARK_COLLECTION',
);

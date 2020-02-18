import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoCollection } from 'src/types/VideoCollection';

export const storeCollectionAction = actionCreatorFactory<VideoCollection>(
  'STORE_COLLECTION',
);

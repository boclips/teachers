import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const storeCollectionAction = actionCreatorFactory<VideoCollection>(
  'STORE_COLLECTION',
);

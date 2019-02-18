import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const storeCollectionsAction = actionCreatorFactory<VideoCollection[]>(
  'STORE_COLLECTIONS',
);

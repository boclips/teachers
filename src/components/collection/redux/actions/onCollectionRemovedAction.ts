import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onCollectionRemovedAction = actionCreatorFactory<VideoCollection>(
  'ON_COLLECTION_DELETED_ACTION',
);

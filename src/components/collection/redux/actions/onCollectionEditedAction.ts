import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onCollectionEditedAction = actionCreatorFactory<VideoCollection>(
  'ON_COLLECTION_EDITED_ACTION',
);

import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onMyCollectionEditedAction = actionCreatorFactory<VideoCollection>(
  'ON_MY_COLLECTION_EDITED_ACTION',
);

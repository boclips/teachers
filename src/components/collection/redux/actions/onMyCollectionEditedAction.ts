import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoCollection } from 'src/types/VideoCollection';

export const onMyCollectionEditedAction = actionCreatorFactory<VideoCollection>(
  'ON_MY_COLLECTION_EDITED_ACTION',
);

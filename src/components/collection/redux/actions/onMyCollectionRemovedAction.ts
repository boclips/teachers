import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoCollection } from 'src/types/VideoCollection';

export const onMyCollectionRemovedAction = actionCreatorFactory<
  VideoCollection
>('ON_MY_COLLECTION_REMOVED_ACTION');

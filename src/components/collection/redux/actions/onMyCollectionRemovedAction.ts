import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onMyCollectionRemovedAction = actionCreatorFactory<
  VideoCollection
>('ON_MY_COLLECTION_REMOVED_ACTION');

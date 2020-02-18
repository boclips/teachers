import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoCollection } from 'src/types/VideoCollection';

export const onCollectionUnbookmarkedAction = actionCreatorFactory<
  VideoCollection
>('ON_COLLECTION_UNBOOKMARKED_ACTION');

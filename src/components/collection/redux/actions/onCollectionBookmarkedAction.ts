import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoCollection } from 'src/types/VideoCollection';

export const onCollectionBookmarkedAction = actionCreatorFactory<
  VideoCollection
>('ON_COLLECTION_BOOKMARKED_ACTION');

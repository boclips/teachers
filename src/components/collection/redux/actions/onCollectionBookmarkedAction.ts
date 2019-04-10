import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const onCollectionBookmarkedAction = actionCreatorFactory<
  VideoCollection
>('ON_COLLECTION_BOOKMARKED_ACTION');

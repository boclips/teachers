import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export const storeBookmarkedCollectionsAction = actionCreatorFactory<
  Pageable<VideoCollection>
>('STORE_BOOKMARKED_COLLECTIONS');

import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export const appendBookmarkedCollectionsAction = actionCreatorFactory<
  Pageable<VideoCollection>
>('APPEND_BOOKMARKED_COLLECTIONS');

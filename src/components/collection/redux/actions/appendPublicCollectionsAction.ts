import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export const appendPublicCollectionsAction = actionCreatorFactory<
  Pageable<VideoCollection>
>('APPEND_PUBLIC_COLLECTIONS');

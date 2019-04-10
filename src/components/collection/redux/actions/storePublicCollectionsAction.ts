import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export const storePublicCollectionsAction = actionCreatorFactory<
  Pageable<VideoCollection>
>('STORE_PUBLIC_COLLECTIONS');

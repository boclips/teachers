import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Scrollable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export const storePublicCollectionsAction = actionCreatorFactory<
  Scrollable<VideoCollection>
>('STORE_PUBLIC_COLLECTIONS');

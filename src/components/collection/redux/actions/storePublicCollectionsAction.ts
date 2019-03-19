import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const storePublicCollectionsAction = actionCreatorFactory<
  VideoCollection[]
>('STORE_PUBLIC_COLLECTIONS');

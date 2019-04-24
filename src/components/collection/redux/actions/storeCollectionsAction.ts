import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionKey } from '../../../../types/CollectionKey';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export interface StoreCollectionsRequest {
  collections: Pageable<VideoCollection> | VideoCollection[];
  key: CollectionKey;
}

export const storeCollectionsAction = actionCreatorFactory<
  StoreCollectionsRequest
>('STORE_COLLECTIONS');

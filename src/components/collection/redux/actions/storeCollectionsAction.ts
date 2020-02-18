import { actionCreatorFactory } from 'src/app/redux/actions';
import { CollectionKey } from 'src/types/CollectionKey';
import { CollectionSearchRequest } from 'src/types/CollectionSearchRequest';
import { Pageable } from 'src/types/State';
import { VideoCollection } from 'src/types/VideoCollection';

export interface StoreCollectionsRequest {
  collections: Pageable<VideoCollection>;
  key: CollectionKey;
  request?: CollectionSearchRequest;
}

export const storeCollectionsAction = actionCreatorFactory<
  StoreCollectionsRequest
>('STORE_COLLECTIONS');

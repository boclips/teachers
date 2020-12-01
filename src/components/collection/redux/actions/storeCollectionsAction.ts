import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CollectionKey } from '../../../../types/CollectionKey';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export interface StoreCollectionsRequest {
  collections: Pageable<VideoCollection>;
  key: CollectionKey;
  request?: CollectionSearchRequest;
}

export const storeCollectionsAction = actionCreatorFactory<StoreCollectionsRequest>(
  'STORE_COLLECTIONS',
);

import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export interface StorePageableCollectionRequest {
  collections: Pageable<VideoCollection>;
  key: 'publicCollections' | 'bookmarkedCollections';
}

export const storePageableCollectionsAction = actionCreatorFactory<
  StorePageableCollectionRequest
>('STORE_PAGEABLE_COLLECTIONS');

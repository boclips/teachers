import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export interface StoreCollectionsRequest {
  collections: Pageable<VideoCollection> | VideoCollection[];
  key: 'publicCollections' | 'bookmarkedCollections' | 'myCollections';
}

export const storeCollectionsAction = actionCreatorFactory<
  StoreCollectionsRequest
>('STORE_PAGEABLE_COLLECTIONS');

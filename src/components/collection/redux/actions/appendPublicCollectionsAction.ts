import { actionCreatorFactory } from '../../../../app/redux/actions';
import { PageableCollectionKey } from '../../../../types/CollectionKey';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export interface AppendCollectionRequest {
  collections: Pageable<VideoCollection>;
  key: PageableCollectionKey;
}

export const appendPublicCollectionsAction = actionCreatorFactory<
  AppendCollectionRequest
>('APPEND_PUBLIC_COLLECTIONS');

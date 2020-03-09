import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';
import { CollectionKey } from './../../../../types/CollectionKey';

export interface AppendCollectionRequest {
  collections: Pageable<VideoCollection>;
  key: CollectionKey;
}

export const appendPublicCollectionsAction = actionCreatorFactory<
  AppendCollectionRequest
>('APPEND_PUBLIC_COLLECTIONS');

export const appendDiscoverCollectionsAction = actionCreatorFactory<
  AppendCollectionRequest
>('APPEND_DISCOVER_COLLECTIONS');

export const appendBookmarkedCollectionsAction = actionCreatorFactory<
  AppendCollectionRequest
>('APPEND_BOOKMARKED_COLLECTIONS');

export const appendMyCollectionsAction = actionCreatorFactory<
  AppendCollectionRequest
>('APPEND_MY_COLLECTIONS');

export const appendPageableCollectionsAction = (
  request: AppendCollectionRequest,
) => {
  switch (request.key) {
    case 'publicCollections':
      return appendPublicCollectionsAction(request);
    case 'myResources':
      return appendMyCollectionsAction(request);
    case 'myCollections':
      return appendMyCollectionsAction(request);
    case 'discoverCollections':
      return appendDiscoverCollectionsAction(request);
  }
};

import { actionCreatorFactory } from 'src/app/redux/actions';
import { Pageable } from 'src/types/State';
import { VideoCollection } from 'src/types/VideoCollection';
import { CollectionKey } from 'src/types/CollectionKey';

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
    case 'bookmarkedCollections':
      return appendBookmarkedCollectionsAction(request);
    case 'publicCollections':
      return appendPublicCollectionsAction(request);
    case 'myCollections':
      return appendMyCollectionsAction(request);
    case 'discoverCollections':
      return appendDiscoverCollectionsAction(request);
  }
};

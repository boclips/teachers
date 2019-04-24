import { actionCreatorFactory } from '../../../../app/redux/actions';
import { ReadOnlyCollectionKey } from '../../../../types/CollectionKey';
import { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export interface AppendCollectionRequest {
  collections: Pageable<VideoCollection>;
  key: ReadOnlyCollectionKey;
}

export const appendPublicCollectionsAction = actionCreatorFactory<
  AppendCollectionRequest
>('APPEND_PUBLIC_COLLECTIONS');

export const appendBookmarkedCollectionsAction = actionCreatorFactory<
  AppendCollectionRequest
>('APPEND_BOOKMARKED_COLLECTIONS');

export const appendReadOnlyCollectionsAction = (
  request: AppendCollectionRequest,
) => {
  switch (request.key) {
    case 'bookmarkedCollections':
      return appendBookmarkedCollectionsAction(request);
    case 'publicCollections':
      return appendPublicCollectionsAction(request);
  }
};

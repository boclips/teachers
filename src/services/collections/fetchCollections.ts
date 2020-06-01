import axios from 'axios';
import { CollectionRequestFilters } from 'src/types/CollectionSearchRequest';
import { FetchPageableCollectionRequest } from '../../components/collection/redux/actions/fetchPageableCollectionsAction';
import { Links } from '../../types/Links';
import { Pageable } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import { parseScrollableCollectionsListResponse } from './collectionParser';

export const fetchPageableCollections = (
  links: Links,
  request: FetchPageableCollectionRequest,
): Promise<Pageable<VideoCollection>> => {
  let url = null;
  switch (request.key) {
    case 'myResources':
      url = links.mySavedCollections.getTemplatedLink({
        sort_by: ['IS_DEFAULT', 'UPDATED_AT'],
      } as CollectionRequestFilters);
      break;
    case 'discoverCollections':
      url = links.discoverCollections.getTemplatedLink({
        ...request.request.filters,
        sort_by: ['HAS_ATTACHMENT'],
      } as CollectionRequestFilters);
      break;
    case 'myCollections':
      url = links.myCollections.getTemplatedLink({
        sort_by: ['UPDATED_AT'],
      } as CollectionRequestFilters);
      break;
    case 'promotedCollections':
      url = links.promotedCollections.getOriginalLink();
      break;
  }

  return axios
    .get(url)
    .then((response) => parseScrollableCollectionsListResponse(response));
};

export const fetchNextCollectionsPage = (
  collections: Pageable<string>,
): Promise<Pageable<VideoCollection>> => {
  if (!collections.links.next) {
    return Promise.reject();
  }
  return axios
    .get(collections.links.next.getOriginalLink())
    .then((response) => parseScrollableCollectionsListResponse(response));
};

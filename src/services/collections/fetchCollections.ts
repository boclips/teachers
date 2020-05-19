import axios from 'axios';
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
      url = links.mySavedCollections.getTemplatedLink({});
      break;
    case 'discoverCollections':
      url = links.discoverCollections.getTemplatedLink(request.request.filters);
      break;
    case 'myCollections':
      url = links[request.key].getTemplatedLink({});
      break;
    case 'promotedCollections':
      url = links[request.key].getOriginalLink();
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

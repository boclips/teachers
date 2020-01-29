import axios from 'axios';
import { FetchPageableCollectionRequest } from '../../components/collection/redux/actions/fetchPageableCollectionsAction';
import { Links } from '../../types/Links';
import { Pageable } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import { parseScrollableCollectionsListResponse } from './collectionParser';

export const fetchPageableCollections = (
  links: Links,
  request: FetchPageableCollectionRequest,
): Promise<Pageable<VideoCollection>> =>
  axios
    .get(
      request.request
        ? links[request.key].getTemplatedLink(request.request.filters)
        : links[request.key].getOriginalLink(),
    )
    .then(response => parseScrollableCollectionsListResponse(response));

export const fetchNextCollectionsPage = (
  collections: Pageable<string>,
): Promise<Pageable<VideoCollection>> => {
  if (!collections.links.next) {
    return Promise.reject();
  }
  return axios
    .get(collections.links.next.getOriginalLink())
    .then(response => parseScrollableCollectionsListResponse(response));
};

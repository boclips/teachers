import axios from 'axios';
import { CollectionSearchRequest } from '../../types/CollectionSearchRequest';
import { Links } from '../../types/Links';
import { VideoCollection } from '../../types/VideoCollection';
import { parseCollectionsListResponse } from './collectionParser';

export default function searchCollections(
  searchRequest: CollectionSearchRequest,
  links: Links,
): Promise<VideoCollection[]> {
  const url = links.searchCollections.getTemplatedLink({
    query: searchRequest.query,
  });
  return axios
    .get(url)
    .then(response => parseCollectionsListResponse(response));
}

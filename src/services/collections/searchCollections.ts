import axios from 'axios';
import { CollectionSearchRequest } from '../../types/CollectionSearchRequest';
import { Links } from '../../types/Links';
import { CollectionSearchResults } from '../../types/State';
import { parseCollectionsListResponse } from './collectionParser';

export default function searchCollections(
  searchRequest: CollectionSearchRequest,
  links: Links,
): Promise<CollectionSearchResults> {
  const url = links.searchCollections.getTemplatedLink({
    query: searchRequest.query,
  });
  return axios.get(url).then(response => ({
    collections: parseCollectionsListResponse(response),
    query: searchRequest.query,
  }));
}

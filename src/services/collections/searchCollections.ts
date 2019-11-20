import axios from 'axios';
import { CollectionSearchRequest } from '../../types/CollectionSearchRequest';
import { Links } from '../../types/Links';
import { CollectionSearchResult } from '../../types/SearchResults';
import { parseCollectionsListResponse } from './collectionParser';

export default function searchPublicCollections(
  searchRequest: CollectionSearchRequest,
  links: Links,
): Promise<CollectionSearchResult> {
  const url = links.searchPublicCollections.getTemplatedLink({
    query: searchRequest.query,
    subject: searchRequest.subject,
  });
  return axios.get(url).then(response => ({
    collections: parseCollectionsListResponse(response).slice(0, 5),
    query: searchRequest.query,
  }));
}

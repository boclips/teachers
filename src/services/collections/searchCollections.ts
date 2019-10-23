import axios from 'axios';
import { CollectionSearchRequest } from '../../types/CollectionSearchRequest';
import { Links } from '../../types/Links';
import { CollectionsSearchResult } from '../../types/SearchResults';
import { parseCollectionsListResponse } from './collectionParser';

export default function searchPublicCollections(
  searchRequest: CollectionSearchRequest,
  links: Links,
): Promise<CollectionsSearchResult> {
  const url = links.searchPublicCollections.getTemplatedLink({
    query: searchRequest.query,
    subject: searchRequest.subject,
  });
  return axios.get(url).then(response => ({
    collections: parseCollectionsListResponse(response),
    query: searchRequest.query,
  }));
}

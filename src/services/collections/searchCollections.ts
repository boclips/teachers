import axios from 'axios';
import { CollectionSearchRequest } from 'src/types/CollectionSearchRequest';
import { Links } from 'src/types/Links';
import { CollectionSearchResult } from 'src/types/SearchResults';
import { parseCollectionsListResponse } from './collectionParser';

export const searchCollections = (
  searchRequest: CollectionSearchRequest,
  links: Links,
): Promise<CollectionSearchResult> => {
  const url = links.searchPublicCollections.getTemplatedLink({
    query: searchRequest.query,
    size: 5,
    ...searchRequest.filters,
  });
  return axios.get(url).then(response => ({
    collections: parseCollectionsListResponse(response).slice(0, 5),
    query: searchRequest.query,
  }));
};

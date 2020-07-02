import axios from 'axios';
import { CollectionSearchRequest } from '../../types/CollectionSearchRequest';
import { Links } from '../../types/Links';
import { CollectionSearchResult } from '../../types/SearchResults';
import { parseCollectionsListResponse } from './collectionParser';

export const searchCollections = (
  searchRequest: CollectionSearchRequest,
  links: Links,
): Promise<CollectionSearchResult> => {
  const ageRange =
    searchRequest.filters.age_range &&
    searchRequest.filters.age_range.map((it) => it.getId());

  const url = links.searchCollections.getTemplatedLink({
    query: searchRequest.query,
    size: 5,
    subject: searchRequest.filters.subject,
    age_range_min: searchRequest.filters.age_range_min,
    age_range_max: searchRequest.filters.age_range_max,
    age_range: ageRange,
    resource_types: searchRequest.filters.resource_types,
  });
  return axios.get(url).then((response) => ({
    collections: parseCollectionsListResponse(response).slice(0, 5),
    query: searchRequest.query,
  }));
};

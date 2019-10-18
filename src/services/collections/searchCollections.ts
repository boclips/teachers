import axios from 'axios';
import { CollectionSearchRequest } from '../../types/CollectionSearchRequest';
import { Links } from '../../types/Links';
import { VideoCollection } from './../../types/VideoCollection';
import { parseCollectionsListResponse } from './collectionParser';

export interface Result {
  collections: VideoCollection[];
  query: string;
}

export default function searchPublicCollections(
  searchRequest: CollectionSearchRequest,
  links: Links,
): Promise<Result> {
  const url = links.searchPublicCollections.getTemplatedLink({
    query: searchRequest.query,
    subject: searchRequest.subject,
  });
  return axios.get(url).then(response => ({
    collections: parseCollectionsListResponse(response),
    query: searchRequest.query,
  }));
}

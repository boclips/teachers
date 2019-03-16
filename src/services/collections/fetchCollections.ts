import axios from 'axios';
import { Links } from '../../types/Links';
import { VideoCollection } from '../../types/VideoCollection';
import { parseCollectionsListResponse } from './collectionParser';

export const fetchCollections = (links: Links): Promise<VideoCollection[]> => {
  if (!links.collectionsList) {
    return Promise.reject();
  }
  return axios
    .get(links.collectionsList.getOriginalLink())
    .then(response => parseCollectionsListResponse(response));
};

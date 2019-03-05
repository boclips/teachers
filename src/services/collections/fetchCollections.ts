import axios from 'axios';
import { Links } from '../../types/Links';
import { VideoCollection } from '../../types/VideoCollection';
import { parseCollectionsResponse } from './collectionParser';

export const fetchCollections = (links: Links): Promise<VideoCollection[]> => {
  return axios
    .get(links.collectionsDetails.getOriginalLink())
    .then(response => parseCollectionsResponse(response));
};

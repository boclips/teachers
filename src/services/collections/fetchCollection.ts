import axios from 'axios';
import { Links } from '../../types/Links';
import { VideoCollection } from '../../types/VideoCollection';
import { parseCollectionResponse } from './collectionParser';

export const fetchCollection = (links: Links): Promise<VideoCollection> => {
  return axios
    .get(links.defaultCollection.getOriginalLink())
    .then(response => parseCollectionResponse(response));
};

import axios from 'axios';
import { Links } from '../../types/Links';
import { VideoCollection } from '../../types/VideoCollection';
import { parseCollectionResponse } from './collectionParser';

export const fetchCollection = (
  links: Links,
  id: string,
): Promise<VideoCollection> => {
  if (!links.collection) {
    return Promise.reject();
  }
  return axios
    .get(links.collection.getTemplatedLink({ id }))
    .then(response => parseCollectionResponse(response));
};
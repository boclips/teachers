import axios from 'axios';
import { Links } from '../../types/Links';
import { VideoCollection } from '../../types/VideoCollection';
import { parseCollectionResponse } from './collectionParser';

export const fetchCollection = (
  links: Links,
  collectionId: string,
): Promise<VideoCollection> => {
  return axios
    .get(links.collection.getTemplatedLink({ id: collectionId }))
    .then(response => parseCollectionResponse(response));
};

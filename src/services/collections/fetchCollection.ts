import axios from 'axios';
import { Links } from 'src/types/Links';
import { VideoCollection } from 'src/types/VideoCollection';
import { parseCollectionResponse } from './collectionParser';

export const fetchCollection = (
  links: Links,
  id: string,
): Promise<VideoCollection> =>
  axios
    .get(links.collection.getTemplatedLink({ id }))
    .then(response => parseCollectionResponse(response));

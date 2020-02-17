import axios from 'axios';
import { Links } from '../../types/Links';
import { VideoCollection } from '../../types/VideoCollection';
import { parseCollectionResponse } from './collectionParser';

export const fetchCollection = (
  links: Links,
  id: string,
  referer?: string,
  shareCode?: string,
): Promise<VideoCollection> =>
  axios
    .get(links.collection.getTemplatedLink({ id, referer, shareCode }))
    .then(response => parseCollectionResponse(response));

import axios from 'axios';
import { VideoCollection } from 'src/types/VideoCollection';
import { parseCollectionResponse } from './collectionParser';

export const unbookmarkCollection = (
  collection: VideoCollection,
): Promise<VideoCollection> => {
  if (!collection.links.unbookmark) {
    return Promise.reject();
  }

  return axios
    .patch(collection.links.unbookmark.getOriginalLink())
    .then(response => parseCollectionResponse(response));
};

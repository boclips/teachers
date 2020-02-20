import axios from 'axios';
import { VideoCollection } from '../../types/VideoCollection';
import { parseCollectionResponse } from './collectionParser';

export const bookmarkCollection = (
  collection: VideoCollection,
): Promise<VideoCollection> => {
  if (!collection.links.bookmark) {
    return Promise.reject();
  }

  return axios
    .patch(collection.links.bookmark.getOriginalLink())
    .then(response => parseCollectionResponse(response));
};

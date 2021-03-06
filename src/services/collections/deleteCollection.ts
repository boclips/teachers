import axios from 'axios';
import { VideoCollection } from '../../types/VideoCollection';

export const deleteCollection = (
  collection: VideoCollection,
): Promise<boolean> => {
  if (!collection.links.remove) {
    return Promise.reject();
  }
  return axios
    .delete(collection.links.remove.getOriginalLink())
    .then(() => true);
};

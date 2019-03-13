import axios from 'axios';
import { VideoCollection } from '../../types/VideoCollection';

export const deleteCollection = (
  collection: VideoCollection,
): Promise<boolean> => {
  return axios
    .delete(collection.links.remove.getOriginalLink())
    .then(() => true);
};

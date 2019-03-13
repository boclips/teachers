import axios from 'axios';
import { VideoCollection } from '../../types/VideoCollection';

export interface RenameCollectionRequest {
  originalCollection: VideoCollection;
  title: string;
}

export const renameCollection = (
  request: RenameCollectionRequest,
): Promise<boolean> => {
  return axios
    .patch(request.originalCollection.links.edit.getOriginalLink(), {
      title: request.title,
    })
    .then(() => true);
};

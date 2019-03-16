import axios from 'axios';
import { EditCollectionRequest } from '../../components/collection/redux/actions/editCollectionAction';

export const editCollection = (
  request: EditCollectionRequest,
): Promise<boolean> => {
  if (!request.originalCollection.links.edit) {
    return;
  }
  return axios
    .patch(request.originalCollection.links.edit.getOriginalLink(), {
      title: request.title,
      isPublic: request.isPublic,
    })
    .then(() => true);
};

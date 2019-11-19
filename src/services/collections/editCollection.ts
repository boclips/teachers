import axios from 'axios';
import { EditCollectionRequest } from '../../components/collection/redux/actions/editCollectionAction';
import { AgeRange } from '../../types/AgeRange';

export const editCollection = (
  request: EditCollectionRequest,
): Promise<boolean> => {
  if (!request.originalCollection.links.edit) {
    return Promise.reject();
  }

  const endpoint = request.originalCollection.links.edit.getOriginalLink();

  return axios
    .patch(endpoint, {
      title: request.title,
      isPublic: request.isPublic,
      subjects: request.subjects,
      ageRange: request.ageRange.isBounded()
        ? request.ageRange
        : new AgeRange(),
      description: request.description,
    })
    .then(() => true);
};

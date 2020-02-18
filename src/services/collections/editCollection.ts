import axios from 'axios';
import { VideoCollectionChanges } from 'src/components/collection/redux/actions/editCollectionAction';
import { VideoCollection } from 'src/types/VideoCollection';

export const editCollection = (
  collection: VideoCollection,
  changes: VideoCollectionChanges,
): Promise<boolean> => {
  if (!collection.links.edit) {
    return Promise.reject();
  }

  const endpoint = collection.links.edit.getOriginalLink();

  return axios
    .patch(endpoint, {
      title: changes.title,
      isPublic: changes.isPublic,
      subjects: changes.subjects,
      ageRange:
        changes.ageRange && changes.ageRange.isBounded()
          ? changes.ageRange
          : null,
      description: changes.description,
    })
    .then(() => true);
};

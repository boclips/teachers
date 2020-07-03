import { actionCreatorFactory } from '../../../../app/redux/actions';
import { AgeRange } from '../../../../types/AgeRange';
import { VideoCollection } from '../../../../types/VideoCollection';

export interface EditCollectionRequest {
  collection: VideoCollection;
  changes: VideoCollectionChanges;
}

export interface VideoCollectionChanges {
  title?: string;
  subjects?: string[];
  ageRange?: AgeRange;
  description?: string;
}

export const editCollectionAction = actionCreatorFactory<EditCollectionRequest>(
  'EDIT_COLLECTION',
);

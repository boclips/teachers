import { actionCreatorFactory } from 'src/app/redux/actions';
import { AgeRange } from 'src/types/AgeRange';
import { VideoCollection } from 'src/types/VideoCollection';

export interface EditCollectionRequest {
  collection: VideoCollection;
  changes: VideoCollectionChanges;
}

export interface VideoCollectionChanges {
  title?: string;
  isPublic?: boolean;
  subjects?: string[];
  ageRange?: AgeRange;
  description?: string;
}

export const editCollectionAction = actionCreatorFactory<EditCollectionRequest>(
  'EDIT_COLLECTION',
);

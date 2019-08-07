import { actionCreatorFactory } from '../../../../app/redux/actions';
import { AgeRange } from '../../../../types/AgeRange';
import { VideoCollection } from './../../../../types/VideoCollection';

export interface EditCollectionRequest {
  title?: string;
  isPublic?: boolean;
  subjects?: string[];
  ageRange?: AgeRange;
  originalCollection: VideoCollection;
  description?: string;
}

export const editCollectionAction = actionCreatorFactory<EditCollectionRequest>(
  'EDIT_COLLECTION',
);

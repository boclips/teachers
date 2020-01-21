import { actionCreatorFactory } from '../../../../app/redux/actions';
import { AgeRange } from '../../../../types/AgeRange';
import { VideoCollection } from './../../../../types/VideoCollection';

export interface EditCollectionRequest {
  // TODO(AO): Refactor this out a bit
  originalCollection: VideoCollection;
  title?: string;
  isPublic?: boolean;
  subjects?: string[];
  ageRange?: AgeRange;
  description?: string;
}

export const editCollectionAction = actionCreatorFactory<EditCollectionRequest>(
  'EDIT_COLLECTION',
);

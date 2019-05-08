import { actionCreatorFactory } from '../../../../app/redux/actions';
import { AgeRangeData } from '../../../../types/AgeRange';
import { VideoCollection } from './../../../../types/VideoCollection';

export interface EditCollectionRequest {
  title?: string;
  isPublic?: boolean;
  subjects?: string[];
  ageRange?: AgeRangeData;
  originalCollection: VideoCollection;
}

export const editCollectionAction = actionCreatorFactory<EditCollectionRequest>(
  'EDIT_COLLECTION',
);

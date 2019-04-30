import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from './../../../../types/VideoCollection';

export interface EditCollectionRequest {
  title?: string;
  isPublic?: boolean;
  subjects?: string[];
  originalCollection: VideoCollection;
}

export const editCollectionAction = actionCreatorFactory<EditCollectionRequest>(
  'EDIT_COLLECTION',
);

import { AgeRange } from '@bit/boclips._ui.badge';
import { actionCreatorFactory } from '../../../../app/redux/actions';
;
import { VideoCollection } from './../../../../types/VideoCollection';

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

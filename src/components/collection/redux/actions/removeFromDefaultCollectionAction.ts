import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export const removeFromDefaultCollectionAction = actionCreatorFactory<Video>(
  'REMOVE_FROM_DEFAULT_COLLECTION',
);

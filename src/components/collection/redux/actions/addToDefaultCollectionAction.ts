import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export const addToDefaultCollectionAction = actionCreatorFactory<Video>(
  'ADD_TO_DEFAULT_COLLECTION',
);

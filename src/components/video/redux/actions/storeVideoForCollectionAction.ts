import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export const storeVideoForCollectionAction = actionCreatorFactory<Video>(
  'STORE_VIDEO_FOR_COLLECTION',
);

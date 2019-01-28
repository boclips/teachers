import { actionCreatorFactory } from './../../../../app/redux/actions';
import { Video } from './../../../../types/Video';

export const storeVideoInDefaultCollectionAction = actionCreatorFactory<Video>(
  'STORE_VIDEO_IN_DEFAULT_COLLECTION',
);

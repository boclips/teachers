import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export const unstoreVideoInDefaultCollectionAction = actionCreatorFactory<
  Video
>('UNSTORE_VIDEO_IN_DEFAULT_COLLECTION');

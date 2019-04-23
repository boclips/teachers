import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

export const removeVideoFromMyCollectionAction = actionCreatorFactory<{
  video: Video;
  collection: VideoCollection;
}>('REMOVE_VIDEO_FROM_MY_COLLECTION');

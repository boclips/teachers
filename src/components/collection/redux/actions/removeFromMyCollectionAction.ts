import { actionCreatorFactory } from 'src/app/redux/actions';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';

export const removeVideoFromMyCollectionAction = actionCreatorFactory<{
  video: Video;
  collection: VideoCollection;
}>('REMOVE_VIDEO_FROM_MY_COLLECTION');

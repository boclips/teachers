import { actionCreatorFactory } from 'src/app/redux/actions';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';

export const addVideoToMyCollectionAction = actionCreatorFactory<{
  video: Video;
  collection: VideoCollection;
}>('ADD_VIDEO_TO_MY_COLLECTION');

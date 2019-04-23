import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

export const addVideoToMyCollectionAction = actionCreatorFactory<{
  video: Video;
  collection: VideoCollection;
}>('ADD_VIDEO_TO_MY_COLLECTION');

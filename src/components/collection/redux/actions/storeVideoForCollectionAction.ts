import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

export const storeVideoForCollectionAction = actionCreatorFactory<{
  video: Video;
  collection: VideoCollection;
}>('STORE_VIDEO_FOR_COLLECTION');

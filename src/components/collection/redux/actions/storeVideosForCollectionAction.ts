import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

export const storeVideosForCollectionAction = actionCreatorFactory<{
  videos: Video[];
  collection: VideoCollection;
}>('STORE_VIDEOS_FOR_COLLECTION');

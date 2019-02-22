import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

export const removeFromCollectionAction = actionCreatorFactory<{
  video: Video;
  collection: VideoCollection;
}>('REMOVE_FROM_COLLECTION');

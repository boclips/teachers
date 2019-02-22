import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

export const addToCollectionAction = actionCreatorFactory<{
  video: Video;
  collection: VideoCollection;
}>('ADD_TO_COLLECTION');

import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export const storeVideosAction = actionCreatorFactory<{
  videos: Video[];
}>('STORE_VIDEOS');

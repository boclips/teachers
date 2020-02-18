import { actionCreatorFactory } from 'src/app/redux/actions';
import { Video } from 'src/types/Video';

export const storeVideosAction = actionCreatorFactory<{
  videos: Video[];
}>('STORE_VIDEOS');

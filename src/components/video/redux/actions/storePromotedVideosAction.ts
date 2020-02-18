import { actionCreatorFactory } from 'src/app/redux/actions';
import { Video } from 'src/types/Video';

export const storePromotedVideosAction = actionCreatorFactory<{
  promotedVideos: Video[];
}>('STORE_PROMOTED_VIDEOS');

import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export const storePromotedVideosAction = actionCreatorFactory<{
  promotedVideos: Video[];
}>('STORE_PROMOTED_VIDEOS');

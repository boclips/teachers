import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export interface PromotedVideos {
  promotedVideos: Video[];
  additionalVideos: boolean;
}

export const storePromotedVideosAction = actionCreatorFactory<PromotedVideos>(
  'STORE_PROMOTED_VIDEOS',
);

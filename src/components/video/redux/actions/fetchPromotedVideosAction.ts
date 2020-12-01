import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';

export interface PromotedVideosRequest {
  videoSearchRequest: VideoSearchRequest;
  additionalVideos: boolean;
}

export const fetchPromotedVideosAction = actionCreatorFactory<PromotedVideosRequest>(
  'FETCH_PROMOTED_VIDEOS',
);

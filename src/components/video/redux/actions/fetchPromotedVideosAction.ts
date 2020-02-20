import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';

export const fetchPromotedVideosAction = actionCreatorFactory<
  VideoSearchRequest
>('FETCH_PROMOTED_VIDEOS');

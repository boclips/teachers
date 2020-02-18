import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoSearchRequest } from 'src/types/VideoSearchRequest';

export const fetchPromotedVideosAction = actionCreatorFactory<
  VideoSearchRequest
>('FETCH_PROMOTED_VIDEOS');

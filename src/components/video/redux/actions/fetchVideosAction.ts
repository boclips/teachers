import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';

export const fetchVideosAction = actionCreatorFactory<VideoSearchRequest>(
  'FETCH_VIDEOS',
);

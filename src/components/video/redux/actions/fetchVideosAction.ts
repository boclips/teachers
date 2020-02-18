import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoSearchRequest } from 'src/types/VideoSearchRequest';

export const fetchVideosAction = actionCreatorFactory<VideoSearchRequest>(
  'FETCH_VIDEOS',
);

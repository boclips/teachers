import { actionCreatorFactory } from 'src/app/redux/actions';
import { VideoSearchRequest } from 'src/types/VideoSearchRequest';

export const searchVideosAction = actionCreatorFactory<VideoSearchRequest>(
  'SEARCH_VIDEOS',
);

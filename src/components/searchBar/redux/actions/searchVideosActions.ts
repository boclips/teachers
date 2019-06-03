import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';

export const searchVideosAction = actionCreatorFactory<VideoSearchRequest>(
  'SEARCH_VIDEOS',
);

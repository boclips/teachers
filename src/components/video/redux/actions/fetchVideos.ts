import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoId } from '../../../../types/Video';

export interface VideosForCollectionRequest {
  videos: VideoId[];
}

export const fetchVideosAction = actionCreatorFactory<
  VideosForCollectionRequest
>('FETCH_VIDEOS');

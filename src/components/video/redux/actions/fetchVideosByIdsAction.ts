import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoId } from '../../../../types/Video';

export interface VideosForCollectionRequest {
  videos: VideoId[];
}

export const fetchVideosByIdsAction = actionCreatorFactory<
  VideosForCollectionRequest
>('FETCH_VIDEOS_BY_IDS');

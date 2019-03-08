import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoId } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

export interface VideosForCollectionRequest {
  videos: VideoId[];
  collection: VideoCollection;
}

export const fetchVideosForCollectionAction = actionCreatorFactory<
  VideosForCollectionRequest
>('FETCH_VIDEOS_FOR_COLLECTION');

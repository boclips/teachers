import { convertApiClientVideo } from 'src/services/videos/convertApiClientVideo';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FetchVideoParams } from 'src/components/video/redux/actions/fetchVideoAction';
import { Video } from '../../types/Video';

export function fetchVideo(params: FetchVideoParams): Promise<Video> {
  return ApiClientWrapper.get()
    .then((client) => client.videos.get(params.id))
    .then(convertApiClientVideo);
}

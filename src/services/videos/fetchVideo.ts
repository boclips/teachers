import { convertApiClientVideo } from 'src/services/videos/convertApiClientVideo';
import { ApiClientWrapper } from 'src/services/apiClient';
import { Video } from '../../types/Video';

export function fetchVideo(id: string): Promise<Video> {
  return ApiClientWrapper.get()
    .then((client) => client.videos.get(id))
    .then(convertApiClientVideo);
}

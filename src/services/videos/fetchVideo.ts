import { getBoclipsClient } from 'src/services/apiClient';
import { convertApiClientVideo } from 'src/services/videos/convertApiClientVideo';
import { Video } from '../../types/Video';

export function fetchVideo(id: string): Promise<Video> {
  return getBoclipsClient()
    .then(client => client.videosClient.get(id))
    .then(convertApiClientVideo);
}

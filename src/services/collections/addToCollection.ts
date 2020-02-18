import axios from 'axios';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';

export default function addToCollection(
  video: Video,
  collection: VideoCollection,
): Promise<boolean> {
  if (!collection.links.addVideo) {
    return Promise.reject();
  }
  const url = collection.links.addVideo.getTemplatedLink({
    video_id: video.id,
  });

  return axios
    .put(url)
    .then(() => true)
    .catch(() => false);
}
